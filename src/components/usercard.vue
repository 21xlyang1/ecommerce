<template>
  <div class="d-flex h-100 align-items-center">
    <!-- 头像 -->
    <div class="hover-trigger"  style="z-index: 1;">
      <div class="photo">
        <img v-show="isLog" src="../assets\img\1.png" alt="" />
        <div
          class="d-flex justify-content-center align-content-center"
          v-show="!isLog"
        
        >
          <v-icon
            style="font-size: 35px; color: #fafafa"
            name="yonghu"
          ></v-icon>
        </div>
      </div>
      <div class="dropdown" style="z-index: -1;">
        <!-- 登入前的下拉框 -->
        <div
          v-if="!isLog"
          class="p-2 pt-3 pb-3 shadow-sm rounded-2 w-100"
          style="height: 200px; background-color: #eff4f7"
        >
          <div class="d-flex justify-content-center">
            <div>登入即可享受</div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="h5 mb-3">极致优惠</div>
          </div>
          <div class="d-flex justify-content-center">
            <div>
              <el-button
                :round="true"
                type="primary"
                style="width: 180px"
                @click="$store.commit('showLogin')"
                >登入</el-button
              >
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="pt-3">
              <el-button
                :round="true"
                type="warning"
                style="width: 180px"
                @click="$store.commit('showRegister')"
                >注册</el-button
              >
            </div>
          </div>
        </div>
        <!-- 登入后的下拉框 -->
        <div
          v-if="isLog"
          class="w-100 p-3 shadow-sm rounded-2"
          style="height: 250px; background-color: #eff4f7;z-index: -1;"
          :style="{height:maxWidth<=1150?'320px':'250px'}"
        >
          <div class="h6 pb-3">{{ "username" }}</div>
          <!-- 用户操作 -->
          <transition name="el-zoom-in-center">
            <div v-show="maxWidth <= 1150">
              <div class="d-flex w-100 justify-content-evenly">
                <router-link
                  v-for="(item, index) in indexList"
                  :key="index"
                  class="h-100 hover-effect ps-3 pe-3"
                  @mouseover="changeTextColor(item, true)"
                  @mouseout="changeTextColor(item, false)"
                  :style="$route.path == item.url ? 'color: #f53082' : ''"
                  :to="item.url"
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
                    class="w-100 d-flex justify-content-center align-items-center"
                    style="height: 30px; font-size: 15px; color: #fafafa2f"
                    :style="{ color: item.textColor }"
                  >
                    {{ item.inf }}
                  </div>
                </router-link>
              </div>
            </div>
          </transition>
          <div
            class="d-flex justify-content-evenly rounded item align-items-center"
            v-for="(item, index) in btnList"
            :key="item.name"
            style="height: 40px; cursor: pointer"
            @click="clickButton(index)"
          >
            <v-icon
              :style="{ color: item.color }"
              style="font-size: 20px"
              :name="item.icon"
            ></v-icon>
            <div class="d-flex" style="width: 100px; font-size: 15px">
              {{ item.name }}
            </div>
            <div style="width: 18px">
              <img
                v-show="item.jiantou"
                src="../../public/img/icon/右箭头.png"
                style="height: 18px"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户操作 -->
    <transition name="el-zoom-in-center">
      <div v-show="maxWidth > 1150">
        <div class="d-flex">
          <router-link
            v-for="(item, index) in indexList"
            :key="index"
            class="h-100 hover-effect ps-3 pe-3"
            @mouseover="changeTextColor(item, true)"
            @mouseout="changeTextColor(item, false)"
            :style="$route.path == item.url ? 'color: #f53082' : ''"
            :to="item.url"
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
              class="w-100 d-flex justify-content-center align-items-center"
              style="height: 30px; font-size: 15px; color: #fafafa2f"
              :style="{ color: item.textColor }"
            >
              {{ item.inf }}
            </div>
          </router-link>
        </div>
      </div>
    </transition>
    <!-- 购物车按钮 -->
    <div @click="drawer = true" class="h-100 hover-effect ps-3 pe-3">
      <div class="w-100" style="height: 10px"></div>
      <div
        class="w-100 d-flex justify-content-center align-items-center"
        style="height: 30px"
      >
        <v-icon
          name="gouwuche"
          style="font-size: 30px; color: #f53082"
          class="icon"
        ></v-icon>
      </div>
      <div
        class="w-100 d-flex justify-content-center align-items-center"
        style="height: 30px; font-size: 15px;min-width: 45px;"
      >
        购物车
      </div>
    </div>
    <!-- 购物车 -->
    <el-drawer
      :withHeader="false"
      :show-close="false"
      :visible.sync="drawer"
      :direction="direction"
      :size="500"
    >
      <shoppingTrolley></shoppingTrolley>
    </el-drawer>
  </div>
