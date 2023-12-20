<!-- 评论管理页面 -->
<template>
  <div class="M">
    <div class="spanDiv"><span>评论</span></div>
    <div class="body">
      <div class="Box">
        <div class="functionBox">
          <div class="l">
            <div class="box_l">
              <div class="all">全部 ({{ data_all }})</div>
              |
              <div class="mine">我的 ({{ data_mine }})</div>
              |
              <div class="pending">待审 ({{ data_pending }})</div>
              |
              <div class="permitted">已批准 ({{ data_permitted }})</div>
              |
              <div class="waste">垃圾 ({{ data_waste }})</div>
              |
              <div class="recycle">回收站 ({{ data_recycle }})</div>
            </div>
            <div class="box_btu">
              <select>
                <option value="" disabled selected hidden>批量操作</option>
                <option value="">选项一</option>
                <option value="">选项二</option>
                <option value="">选项三</option>
              </select>
              <div class="app">应用</div>
              <select>
                <option value="" disabled selected hidden>全部评论类型</option>
                <option value="">选项一</option>
                <option value="">选项二</option>
                <option value="">选项三</option>
              </select>
              <div class="classify">筛选</div>
            </div>
          </div>
          <div class="r">
            <div class="box-r">
              <div class="text">
                <span>共{{ data_num }}个数据</span>
              </div>
              <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :current-page.sync="tablePage.currentPage"
                :page-size="tablePage.commentsPerPage"
                :page-sizes="pageSizes"
                :total="tablePage.totalComments"
                :hide-on-single-page="true"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="commentBox">
          <div class="navigation">
            <div class="checkbox-Box"><input type="checkbox" /></div>
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
          <commentBox
            v-for="(item, index) in showList"
            :key="index"
            :data="item"
            :class="{ even_color: index % 2 === 0, odd_color: index % 2 === 1 }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import commentBox from "../components/commentBox.vue";

// 定义vm
export default {
  components: {
    commentBox, // 注册评论管理的box组件
  },
  data() {
    return {
      tablePage: {
        currentPage: 1, // 当前的页面编号
        commentsPerPage: 5, // 每一页的评论数量
        totalComments: 100, // 评论数量
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
        },
        {
          name: "123",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第三条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
        },
        {
          name: "12345678910111213141516",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第四条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
        },
        {
          name: "123",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第五条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
        },
        {
          name: "123",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第六条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
        },
        {
          name: "123",
          email: "6789@123123.com",
          wechat: "1289abcd",
          photonumber: "1239abcdefg",
          comments: "第七条评论",
          reply: "这是回复",
          submission: "1234:12:12 12:12",
        },
      ],
      showList: [],
      data_num: 0, // 数据有多少
      data_all: 27657,
      data_mine: 3,
      data_pending: 27651,
      data_permitted: 6,
      data_waste: 26,
      data_recycle: 0,
    };
  },
  computed: {},
  methods: {
    // 更新 showList 的方法
    updateShowList() {
      const startIndex =
        (this.tablePage.currentPage - 1) * this.tablePage.commentsPerPage;
      const endIndex = startIndex + this.tablePage.commentsPerPage;
      this.showList = this.dataList.slice(startIndex, endIndex);
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
  },
  mounted() {
    this.tablePage.totalComments = this.dataList.length;
    this.updateShowList(); // 初始化时调用一次，显示第一页的数据
    this.data_num = this.dataList.length;
  },
};
</script>

<style lang="scss" scoped>
.even_color {
  background-color: rgba(241, 243, 250, 1);
}

.odd_color {
  background-color: rgba(255, 255, 255, 1);
}

// <template>的独一无二的div
.M {
  // background-color: black;
  background-color: rgba(250, 251, 254, 1);
  height: 100vh; // 设置高度，取消则为自定义高度
  padding: 15px; // 设置内边距
}

// 最大的用来操作的div，用来存放所有的组件，名字定位body
.body {
  // display: grid; // 设置为grid布局
  // grid-auto-rows: minmax(100px, auto); // 设置每行的高度最小100px最大auto
  // gap: 20px; // 列之间的间隙

  // padding: 10px;                     // 设定body的内边距
  width: 100%;
}

