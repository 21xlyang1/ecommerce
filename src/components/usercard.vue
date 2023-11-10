<template>
  <div class="d-flex h-100">
    <div class="hover-trigger">
      <div class="photo">
        <img src="../assets\img\1.png" alt="" />
      </div>
      <!-- 下拉框内容 -->
      <div class="dropdown">
        <div
          class="p-2 pt-3 pb-3 shadow-sm rounded-2 w-100"
          style="height: 200px; background-color: #fafafa"
        >
          <div>
            <el-button style="width: 120px">登入</el-button>
          </div>
          <div class="pt-3">
            <el-button style="width: 120px">注册</el-button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="(item, index) in indexList"
      :key="index"
      class="h-100 hover-effect ps-3 pe-3"
      
      @mouseover="changeTextColor(item, true)"
      @mouseout="changeTextColor(item, false)"
    >
      <div class="w-100" style="height: 10px"></div>
      <div
        class="w-100 d-flex justify-content-center align-items-center"
        style="height: 30px"
      >
        <v-icon
          :name="item.name"
          style="font-size: 30px; color: #f53082"
          class="icon"
        ></v-icon>
      </div>
      <div
        class="w-100 d-flex justify-content-center align-items-center "
        style="height: 30px;font-size:15px;color: #fafafa2f;"
        :style="{ color: item.textColor }"
      >
        {{ item.inf }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      isDropdownVisible: false,
      indexList: [
        { name: "shoucang", inf: "收藏" },
        { name: "dingdan", inf: "订单" },
        { name: "lishi", inf: "历史" },
        { name: "gouwuche", inf: "购物车" },
      ],
    };
  },
  methods: {
    changeTextColor(item, isHovered) {
      this.$set(item, 'textColor', isHovered ? '#f53082' : '');
    },
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
  .hover-effect:hover .icon {
    transform: translateY(-6px);
    transition: transform 0.2s ease;
    // background-color: #fafafa2f;
  }
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

