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
export default {
  data() {
    return {
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
    productName: this.productName,
    productDescription: this.productDescription,
    productPrice: this.productPrice,
    stockQuantity: this.stockQuantity,
  };
      // 打印数据到控制台
      console.log('Product Data:', productData);

  // 发送 POST 请求到后端
  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('商品发布成功', data);
      // 清空表单或跳转到其他页面
    })
    .catch(error => {
      console.error('商品发布失败', error);
    });
},

  },

};
</script>

<style lang="scss" scoped></style>

