<!-- 评论管理页面 -->
<template>
  <div class="M">
    <div class="body">
      <span>评论管理页面</span>
      <commentBox />
      <commentBox />
    </div>
    <commentBox />
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
};
</script>

<style lang="scss" scoped>
// <template>的独一无二的div
.M{
  display: flex;                  // 设置页面的组件都水平居中
  justify-content: center;        // 水平居中
  flex-wrap: wrap;                // 允许换行
  // background-color: brown;
  background-color: #dcdcdc;
  height: 100vh;                  // 设置高度，取消则为自定义高度
  padding: 10px;                  // 设置内边距
}
// 最大的div，用来存放所有的组件，名字定位body
.body {
  display: flex;                  // 设置页面的组件都水平居中
  // justify-content: center;        // 水平居中
  align-items: center;            // 水平居中
  flex-direction: column;         // 垂直方向排列

  padding: 10px;
  background-color: aqua;
  width: 100%;
}
span {
  // width: 100%; // 使组件充满 .body 的宽度
  box-sizing: border-box;
  background-color: #fff;
  // margin: 10px;
}
</style>

