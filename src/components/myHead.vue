<template>
  <div
    class="h-100 d-flex justify-content-evenly w-100 shadow-sm myhead"
    style="background: #fff"
  >
    <!-- log -->

    <transition name="el-zoom-in-center">
      <div v-show="maxWidth > 1300">
        <div class="d-flex justify-content-center align-items-center">
          <img
            src="../assets/img/loge.png"
            style="height: 60px; width: 60px"
            alt=""
          />
          <div class="logotext">ECS</div>
        </div>
      </div>
    </transition>
    <!-- 导航2 -->
    <transition name="el-zoom-in-center">
      <div v-show="maxWidth <= 950" class="h-100">
        <div
          class="d-flex justify-content-end align-items-center pe-1"
          style="height: 70px; width: 70px"
        >
          <div class="rounded-1 hover-trigger">
            <v-icon
              name="list"
              style="color: #fff; font-size: 22px; line-height: 0px"
            ></v-icon>
            <div class="dropdown">
              <div
                class="w-100 pt-3 p-2 shadow-sm rounded-2"
                style="height: 180px; background-color: #eff4f7; z-index: -1"
              >
                <router-link
                  class="d-flex rounded-1 navitem justify-content-center align-items-center w-100"
                  v-for="item in indexList"
                  :key="item.ID"
                  style="height: 40px"
                  :style=" $route.path == item.url ? 'color: #f53082' : ''"
                  :to="item.url"
                > 
                  {{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 导航1 -->
    <transition name="el-zoom-in-center">
      <div v-show="maxWidth > 950" class="h-100">
        <div class="nav">
          <ul>
            <li v-for="item in indexList" :key="item.ID">
              <router-link
                :to="item.url"
                :style="  $route.path == item.url ? 'color: #f53082' : ''"
                >{{ item.name }}</router-link
              >
            </li>

            <div class="nav-box"></div>
          </ul>
        </div>
      </div>
    </transition>

    <!-- 搜索框 -->
    <div>
      <searchBox></searchBox>
    </div>

    <!-- 用户 -->
    <div>
      <usercard />
    </div>
  </div>
</template>
<script>
// import Search from "@/pages/search.vue";
import Search from "../components/searchPages.vue";
import searchBox from "./searchBox.vue";
import usercard from "./usercard.vue";
import shoppingTrolley from "./shoppingTrolley.vue";

export default {
  name: "myHead",
  components: { usercard, searchBox, Search, shoppingTrolley },
  data() {
    return {
      maxWidth: window.innerWidth, // 最外层div的宽度
      notNeedLog: false,
      indexList: [
        { ID: 1, name: "主页", url: "/ss/home" },
        { ID: 2, name: "商品分类", url: "/ss/productList" },
        { ID: 3, name: "开发日志", url: "/ss/logShow" },
      ],
      drawer: false,
      direction: "rtl",
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    setOuterDivSize() {
      this.maxWidth = window.innerWidth;
      console.log("maxwidth", this.maxWidth);
    },
  },
  mounted() {
    //  this.$store.commit("showRegister")
    if (this.notNeedLog) {
      this.$cookies.set("isLog", true);
    } else {
      // this.$cookies.set('isLog',false);
    }

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
.myhead {
  transition: 1s;
  transform: calc(0px);
}
.logotext {
  font-size: 30px;
  font-weight: 600;
  color: #f53082;
}

* {
  list-style: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #8da1f8;
}

.nav {
  width: 400px;
  height: 70px;
  position: relative;
  top: 0;

  background-color: #fff;
}
.nav ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  right: 5%;
}
.nav ul .nav-box {
  position: absolute;
  bottom: 0;
  left: 0;
  /* 如果导航栏就六个导航，那么每个导航的宽度都是整个导航
            的六分之一 */
  width: calc((100% / 3) * 1);
  height: 10px;
  border-radius: 2px;
  transition: 0.5s;
}
.nav ul li {
  width: 100%;
  text-align: center;
}
.nav ul li a {
  color: rgb(70, 100, 180);
  font: 500 22px "优设标题黑";
  display: block;
  width: 100%;
  height: 100%;
  line-height: 70px;
}
.nav ul li:nth-child(1):hover ~ .nav-box {
  left: calc(100% / 3 * 0);
  background-color: rgb(250, 190, 250);
}
.nav ul li:nth-child(2):hover ~ .nav-box {
  left: calc(100% / 3 * 1);
  background-color: red;
}
.nav ul li:nth-child(3):hover ~ .nav-box {
  left: calc(100% / 3 * 2);
  background-color: #d18df8;
}
// .nav ul li:nth-child(4):hover ~ .nav-box {
//   left: calc(100% / 6 * 3);
//   background-color: #ffb1b1;
// }
// .nav ul li:nth-child(5):hover ~ .nav-box {
//   left: calc(100% / 6 * 4);
//   background-color: #8da1f8;
// }
// .nav ul li:nth-child(6):hover ~ .nav-box {
//   left: calc(100% / 6 * 5);
//   background-color: #7df88e;
// }

.hover-trigger {
  position: relative;
  cursor: pointer;
  height: 50px;
  width: 48px;
  background: rgb(143, 117, 218);
  padding: 14px 13px;
}
.dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0px;
  width: 150px;
  z-index: 100;
  opacity: 0;
  animation: pop-btn 0.3s ease-in-out;
  
}
@keyframes pop-btn {
  0% {
    transform: translateY(-150px);
    opacity: 0;
    /* 动画开始时缩放为0 */
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
    /* 动画结束时缩放为1 */
  }
}
.hover-trigger:hover .dropdown {
  display: inline;
  opacity: 1;
  // transform: translateY(0);
  // color:#eff4f7
}
.navitem{
  color:rgb(70, 100, 180);
  font: 500 18px "优设标题黑";
}
.navitem:hover{
  background: rgb(70, 100, 180,0.2);
}
</style>

