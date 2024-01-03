<template>
  <div style="width: 80%;background-color: white;margin: 0 auto;margin-top: 30px;border: 2px solid black;">
    <div style="width: 100%; background-color: rgb(0, 145, 255); font-size: 20px;padding-left: 5px;">
      欢迎使用新版商品发布
    </div>
    <form @submit.prevent="submitForm">
      <div style="display: flex; align-items: center;margin: 10px;">
        <label for="productName">商品名称:</label>
        <input v-model="productName" type="text" name="productName" required style="flex: 1;">
      </div>

      <div style="display: flex; align-items: center;margin: 10px;">
        <label for="productDescription">商品描述:</label>
        <input v-model="productDescription" name="productDescription" required style="flex: 1;">
      </div>

      <div style="display: flex; align-items: center;margin: 10px;">

        <label for="productPrice">商品价格:</label>
        <input v-model="productPrice" type="number" name="productPrice" required>
      </div>

      <div style="display: flex; align-items: center;margin: 10px;">

        <label for="stockQuantity">库存数量:</label>
        <input v-model="stockQuantity" type="number" name="stockQuantity" required>
      </div>


      <div style="display: flex; flex-direction: column; margin: 10px;">
    <label for="productImage">请上传商品图片:</label>

    <div style="width: 100%;">
          <div @click="openFileInput" style="cursor: pointer;">
            <img v-if="!userSelectedImage" :src="require('@/assets/img/upimg.png')" alt="默认图片"
              style="max-width: 100px; max-height: 100px;">
            <img v-else :src="productImagePreview" alt="用户选择的图片预览" style="max-width: 100px; max-height: 100px;">
            <input type="file" ref="fileInput" @change="handleImageChange" id="productImage" accept="image/*" style="visibility: hidden; position: absolute;" required>
          </div>
        </div>
      </div>



      <button @click="submitForm">发布商品</button>
    </form>
  </div>
</template>
<script>
import { post } from '@/utils/http';
export default {
  data() {
    return {
      shopId:undefined,
      productName: '',         // 商品名称
      productDescription: '',  // 商品描述
      productPrice: null,      // 商品价格
      stockQuantity: null,     // 库存数量
      userSelectedImage: false, // 用户是否已选择了图片
      productImagePreview: null, // 保存图片的预览 URL
    };
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageChange(event) {
      this.userSelectedImage = true; // 用户选择了图片
      const selectedImage = event.target.files[0];

      // 预览图片
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.productImagePreview = e.target.result;
        };
        reader.readAsDataURL(selectedImage);
      }
    },
    submitForm() {

  // 构建商品数据对象
  const productData = {
  storeId: this.storeId, // 店铺id
  productName: this.productName, // 商品名称
  description: this.productDescription, // 商品描述
  stock: this.stockQuantity, // 商品数量
  price: this.productPrice, // 商品价格
};
  post("/product/getCartList", productData).then(
      (Response) => {
        console.log("请求成功", Response);
        //Response是返回的参数
        var data = Response.data;
        if(data.isSuccess){
          alert("发布商品成功");
        }
      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );

},

  },
  mounted(){
    // 获取商铺id
    post("/store/getStoreInfo", { userId: Number(this.$cookies.get("userId")) }).then(
      (Response) => {
        console.log("请求成功", Response);
        //Response是返回的参数
        var data = Response.data;
        this.shopId=data.shopId
      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );
  }

};
</script>

<style lang="scss" scoped></style>

