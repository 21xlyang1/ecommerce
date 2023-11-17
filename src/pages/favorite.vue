<template>
  <div class="w-100 bg" :style="{ height: outerDivHeight + 'px' }">
    <div class="container h-100" style="padding: 50px">
      <div class="rounded-3 w-100 h-100 card overflow-hidden">
        <div class="w-100 d-flex" style="height: 69px;background: rgba(255,255,255,0.4);">
          <div class="w-25" style="border-right:solid 1px #dde4e6;" ></div>
          <div class="w-75">

          </div>
        </div>
        <div class="w-100 d-flex">
          <el-scrollbar
            class="w-25"
            :style="{ height: outerDivHeight - 170 + 'px' }"
            style="border-right:solid 1px #dde4e6;"
          >

            <div
              v-for="index in 10"
              :key="index"
              class="w-100 collectitem"
              style="height: 100px"

            >
          </div>
          </el-scrollbar>
          <el-scrollbar
            class="w-75"
            :style="{ height: outerDivHeight - 170 + 'px' }"
          >
            <div class="w-100" style="height: 1000px"></div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      outerDivHeight: "", // 最外层div的高度
    };
  },
  methods: {
    setOuterDivSize() {
      this.outerDivHeight = window.innerHeight - 70;
    },
  },
  mounted() {
    this.setOuterDivSize(); // 初始化时设置最外层div的尺寸
    window.addEventListener("resize", this.setOuterDivSize);
  },
  beforeDestroy() {
    // 组件销毁时，移除窗口大小改变事件的监听
    window.removeEventListener("resize", this.setOuterDivSize);
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../public/img/log/7.png");
  background-attachment: fixed;
  background-size: cover;
  // position: relative;
  // border-bottom: solid 1px #000000;
}
// .hui {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   background: rgba($color: #000000, $alpha: 0.3);
// }

.card {
  background: rgba($color: #ffffff, $alpha: 0.6);
}
.collectitem {
  background: #fff;
  cursor: pointer;
}
.collectitem:hover {
  background: #000000;
}
</style>

