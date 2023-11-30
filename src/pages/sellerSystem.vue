<template>
  <div class="w-100 d-flex" :style="{ height: outerDivHeight }">
    <myAside
      :title="'商家管理系统'"
      :sideList="sideList"
    ></myAside>

    <el-scrollbar style="flex-grow: 1" :style="{ height: outerDivHeight }">

      <!-- <loadingVue class=" m-4"  v-show="isLoading" :size="40" ></loadingVue> -->
      <router-view name="tow"></router-view>
    </el-scrollbar>
  </div>
</template>
<script>
import myHead from "@/components/myHead.vue";
import myAside from "@/components/myAside.vue";
import loadingVue from '@/components/loading.vue';
export default {
  name: "",
  components: { myHead, myAside,loadingVue },
  data() {
    return {
      outerDivHeight: "", // 最外层div的高度
      isLoading:false,
      sideList: [
        {
          name: "发布商品",
          to: "/ms/productAdd",
          num: 0,
          icon: "fabushangping",
        },
        {
          name: "商品管理",
          to: "/ms/productManage",
          num: 2,
          icon: "shangpinguanli",
        },
        { name: "库存管理", to: "/ms/inventoryManage", num: 0, icon: "kucuntongji" },
        { name: "订单查看", to: "/ms/sellerOrder", num: 11, icon: "dingdan1" },
        { name: "退货审核", to: "/ms/returnCheck", num: 9, icon: "ruihuo" },
        { name: "商家资料", to: "/ms/sellerInf", num: 0, icon: "ziliao" },
        { name: "数据统计", to: "/ms/dataStatistics", num: 0, icon: "shujutongji" },
      ],
    };
  },
  methods: {
    setOuterDivSize() {
      this.outerDivHeight = window.innerHeight - 70 + "px";
      console.log("dsfasd")
    },

  },
  mounted() {
    this.setOuterDivSize(); // 初始化时设置最外层div的尺寸
    window.addEventListener("resize", this.setOuterDivSize);
  },
  beforeDestroy(){
    window.removeEventListener("resize", this.setOuterDivSize);
  }
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

