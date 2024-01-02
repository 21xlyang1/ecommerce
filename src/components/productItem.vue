<template>
  <div class="mainDiv">
    <div class="singleCard">
      <!-- <h3>0303030303030303</h3> -->
      <div class="commodityPhoto" @click="toShow">
        <div class="photo">
          <img src="../assets/img/仙人掌.png" alt="图片" />
        </div>
      </div>
      <div class="commodityText">
        <div class="commodityName" @click="toShow">
          <span>{{ commodityName }}</span>
        </div>
        <div class="Box-for-Reviews-And-freeShipping-And-prices" style="">
          <div class="Reviews-And-freeShipping">
            <div class="box1">
              <label>{{ freeShipping }}</label>
            </div>
            <div class="box2">
              <label>好评率{{ Review }}%</label>
            </div>
          </div>
          <div class="prices">
            <label>￥{{ prices }}</label>
          </div>
        </div>
        <div class="Box-shopName-And-salesVolume">
          <div class="shopPhoto">
            <div class="photo">
              <div><img src="../assets/img/1.png" alt="图片" /></div>
            </div>
            <div class="name">
              <span>{{ shopName }}</span>
            </div>
          </div>
          <div class="saleVolume">
            <label>本月已卖出{{ saleVolume }}件</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from '@/utils/http';

export default {
  props: ["proId"],
  data() {
    return {
      commodityName: "这一行显示商品名称，(悬停变色)",
      saleVolume: "4万",
      shopName: "店铺名称",
      prices: "1212.21",
      freeShipping: "包邮",
      Review: "60",
    };
  },
  methods: {
    toShow() {
      this.$router.push("/ss/productShow/" + this.proId);
    },
  },
  mounted() {
    //""填入url地址，{}为请求参数
    post("/product/getProductInfo", { productId: this.proId }).then(
      (Response) => {
        console.log("请求成功", Response);
        //Response是返回的参数
        var data = Response.data;
        this.commodityName = data.productName;
        this.prices = data.price;
      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.mainDiv {
  border-radius: 10px;
  // background-color: red;
  background-color: #fff;
  height: 180px;
  width: 100%;
  // width: 100px;

  margin-bottom: 20px;

  display: flex;
  justify-content: center;
  // align-items: center;

  padding: 20px;

  // 阴影
  // box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);

  // 初始状态下，将 mainDiv 下移 0 像素
  transform: translateY(0);
  // 添加过渡效果，使移动有平滑的动画
  transition: transform 0.3s;
}
.mainDiv:hover {
  // 鼠标悬停时，将 mainDiv 上移 3 像素（可以根据需要调整）
  transform: translateY(-3px);
  // 阴影
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

.singleCard {
  width: 100%;
  height: 100%;
  // background-color: gray;

  // display: flex;
  // justify-content: center;
  // align-items: center;

  display: grid;
  grid-template-columns: 140px 1fr; /* 两列，左右布局 */
  grid-column-gap: 20px; /* 列之间的间隙 */
}

.singleCard .commodityPhoto {
  // background-color: khaki;
  width: 10px;
  height: 10px;
  width: 100%; /* 调整宽度为50% */
  height: 100%; /* 设置高度为100% */

  // 水平 垂直 居中
  display: flex;
  justify-content: center;
  align-items: center;
}

.commodityPhoto .photo {
  // background-color: cyan;
  // width: 200px;
  // height: 200px;
  width: 100%;
  height: 100%;
  // border-radius: 30px;
  cursor: pointer;
}
.commodityPhoto .photo img {
  width: 100%;
  border-radius: 10px;
}

.singleCard .commodityText {
  // background-color: magenta;
  // width: 10px;
  // height: 10px;
  width: 100%; /* 调整宽度为50% */
  height: 100%; /* 设置高度为100% */

  display: grid;
  grid-template-rows: 30px 1fr 45px; /* 三行，上下布局 */
}

.commodityText .commodityName {
  // background-color: green;
  text-align: left; /* 文本左对齐 */
  font-size: 20px;
  position: relative;
}
.commodityName span {
  cursor: pointer; /* 鼠标样式设为手型 */
  display: inline-block;
}
.commodityName span:hover {
  color: red;
}

.commodityText .Box-for-Reviews-And-freeShipping-And-prices {
  // background-color: yellow;
  display: grid;
  grid-template-columns: 1fr 150px; // 两列，左右布局
}
.Box-for-Reviews-And-freeShipping-And-prices .Reviews-And-freeShipping {
  // background-color: aqua;
  position: relative;
}
.Box-for-Reviews-And-freeShipping-And-prices .Reviews-And-freeShipping div {
  background-color: red;
  width: 90px;
  height: 25px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Box-for-Reviews-And-freeShipping-And-prices .Reviews-And-freeShipping .box1 {
  position: absolute;
  bottom: 10px;
  left: 5px;
}
.Box-for-Reviews-And-freeShipping-And-prices .Reviews-And-freeShipping .box2 {
  position: absolute;
  bottom: 10px;
  left: 105px;
}
.Box-for-Reviews-And-freeShipping-And-prices .Reviews-And-freeShipping label {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}
.Box-for-Reviews-And-freeShipping-And-prices .prices {
  // background-color: burlywood;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Box-for-Reviews-And-freeShipping-And-prices .prices label {
  font-size: 29px;
  color: red;
  font-weight: bold;
}

.commodityText .Box-shopName-And-salesVolume {
  // background-color: blue;
  display: grid;
  grid-template-columns: 150px 1fr; /* 两列，左右布局 */
}
.Box-shopName-And-salesVolume .shopPhoto {
  // background-color: dimgrey;
  display: grid;
  grid-template-columns: 45px 1fr; /* 两列，左右布局 */
}
.Box-shopName-And-salesVolume .shopPhoto .photo {
  // background-color: lightseagreen;
  // 水平 垂直 居中
  display: flex;
  justify-content: center;
  align-items: center;
}
.Box-shopName-And-salesVolume .shopPhoto .photo div {
  // background-color: cyan;
  width: 43px;
  height: 43px;
  border-radius: 50%;
  cursor: pointer; // 变成手型选择
}
.Box-shopName-And-salesVolume .shopPhoto .photo div img {
  width: 100%;
  border-radius: 50%;
}
.Box-shopName-And-salesVolume .shopPhoto .name {
  // background-color: yellowgreen;
  text-align: left; /* 文本左对齐 */
  display: flex;
  // justify-content: center;
  align-items: center;
  padding-left: 10px;
}
.Box-shopName-And-salesVolume .shopPhoto .name span {
  cursor: pointer; // 变成手型选择
}
.Box-shopName-And-salesVolume .shopPhoto .name span:hover {
  color: red;
}
.Box-shopName-And-salesVolume .saleVolume {
  // background-color: hotpink;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: relative;
}
.Box-shopName-And-salesVolume .saleVolume label {
  position: absolute;
  bottom: 0;
  right: 10px;
  font-size: 12px;

  font-weight: bold;
}
</style>