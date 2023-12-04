<template>
  <el-scrollbar
    style="
      min-width: 300px;
      background: linear-gradient(135deg, #8f75da 0, #727cf5 60%);
    "
    :style="{ height: outerDivHeight }"
  >
    <div
      class="w-100 d-flex justify-content-center align-items-center"
      style="height: 100px; color: #fff"
    >
      <div style="font-size: 20px">{{ title }}</div>
    </div>
    <router-link
      :to="item.to"
      class="d-flex align-items-center sideItem"
      v-for="(item, index) in sideList"
      :key="index"
      style="height: 80px; text-decoration: none"
      :style="{color:$route.path==item.to?'#ff8989':''}"
    >
      <div
        class="d-flex justify-content-center align-items-center"
        style="width: 80px"
      >
        <v-icon :name="item.icon" style="font-size: 24px"></v-icon>
      </div>

      <div class="d-flex" style="font-size: 18px; width: 160px">
        {{ item.name }}
      </div>
      <div
        class="d-flex justify-content-center align-items-center"
        style="width: 80px"
      >
        <!-- <div class=" bg-body rounded-1" style="width: 36px; height: 16px;color: #000;font-size:12px ">
            New
          </div> -->
        <div
          v-if="item.num != 0"
          class="d-flex justify-content-center align-items-center numicon"
        >
          <div>{{ item.num }}</div>
        </div>
      </div>
    </router-link>
  </el-scrollbar>
</template>
<script>
export default {
  name: "",
  props: ["sideList", "title"],
  data() {
    return {
      outerDivHeight: "", // 最外层div的高度
      
    };
  },
  methods: {
    setOuterDivSize() {
      this.outerDivHeight = window.innerHeight - 70 + "px";
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
  background: rgba(0, 0, 0, 0.1);
}
.numicon {
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  background-color: #ff7575;

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


