<template>
  <el-scrollbar
    style="
      background: linear-gradient(135deg, #8f75da 0, #727cf5 60%);
      transition: 0.5s;
      overflow:visible;
    "
    :style="{
      height: outerDivHeight,
      'min-width': isZoom ? '60px' : '300px',
      width: isZoom ? '60px' : '300px',
    }"
  >
    <div
      class="w-100 d-flex justify-content-center align-items-center"
      style="height: 100px; color: #fff"
    >
      <img
        :src="'./img/icon/管理.png'"
        style="width: 24px; height: 24px"
        alt=""
      />
      <div v-show="!isZoom" class="ms-2 tshow" style="font-size: 20px">
        {{ title }}
      </div>
    </div>
    <router-link
      :to="item.to"
      class="d-flex align-items-center sideItem"
      v-for="(item, index) in sideList"
      :key="index"
      style="height: 80px; text-decoration: none"
      :style="{ color: $route.path == item.to ? '#ff8989' : '' }"
    >
      <div

        style="width: 80px;"
      >
        <div class="d-flex justify-content-center align-items-center w-100">
          <v-icon :name="item.icon" style="font-size: 24px"></v-icon>
        </div>

        <div id="name"  v-show="isZoom" >
          <div class="d-flex justify-content-center" style="font-size:14px">
            {{item.name}}
          </div>
          
        </div>
      </div>

      <div v-show="!isZoom" class="tshow" style="font-size: 18px; width: 160px">
        {{ item.name }}
      </div>
      <div v-show="!isZoom">
        <div
          class="justify-content-center align-items-center"
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
      </div>
      <!-- <div class=" dropdown">
        <div class="d-flex justify-content-center align-items-center "  style="height: 80px;width: 200px;">
          <div>{{item.name}}</div>
        </div>
      </div> -->
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
      isZoom: window.innerWidth < 1000,
    };
  },
  methods: {
    setOuterDivSize() {
      this.outerDivHeight = window.innerHeight - 70 + "px";

      this.isZoom = window.innerWidth < 1000;
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
  background: rgba(0, 0, 0, 0.1);
  position: relative;
}
.sideItem:hover .dropdown {
  display: flex;
  opacity: 1;
}
.sideItem:hover div #name {
  display: block;

}
#name{
  display: none;

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

.tshow {
  animation: textShow 0.5s;
}
@keyframes textShow {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>


