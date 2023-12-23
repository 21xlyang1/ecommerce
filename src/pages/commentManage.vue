<!-- 评论管理页面 -->
<template>
  <div class="M" style="background-color: #fafbfe; min-height: calc(100vh - 70px);">
    <div class="spanDiv"><span>评论</span></div>
    <div class="Box">
      <div class="functionBox">
        <div class="search">
          <Search :disabled="false" :placeholder="'按关键字搜索...'" v-model="searchQuery" @search="handleSearch" />
        </div>
        <div class="text">
          <span>共{{ data_num }}个数据</span>
        </div>
        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :current-page.sync="tablePage.currentPage"
            :page-size="tablePage.commentsPerPage" :page-sizes="pageSizes" :total="tablePage.totalComments"
            @size-change="handleSizeChange" @current-change="handlePageChange">
          </el-pagination>
        </div>
      </div>
      <div class="commentBox">
        <div class="navigation">
          <div class="checkbox-Box"><input type="checkbox" @input="selectAll" v-model="selectAllChecked" /></div>
          <div class="a">用户</div>
          <div class="b">手机号</div>
          <div class="c">邮箱</div>
          <div class="d">评论内容</div>
          <div class="e">回复至</div>
          <div class="f">创建时间</div>
          <div class="g">操作</div>
        </div>
      </div>
      <div>
        <commentBox v-for="(item, index) in showList" :key="index" :data="item"
          :class="{ even_color: index % 2 === 0, odd_color: index % 2 === 1 }" @delete-comment="deleteComment"
          @checkbox-change="handleCheckboxChange" @trigger-delete="deleteSelectedComments" />
        <div v-show="showNone" class="no-data-message">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import commentBox from "../components/commentBox.vue";
import Search from "../components/search_small.vue";

