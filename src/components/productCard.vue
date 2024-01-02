<template>
  <div @click="toShow" style="min-width: 250px ;max-width:250px ; height: 350px;padding: 10px;cursor: pointer;">
    <div class="w-100 h-100  rounded-2 pro-card ">
      <!--      图片-->
      <div class="" style="width: 100%;height: 230px;padding:5px">
        <img style="height: 220px;width: 220px" :src="getProductImage(proId)" alt="Product Image"/>
      </div>
      <!--      商品名称-->
      <div class=" d-flex align-items-center" style="width: 100%;height: 24px">
        <div class="ms-3">
          {{ productName }}
        </div>
      </div>
      <div class="d-flex justify-content-between" style="width: 100%;height: 65px">
        <!--      详细信息-->
        <div style="height: 100%">
          <!--      商品小标签-->
          <div class="d-flex ms-2" style="height: 40%">
            <div v-for="item in dataList" :key="item.ID" class="bg-danger rounded-1 d-flex align-items-center"
                 style="font-size: 10px;width: auto;color: #fff;padding: 2px;margin: 5px 5px;min-width:54px;">
              {{ item.name }}
            </div>
          </div>
          <!--      月销量-->
          <div class="d-flex ms-2" style="height: 20%; font-size: 10px; padding-left: 5px;color:#666">
            月销量{{ saleNum }}件
          </div>
          <!--      商品价格-->
          <div class="d-flex ms-2 text-danger" style=" font-size:22px ;font-weight:700;height: 40%; padding-left: 5px">
            ￥{{ price }}
          </div>
        </div>
        <div>
        </div>
        <!--      店铺-->
        <div class=" d-flex  align-items-center" style="height: 100%;font-size: 14px ">
          <div class="d-flex" style="font-size:12px">
            店铺
          </div>
          <img src="../assets/img/1.png"
               style="border-radius: 50%;height: 34px;width: 34px;margin-right: 4px;border: solid 3px #cccccc">

        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { post } from "@/utils/http";
import router from '@/router';
export default {
  name: "productCard",
  props: ['proId'],
  data() {
    return {
      productName: "商品名称",
      dataList: [
        {ID: 1, name: '好评率98%'}, {ID: 2, name: '满300减50'}
      ],
      saleNum: '10万+',
      price: 11.11
    }
  },
  methods: {
    getProductImage(productId) {
      // 根据商品ID获取对应的商品图片路径，可以根据实际情况替换为真实的图片路径
      return './img/product/'+ productId % 2 + '.jpg';
    },
    getProductInfo(productId) {
      // 根据商品ID获取对应的商品信息，可以根据实际情况替换为真实的商品信息
      return `Product ${productId} Information`;
    },
    getProductPrice(productId) {
      // 根据商品ID获取对应的商品价格，可以根据实际情况替换为真实的商品价格
      return `$99.99`; // 举例价格
    },
    toShow(){
      this.$router.push("/ss/productShow/"+this.proId)
    }
  },
  mounted() {
  //""填入url地址，{}为请求参数
    post("/product/getProductInfo", {productId:this.proId}).then(
      (Response) => {
        console.log("请求成功", Response);
        //Response是返回的参数
        var data=Response.data
        this.productName=data.productName
        this.price=data.price
      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );
  },

};
</script>

<style lang="scss" scoped>
.pro-card{
  transition: 0.2s;
  background: #fff;
}
.pro-card:hover{

  transform: translateY(-4px);
  box-shadow: 4px 4px 10px #888888;
}


.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e7edee;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}

.product-image {
  width: 100%;
  max-height: 200px;
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
}

.product-info {
  margin-top: 12px;
  text-align: center;

  p {
    font-size: 16px;
    font-weight: bold;
    margin: 8px 0;
  }
}

.product-price {
  color: #e44d26;
  font-size: 18px;
  font-weight: bold;
}
</style>

