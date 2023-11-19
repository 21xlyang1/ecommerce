<template>
  <div  class=" p-3" style="min-width: 250px  ; height: 350px;">
    <div class="w-100 h-100 bg-danger">
<!--      {{proId}}-->
      <div class="product-image">
        <!-- 在这里使用商品图片的数据绑定 -->
        <img :src="getProductImage(proId)" alt="Product Image" />
      </div>
      <div class="product-info">
        <!-- 在这里使用商品信息的数据绑定 -->
        <p>{{ getProductInfo(proId) }}</p>
      </div>
      <div class="product-price">
        <!-- 在这里使用商品价格的数据绑定 -->
        <p>{{ getProductPrice(proId) }}</p>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "productCard",
    props: ['proId'],
    methods: {
      getProductImage(productId) {
        // 根据商品ID获取对应的商品图片路径，可以根据实际情况替换为真实的图片路径
        return `C:/Users/Yun/Desktop/Objects/学习/2023-2024秋季课/WEB开发/ecommerce/public/img/product/${productId}.jpg`;
      },
      getProductInfo(productId) {
        // 根据商品ID获取对应的商品信息，可以根据实际情况替换为真实的商品信息
        return `Product ${productId} Information`;
      },
      getProductPrice(productId) {
        // 根据商品ID获取对应的商品价格，可以根据实际情况替换为真实的商品价格
        return `$99.99`; // 举例价格
      },
    },
  };
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
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

