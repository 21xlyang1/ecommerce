<!-- 评论管理页面 -->
<template>
  <div class="M">
    <div class="spanDiv"><span>评论</span></div>
    <div class="body">
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
              :total="totalComments"
              :page-size="commentsPerPage"
              v-model="currentPage"
              pager-count="5"
              hide-on-single-page="true"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="commentBox">
        <div class="navigation">
          <div class="checkbox-Box"><input type="checkbox" /></div>
          <div class="a">作者</div>
          <div class="b">评论</div>
          <div class="c">回复至</div>
          <div class="d">提交于</div>
        </div>
        <commentBox />
        <commentBox />
        <commentBox />
        <commentBox />
        <commentBox />
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
      totalComments: 30, // 实际上的评论数量
      commentsPerPage: 5, // 每一页的评论数量
      currentPage: 1, // 当前的页面编号
      data_num: 2236, // 数据有多少
      data_all: 27657,
      data_mine: 3,
      data_pending: 27651,
      data_permitted: 6,
      data_waste: 26,
      data_recycle: 0,
    };
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
// <template>的独一无二的div
.M {
  // background-color: black;
  height: 100vh; // 设置高度，取消则为自定义高度
  padding: 30px; // 设置内边距
}

// 最大的用来操作的div，用来存放所有的组件，名字定位body
.body {
  display: grid; // 设置为grid布局
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
      .app, .classify {
        cursor: pointer;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #000; // 设置边框为红色，1像素宽度
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
  grid-template-columns: 35px 300px 1fr 250px 150px; // 五列，左右布局

  // padding-top: 5px;
  // padding-bottom: 5px;
  width: 100%;

  border: 1px solid #ccc;
  /* 设置通用的边框 */
}

.checkbox-Box {
  // background-color: black;
  // background-color: rgba(253, 247, 241, 1); // 复选框的div颜色
  display: flex;
  justify-content: center; // 水平居中
  align-items: flex-start; // 垂直居中
  padding-top: 10px;
}

.checkbox-Box input[type="checkbox"] {
  width: 18px;
  /* 设置复选框的宽度 */
  height: 18px;
  /* 设置复选框的高度 */
  cursor: pointer; // 悬浮改为手型
}

.navigation .a {
  // background-color: red;
  color: #00f;

  padding-top: 5px;
  padding-bottom: 5px;
}

.navigation .b {
  // background-color: yellow;
  color: #00f;

  padding-top: 5px;
  padding-bottom: 5px;
}

.navigation .c {
  // background-color: blue;
  color: #00f;

  padding-top: 5px;
  padding-bottom: 5px;
}

.navigation .d {
  // background-color: green;
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
</style>