// 定义vm
export default {
  components: {
    commentBox, // 注册评论管理的box组件
    Search,
  },
  data() {
    return {
      tablePage: {
        currentPage: 1, // 当前的页面编号
        commentsPerPage: 10, // 每一页的评论数量
        totalComments: 0, // 评论数量
      },
      pageSizes: [5, 10, 15, 20, 25, 30],
      dataList: [
        {
          name: "Peanut",
          email: "123456789@123123.com",
          wechat: "123456789abcd",
          photonumber: "123456789abcdefg",
          comments: "第一条评论,第一条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "123",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "123456789ab",
          comments:
            "第二条评论,第二条评论,第二条评论,第二条评论,第二条评论,第二条评论,第二条评论",
          reply:
            "这是回复这是回复这是回复这是回复这是回复这是回复这是回复这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "123",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第三条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "12345678910111213141516",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第四条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "123",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第五条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "123&",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第六条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "123&",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第七条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "123&",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第八条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "123&",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第九条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "123&",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第十条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
        {
          name: "123&",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第十一条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
          selected: false,
        },
      ],
      searchList: [],
      showList: [],
      data_num: 0, // 数据有多少
      data_recycle: 0,
      searchQuery: '',
    };
  },
  computed: {},
  methods: {
    // 更新 showList 的方法
    updateShowList() {
      let baseList = this.searchQuery ? this.searchList : this.dataList; // 判断是否存在搜索关键字
      const startIndex = (this.tablePage.currentPage - 1) * this.tablePage.commentsPerPage;
      const endIndex = startIndex + this.tablePage.commentsPerPage;

      // 更新 showList 或者其他需要用到的数据
      this.showList = baseList.slice(startIndex, endIndex);
    },
    handlePageChange(currentPage) {
      // 在此刷新数据 刷新页
      this.tablePage.currentPage = currentPage;
      console.log("页面改变了");
      this.updateShowList(); // 在页面变化时更新 showList
    },
    handleSizeChange(commentsPerPage) {
      // 在此刷新数据 每页的数据量
      this.tablePage.commentsPerPage = commentsPerPage;
      console.log("页面数量改变了");
      this.tablePage.currentPage = 1; // 当改变每页评论数量时，重置到第一页
      this.updateShowList(); // 在每页显示数量变化时更新 showList
    },
    handleSearch(item) {
      console.log('搜索栏中的数据:', item);
      this.searchQuery = item[1];
      // 根据搜索条件过滤评论并存储在searchList中
      this.searchList = this.dataList.filter(item => {
        const searchString = this.searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchString) ||
          item.email.toLowerCase().includes(searchString) ||
          item.comments.toLowerCase().includes(searchString) ||
          item.reply.toLowerCase().includes(searchString)
        );
      });

      // 更新总评论数量
      this.tablePage.totalComments = this.searchList.length;

      // 更新当前显示的评论数量
      this.data_num = this.tablePage.totalComments;

      this.tablePage.currentPage = 1; // 重置为第一页
      this.dataList.forEach((item) => {
        if (item.selected) {
          item.selected = false;
        }
      });
      this.updateShowList(); // 根据新的搜索条件更新显示的评论
    },
    deleteComment(commentData) {
      // 在这里执行删除评论的操作
      // 根据实际的数据对象在 dataList 中查找索引并删除
      const index = this.dataList.findIndex(item => item === commentData);
      const index2 = this.searchList.findIndex(item => item === commentData);
      // 如果在搜索模式
      if (this.searchQuery) {
        if (index2 !== -1) {
          this.searchList.splice(index2, 1);
          if (index !== -1) {
            this.dataList.splice(index, 1);
          }
          // 更新评论总数
          this.tablePage.totalComments = this.searchList.length;
          // 更新当前显示的评论数量
          this.data_num = this.tablePage.totalComments;
          this.dataList.forEach((item) => {
            if (item.selected) {
              item.selected = !item.selected;
            }
          });
          this.searchList.forEach((item) => {
            if (item.selected) {
              item.selected = false;
            }
          });
          this.tablePage.currentPage = 1; // 重置为第一页
          this.updateShowList();
        }
      }
      // 如果不是搜索模式
      else {
        if (index !== -1) {
          this.dataList.splice(index, 1);
          // 更新评论总数
          this.tablePage.totalComments = this.dataList.length;
          // 更新当前显示的评论数量
          this.data_num = this.tablePage.totalComments;
          this.dataList.forEach((item) => {
            if (item.selected) {
              item.selected = false;
            }
          });
          this.tablePage.currentPage = 1; // 重置为第一页
          this.updateShowList();
        }
      }
    },
    handleCheckboxChange(commentData) {
      // 处理非搜索模式
      if (!this.searchQuery) {
        const indexInDataList = this.dataList.findIndex((item) => item === commentData);
        if (indexInDataList !== -1) {
          this.dataList[indexInDataList].selected = !this.dataList[indexInDataList].selected;
        }
      }
      else {
        const indexInDataList = this.dataList.findIndex((item) => item === commentData);
        const indexInSearchList = this.searchList.findIndex((item) => item === commentData);
        if (indexInDataList !== -1) {
          this.dataList[indexInDataList].selected = !this.dataList[indexInDataList].selected;
        }
        if (indexInSearchList !== -1) {
          this.searchList[indexInSearchList].selected = !this.searchList[indexInSearchList].selected;
        }
      }
      this.updateShowList();
      if (!this.searchQuery) { console.log("复选框是否选中的父组件的接受方法，非搜索状态"); }
      else { console.log("复选框是否选中的父组件的接受方法，是搜索状态"); }
      console.log("选中了", commentData.name);
      console.log(commentData.selected);
    },
    deleteSelectedComments() {
      // 如果是非搜索模式
      if (!this.searchQuery) {
        this.dataList = this.dataList.filter((item) => !item.selected);
        // 更新评论总数
        this.tablePage.totalComments = this.dataList.length;
        // 更新当前显示的评论数量
        this.data_num = this.tablePage.totalComments;

        this.dataList.forEach((item) => {
          if (item.selected) {
            item.selected = false;
          }
        });

        this.dataList.forEach((item) => {
          console.log(item.selected);
        });

        this.tablePage.currentPage = 1; // 重置为第一页

        this.updateShowList();
      }
      else {
        this.searchList = this.searchList.filter((item) => !item.selected);
        this.dataList = this.dataList.filter((item) => !item.selected);
        // 更新评论总数
        this.tablePage.totalComments = this.searchList.length;
        // 更新当前显示的评论数量
        this.data_num = this.tablePage.totalComments;
        this.dataList.forEach((item) => {
          if (item.selected) {
            item.selected = !item.selected;
          }
        });
        this.searchList.forEach((item) => {
          if (item.selected) {
            item.selected = false;
          }
        });
        this.tablePage.currentPage = 1; // 重置为第一页
        this.updateShowList();
      }
      console.log("批量删除成功！");
    },
    selectAll(event) {
      const isChecked = event.target.checked;
      this.showList.forEach(item => {
        this.$set(item, 'selected', isChecked);
      });
    },
  },
  computed: {
    showNone() {
      return !this.dataList.length && !this.searchList.length;
    },
    selectAllChecked: {
      get() {
        // 如果 showList 为空，则不选中
        if (this.showList.length === 0) {
          return false;
        }
        // 检查 showList 中的所有数据的 selected 属性是否都为 true
        return this.showList.every(item => item.selected);
      },
      set(value) {
        // 当点击全选复选框时，设置 showList 中所有数据的 selected 属性
        this.showList.forEach(item => {
          this.$set(item, 'selected', value);
        });
      },
    }
  },
  mounted() {
    this.tablePage.totalComments = this.searchQuery ? this.searchList.length : this.dataList.length;
    this.updateShowList(); // 初始化时调用一次，显示第一页的数据
    this.data_num = this.searchQuery ? this.searchList.length : this.dataList.length;
  },
};
</script>

