<template>
  <div class="w-100">
    <div class="ccontainer" ref="myDiv" @resize="handleResize">
      <div class="content">
        <!-- Your content goes here -->
        <div class="w-100" style="height: 100%; overflow: hidden">
          <div
              class="lunbo"
              :style="{ transform: 'translateX(' + currentIndex * -100 + '%)' }"
          >
            <img
                v-for="index in imgNum"
                :key="index"
                class="lunboimg"
                :src="'/img/slideshow/' + (index - 1) + '.png'"
            />
          </div>
        </div>
      </div>
      <div class="conbg">
        <div class="h-100 w-100 p-0 d-flex justify-content-between">
          <div
              class="h-100 d-flex align-items-center"
              style="width: 4%; padding-bottom: 8%"
          >
            <img
                class="jiantou"
                @click="prevSlide"
                src="../../public/img/icon/左箭头 (1).png"
                alt=""
            />
          </div>
          <div
              class="d-flex align-items-end justify-content-evenly"
              style="padding-bottom: 8%; width: 30%"
          >
            <div
                v-for="index in imgNum"
                :key="index"
                class="bigbox d-flex justify-content-center align-items-center"
                style="width: 25%; height: 30px; cursor: pointer"
                @click="tunSlide(index - 1)"
                :style="'width:' + 100 / imgNum + '%'"
            >
              <div
                  :class="index - 1 == currentIndex ? 'pink' : 'tiao'"
                  style="width: 70%; height: 5px"
              ></div>
            </div>
          </div>
          <div
              class="h-100 d-flex align-items-center"
              style="width: 4%; padding-bottom: 8%"
          >
            <img
                class="jiantou"
                @click="nextSlide"
                src="../../public/img/icon/右箭头 (1).png"
                alt=""
            />
          </div>
        </div>
      </div>
      <div class="conbg w-100" style="height: 800px; top: 75%">
        <div
            v-for="i in 2"
            :key="i"
            class="w-100 d-flex justify-content-evenly"
            style="height: 350px"
        >
          <productCard
              :proId="item.ID"
              v-show="
              index > maxHang * (i - 1) && index <= maxHang * (i - 1) + hangNum
            "
              v-for="(item, index) in productList"
              :key="item.ID"
          ></productCard>
        </div>
      </div>
    </div>
    <div class="w-100 sbg" style="height: 600px"></div>
  </div>
</template>

<script>
import productCard from "@/components/productCard.vue";

export default {
  name: "",
  components: {productCard},
  data() {
    return {
      currentIndex: 0,
      imgNum: 3,
      productList: [
        {ID: 1, name: "Product 1", price: 19.99, imageUrl: "C:/Users/Yun/Desktop/Objects/学习/2023-2024秋季课/WEB开发/ecommerce/public/img/product/1.jpg" },
        {ID: 2, name: "Product 2", price: 29.99, imageUrl: "C:/Users/Yun/Desktop/Objects/学习/2023-2024秋季课/WEB开发/ecommerce/public/img/product/0.jpg"},
        {ID: 3},
        {ID: 4},
        {ID: 5},
        {ID: 6},
        {ID: 7},
        {ID: 8},
        {ID: 9},
        {ID: 10},
        {ID: 11},
        {ID: 12},
        {ID: 13},
        {ID: 14},
        {ID: 15},
        {ID: 16},
      ],
      hangNum: 6,
      maxHang: 6,
    };
  },
  methods: {
    tunSlide(id) {
      this.currentIndex = id;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.imgNum;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.imgNum) % this.imgNum;
    },
    getDivWidth() {
      // 使用$refs来获取引用的div元素

      const divWidth = this.$refs.myDiv.offsetWidth;
      console.log("Div宽度：", divWidth);
      return divWidth;
    },
    handleResize() {
      // 当div大小发生变化时触发的事件处理函数
      // 可以在这里执行你想要的操作
      console.log("Div大小发生变化！");
      this.hangNum = Math.floor(this.getDivWidth() / 250);
      if (this.hangNum > this.maxHang) {
        this.hangNum = this.maxHang;
      }
      console.log(this.hangNum);
    },
  },
  mounted() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);

    // 在组件挂载后立即获取一次宽度
    this.handleResize();

    // 监听窗口大小变化，当窗口大小变化时重新获取宽度
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
.lunbo {
  width: 100%;
  // position: relative;
  // overflow: hidden;
  transition: transform 0.8s ease-in-out;
  white-space: nowrap;
}

.lunboimg {
  width: 100%;
  height: auto;
}

.ccontainer {
  width: 100%;
  position: relative;
  padding-top: 30%; /* 高度为宽度的三分之一 */
}

.content {
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.conbg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
          to bottom,
          rgb(255, 253, 253, 0) 90%,
          #eaeceb 100%
  );
}

.sbg {
  background: #eaeceb;
}

.jiantou {
  width: 100%;
  opacity: 0.5;
  cursor: pointer;
}

.jiantou:hover {
  opacity: 1;
}

// .bigbox:hover{
//   background: #000;
// }

.pink {
  background: #ff7575;
}

.tiao {
  background: rgba($color: #ffffff, $alpha: 0.5);
}

.bigbox:hover > .tiao {
  background: #ffffff;
  box-shadow: 0px 0px 1px 1px #ffffff;
}

.bigbox:hover > .pink {
  background: #ff7575;
  box-shadow: 0px 0px 1px 1px #ff7575;
}
</style>
