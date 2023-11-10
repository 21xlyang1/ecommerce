<template>
  <div class="h-100 d-flex justify-content-evenly w-100 shadow-sm myhead">
    <!-- log -->
    <div class="d-flex justify-content-center align-items-center">
      <img
        src="../assets/img/loge.png"
        style="height: 60px; width: 60px"
        alt=""
      />
      <div class="logotext">ECS</div>
    </div>
    <!-- 导航 -->
    <div class="h-100">
      <div class="nav">
        <ul>
          <li v-for="item in indexList" :key="item.ID">
            <a :href="item.url" >{{ item.name }}</a>
          </li>

          <div class="nav-box"></div>
        </ul>
      </div>
    </div>

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
import Search from "@/pages/search.vue";
import searchBox from "./searchBox.vue";
import usercard from "./usercard.vue";

export default {
  name: "myHead",
  components: { usercard, searchBox, Search },
  data() {
    return {
      indexList: [
        { ID: 1, name: "主页", url: "/#/ss/home" },
        { ID: 1, name: "商品分类", url: "#/ss/productList" },
        { ID: 1, name: "开发日志", url: "/#/ss/logShow" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.myhead {
  position: sticky;
  top: 0;
  // left: 0;
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
</style>

