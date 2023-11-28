<template>
  <div id="app">
    <dialog
      closeByMask
      class="d-flex align-items-center"
      style="
        padding: 0px;
        border: 0px;
        z-index: 100;
        height: 100%;
        background: none;
      "
    >
      <loginCard :islog="$store.state.isLoginShow"></loginCard>
    </dialog>

    <!-- 导航栏 -->
    <div
      class="w-100 myhead"
      style="height: 70px;"
    >
      <myHead></myHead>
    </div>

    <el-scrollbar  ref="scrollbar" class="w-100" :style="{height:outerDivHeight } ">
      <router-view name="one"></router-view>
    </el-scrollbar>
  </div>
</template>
 

<script>
import loginCard from "./components/loginCard.vue";
import myHead from "@/components/myHead.vue";

export default {
  name: "",
  components: { loginCard, myHead },
  data() {
    return {
      outerDivWidth: "", // 最外层div的宽度
      outerDivHeight: "", // 最外层div的高度
    };
  },
  methods: {
    setOuterDivSize() {

      this.outerDivHeight = window.innerHeight-70 + "px";
    },
  },
  mounted(){
    this.setOuterDivSize(); // 初始化时设置最外层div的尺寸
    window.addEventListener("resize", this.setOuterDivSize);


    let scrollbarEl = this.$refs.scrollbar.wrap;
      scrollbarEl.onscroll = () => {

        console.log(scrollbarEl.scrollTop)
        this.$store.commit("setGunDongHigh",scrollbarEl.scrollTop)

      };

  },
  beforeDestroy() {
    // 组件销毁时，移除窗口大小改变事件的监听
    window.removeEventListener("resize", this.setOuterDivSize);
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  // background: #000000;
}

::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

dialog::backdrop {
  background: rgba($color: #000000, $alpha: 0.4);
}
dialog {
  transition: opacity 0.4s ease;
  opacity: 1;
}
dialog:not([open]) {
  display: block;
  opacity: 0;
  visibility: hidden;
}


.el-table__body-wrapper::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(0,0,0,1);
    }
</style>