<style lang="scss" scoped>
.even_color {
  background-color: #f1f3fa;
}

.odd_color {
  background-color: #fff;
}

// 最上面的标题
.spanDiv {
  font-size: 1.5rem;
  font-weight: 700;
  color: #6c757d;

  box-sizing: border-box; // 边框包含在盒模型内
  // border: 1px solid #ccc; // 设置边框为红色，1像素宽度

  margin-bottom: 20px;
  padding-top: 30px;
  padding-left: 30px;
}

// 标题下面的Box区域 整个
.Box {
  background-color: #fff;
  box-sizing: border-box;
  // border: 1px solid #ccc; // 设置边框为红色，1像素宽度

  padding: 20px; // 设置内边距
  margin-left: 30px;
  margin-right: 30px;
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
}

.Box .functionBox {
  // background-color: lightblue; // 设定功能div的背景颜色
  width: 100%; // 设定功能div的宽度为100%
  height: 50px;

  margin-top: 10px;
  margin-bottom: 10px;

  box-sizing: border-box; // 边框包含在盒模型内
  // border: 1px solid #ccc;

  display: flex;
  justify-content: flex-end;

  .search {
    // background-color: red;

    display: flex;
    align-items: flex-end;
    justify-content: flex-start;

    width: 100%;
  }

  .text {
    // background-color: brown;
    font-size: 0.95rem;
    font-weight: 400;

    display: flex;
    align-items: flex-end; // 文字垂直居下
    justify-content: flex-end;


    margin-left: 70px;

    white-space: nowrap; // 防止文本换行
  }

  .pagination {
    // background-color: chartreuse;
    // bottom: 10px;
    // right: 10px;

    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
}

.Box .commentBox {
  background-color: #fff; // 设定评论div的背景颜色

  box-sizing: border-box; // 边框包含在盒模型内
}

.commentBox .navigation {

  background-color: #fff;
  font-size: 1.2rem; // 评论列表的标题字体
  display: grid; // 评论列表的标题设置为grid布局
  grid-template-columns: 60px 140px 120px 160px minmax(200px, 1fr) 170px 140px 100px; // 八列，左右布局

  width: 100%;

  /* 设置通用的边框 */
  border: 1px solid #e3eaef;
  /* 右边框不显示 */
  border-right: none;
  /* 左边框不显示 */
  border-left: none;
}

.checkbox-Box {
  display: flex;
  justify-content: center; // 水平居中
  align-items: center; // 垂直居中
}

.checkbox-Box input[type="checkbox"] {
  width: 18px;
  /* 设置复选框的宽度 */
  height: 18px;
  /* 设置复选框的高度 */
  cursor: pointer; // 悬浮改为手型
}

.navigation .a,
.b,
.c,
.d,
.e,
.f,
.g {
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 700;
}

.g {
  display: flex;
  justify-content: center;
}

.no-data-message {
  text-align: center;
  font-size: 1.7rem;
  font-weight: 600;
  margin-top: 20px;
}
</style>