</template>
<script>
import shoppingTrolley from "./shoppingTrolley.vue";
export default {
  name: "",
  components: { shoppingTrolley },

  data() {
    return {
      maxWidth: window.innerWidth, // 最外层div的宽度
      isDropdownVisible: false,
      indexList: [
        { name: "shoucang", inf: "收藏", url: "/ss/favorite" },
        { name: "dingdan", inf: "订单", url: "/ss/userOrder" },
        { name: "lishi", inf: "历史", url: "/ss/history" },
        // { name: "gouwuche", inf: "购物车",url:"" },
      ],
      btnList: [
        { color: "blue", name: "个人中心", icon: "person", jiantou: true },
        { color: "orange", name: "商家管理", icon: "shangjia", jiantou: true },
        { color: "green", name: "后台管理", icon: "houtai", jiantou: true },
        { color: "red", name: "退出登入", icon: "tuichu", jiantou: false },
      ],
      drawer: false,
      dialogVisible: false,
      direction: "rtl",
      isLog: false,
    };
  },
  methods: {
    changeTextColor(item, isHovered) {
      this.$set(item, "textColor", isHovered ? "#f53082" : "");
    },
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
    dianji(index) {
      console.log(index);
      if (index == 0) {
        this.$router.push("/ss/favorite");
      } else if (index == 1) {
        this.$router.push("/ss/userOrder");
      } else if ((index = 2)) {
        this.$router.push("/ss/history");
      } else if (index == 3) {
        this.drawer = true;
      }
    },
    showdengru() {
      this.$store.commit("showLogin");
    },
    clickButton(index) {
      // 个人中心
      if (index == 0) {
        // 商家管理
      } else if (index == 1) {
        if (this.$route.path != "/ms/productAdd") {
          this.$router.push("/ms/productAdd");
        }
        // 后台管理
      } else if (index == 2) {
        if (this.$route.path != "/as/dataShow") {
          this.$router.push("/as/dataShow");
        }

        // 退出登入
      } else if (index == 3) {
        this.$cookies.set("isLog", false);
      }
    },
    setOuterDivSize() {
      this.maxWidth = window.innerWidth;
      console.log("maxwidth", this.maxWidth);
    },
  },
  mounted() {
    this.setOuterDivSize(); // 初始化时设置最外层div的尺寸
    window.addEventListener("resize", this.setOuterDivSize);
    setInterval(() => {
      if (this.$cookies.get("isLog") == "true") {
        this.isLog = true;
      } else {
        this.isLog = false;
      }
    }, 100);
  },
  beforeDestroy() {
    // 组件销毁时，移除窗口大小改变事件的监听
    window.removeEventListener("resize", this.setOuterDivSize);
  },
};
</script>

<style lang="scss" scoped>
.item:hover {
  background: rgba($color: #000000, $alpha: 0.2);
}

a {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 保留默认颜色 */
}
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
  border: 5px solid#e3edf0;
  /* 设置边框为5像素实线，颜色为#fafafa*/
  background-color: #9ca4a8;

  /* 设置背景颜色为#fafafa*/
}
.photo:hover {
  border: 5px solid#fff9a7;
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
  left: -90px;
  width: 250px;
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

