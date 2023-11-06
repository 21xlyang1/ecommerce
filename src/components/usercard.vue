<template>
  <div class="d-flex" style=" width: 300px;">
    <div class="hover-trigger">
      <div class="photo">
        <img src="../assets\img\1.png" alt="" />
      </div>

      <div class="dropdown">
        <!-- 下拉框内容 -->
        <div class="p-2 pt-3 pb-3 shadow-sm rounded-2   w-100" style="height: 200px; background-color:#fafafa;">
          <div>
            <el-button  style="width: 120px;">登入</el-button>
          </div>
          <div class=" pt-3">
            <el-button style="width:120px">注册</el-button>
          </div>
        </div>
      </div>
    </div>
    <v-icon name="lishi" style="font-size: 26px; color: #f53082;"></v-icon>
    <div></div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      isDropdownVisible: false,
    };
  },
  methods: {
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
/* 定义名为photo的类*/
.photo {
  margin-top: 5px;
  width: 60px;
  /* 设置宽度为100像素*/
  height: 60px;
  /* 设置高度为100像素*/
  border-radius: 50%;
  /* 设置边框圆角为50%*/
  overflow: hidden;
  /* 设置溢出隐藏*/
  border: 5px solid #fafafa;
  /* 设置边框为5像素实线，颜色为#fafafa*/
  background-color: #fafafa;
  /* 设置背景颜色为#fafafa*/
}

/* 定义名为photo的类中的img元素*/
.photo img {
  width: 100%;
  /* 设置宽度为100% */
}

.hover-trigger {
  position: relative;
  // background-color: #3498db;

  // padding: 10px;
  cursor: pointer;
}

.dropdown {
  display: none;
  position: absolute;
  top: 80%;
  left: -67px;
  width: 200px;
  // background-color: #fff;
  // border: 1px solid #ccc;
  // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
  opacity: 0;
  // transform: translateY(-20px);
  // transition: opacity 0.3s, transform 0.3s, display 0.3s;
  animation: pop-btn 0.3s;

}
@keyframes pop-btn {
  0% {
    transform: scale(0);
    opacity: 0;
    /* 动画开始时缩放为0 */
  }

  80% {
    transform: scale(1.2);
    opacity: 0.8;
    /* 动画进行到80%时缩放为1.2 */
  }

  100% {
    transform: scale(1);
    opacity: 1;
    /* 动画结束时缩放为1 */
  }
}
.hover-trigger:hover .dropdown {
  display: inline;
  opacity: 1;
  // transform: translateY(0);
}
</style>

