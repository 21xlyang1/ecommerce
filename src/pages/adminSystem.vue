<template>
  <div class="w-100 d-flex" :style="{ height: outerDivHeight }">
    <myAside :title="'后台管理系统'" :sideList="sideList"></myAside>

    <el-scrollbar style="flex-grow: 1" :style="{ height: outerDivHeight }">
      <!-- <loadingVue class=" m-4"  v-show="isLoading" :size="40" ></loadingVue> -->
      <router-view name="tow"></router-view>
    </el-scrollbar>
  </div>
</template>
<script>
import myHead from "@/components/myHead.vue";
import myAside from "@/components/myAside.vue";
import loadingVue from "@/components/loading.vue";
export default {
  name: "",
  components: { myHead, myAside, loadingVue },
  data() {
    return {
      outerDivHeight: "", // 最外层div的高度
      isLoading: false,
      sideList: [
        {
          name: "数据统计",
          to: "/as/dataShow",
          num: 0,
          icon: "shujutongji",
        },
        {
          name: "用户管理",
          to: "/as/userManage",
          num: 2,
          icon: "yonghuguanli",
        },
        {
          name: "商家管理",
          to: "/as/storeManage",
          num: 0,
          icon: "shangjiaguanli",
        },
        { name: "订单管理", to: "/as/adminOrder", num: 11, icon: "dingdan1" },
        { name: "商品管理", to: "/as/adminProduct", num: 9, icon: "shangpinguanli1" },
        { name: "评论管理", to: "/as/commentManage", num: 26, icon: "pinglunguanli" },
        { name: "日志管理", to: "/as/logManage", num: 0, icon: "rizhiguanli" },
      ],
    };
  },
  methods: {
    setOuterDivSize() {
      this.outerDivHeight = window.innerHeight - 70 + "px";
      console.log("dsfasd");
    },
  },
  mounted() {
    this.setOuterDivSize(); // 初始化时设置最外层div的尺寸
    window.addEventListener("resize", this.setOuterDivSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setOuterDivSize);
  },
};
</script>

<style lang="scss" scoped>
.sideItem {
  color: #cedce4;
}
.sideItem:hover {
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
}
.numicon {
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  background-color: #ff7575;
  animation: pop-btn 0.25s ease; /* 鼠标悬浮时执行一次性动画 */
}
.numicon:hover {
  animation: pop-btn 0.25s ease; /* 鼠标悬浮时执行一次性动画 */
  transform: scale(1.3);
}

@keyframes pop-btn {
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1.3);
  }
}
</style>