.body .functionBox {
  // background-color: #fff; // 设定功能div的背景颜色
  width: 100%; // 设定功能div的宽度为100%
  height: 80px; // 设定功能div的高度为固定高度

  box-sizing: border-box; // 边框包含在盒模型内
  // border: 1px solid #ccc; // 设置边框为红色，1像素宽度 */

  display: grid;
  grid-template-columns: 1fr 500px; // 两列，左右布局

  .l {
    // background-color: coral;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .box_l {
      // background-color: aqua;
      display: flex;
      padding-bottom: 10px;
      // padding-left: 10px;
      .mine,
      .pending,
      .permitted,
      .waste {
        padding-right: 10px;
        padding-left: 10px;
      }
      .all {
        padding-right: 10px;
      }
      .recycle {
        padding-left: 10px;
      }
    }
    .box_btu {
      // background-color: cyan;
      padding-bottom: 10px;
      // padding-left: 10px;
      display: flex;
      .app,
      .classify {
        cursor: pointer;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #000;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .app {
        margin-right: 10px;
        margin-left: 10px;
      }
      .classify {
        margin-left: 10px;
      }
      select {
        width: 120px;
      }
    }
  }

  .r {
    // background-color: blueviolet;
    position: relative;
    .box-r {
      position: absolute;
      right: 5px;
      bottom: 5px;

      display: grid;
      grid-template-columns: 1fr auto; /* 左右两列，第一列占据剩余空间，第二列自适应宽度 */
      gap: 10px; /* 根据需要设置列之间的间隔 */
      .text {
        // background-color: brown;
        font-size: 0.95rem;
        display: flex;
        // justify-content: space-between; /* 文字水平居中，span 右对齐 */
        align-items: center; /* 文字垂直居中 */
        span {
        }
      }
      .pagination {
        // background-color: chartreuse;
        bottom: 10px;
        right: 10px;
      }
    }
  }
}

.body .commentBox {
  background-color: #fff; // 设定评论div的背景颜色
  width: 100%; // 设定评论div的宽度为100%
  // padding: 10px;                     // 设定评论div的内边距

  display: grid; // 设置为grid布局
  grid-auto-rows: minmax(0px, auto); // 设置每行的高度，自动调整

  box-sizing: border-box; // 边框包含在盒模型内
}

.commentBox .navigation {
  background-color: #fff;
  font-size: 1.2rem; // 评论列表的标题字体
  display: grid; // 评论列表的标题设置为grid布局
  grid-template-columns: 70px 140px 120px 160px minmax(200px, 1fr) 190px 140px 100px; // 八列，左右布局
  // grid-template-columns: repeat(8, minmax(70px, 1fr) minmax(140px, 1fr) minmax(120px, 1fr) minmax(160px, 1fr) minmax(160px, 1fr) minmax(160px, 1fr) minmax(140px, 1fr) minmax(100px, 1fr));

  // padding-top: 5px;
  // padding-bottom: 5px;
  width: 100%;

  /* 设置通用的边框 */
  border: 1px solid #ccc;
  /* 右边框不显示 */
  border-right: none;
  /* 左边框不显示 */
  border-left: none;
}

.checkbox-Box {
  // background-color: black;
  // background-color: rgba(253, 247, 241, 1); // 复选框的div颜色
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
  // background-color: red;
  color: #00f;

  padding-top: 5px;
  padding-bottom: 5px;
}

.spanDiv {
  box-sizing: border-box;
  // background-color: #fff;
  font-size: 1.5rem;
  // padding-left: 10px;

  box-sizing: border-box;
  /* 边框包含在盒模型内 */
  // border: 1px solid #ccc;
  /* 设置边框为红色，2像素宽度 */

  margin-bottom: 10px;
}

.Box {
  background-color: #fff;
  box-sizing: border-box;
  // border: 1px solid #ccc; // 设置边框为红色，1像素宽度 */
  padding: 15px; // 设置内边距
  // margin: 20px;
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.2);
}
</style>
