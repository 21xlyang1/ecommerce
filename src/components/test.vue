<template>
  <div>
    <h2>购物车</h2>
    <div v-if="cartItems.length > 0">
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item-wrapper">
        <div class="cart-item">
          <img :src="require(`@/assets/img/${item.image}`)" alt="商品图片">
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <div class="quantity-controls">
              <span class="quantity-label">数量：</span>
              <button class="quantity-btn" @click="updateQuantity(index, -1)">-</button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button class="quantity-btn" @click="updateQuantity(index, 1)">+</button>
            </div>
            <p>价格: ¥{{ calculateItemPrice(item) }}</p>
          </div>
        </div>
      </div>
      <button @click="submitOrder">提交订单</button>
    </div>
    <div v-else>
      <p>购物车是空的</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCart",
  data() {
    return {
      cartItems: [
        {
          name: "商品1",
          description: "商品1的描述",
          price: 100,
          quantity: 2,
          image: "wallhaven-5dgw35.jpg"
        },
        {
          name: "商品2",
          description: "商品2的描述",
          price: 50,
          quantity: 1,
          image: "1.png"
        },
        // Add more items as needed
      ]
    };
  },
  methods: {
    submitOrder() {
      // Logic to submit the order
      console.log("订单已提交");
    },
    updateQuantity(index, change) {
      const updatedQuantity = this.cartItems[index].quantity + change;
      if (updatedQuantity > 0) {
        this.cartItems[index].quantity = updatedQuantity;
      } else {
        // Remove the item from the cart when quantity is 0
        this.cartItems.splice(index, 1);
      }
    },
    calculateItemPrice(item) {
      return item.price * item.quantity;
    },
  }
};
</script>

<style lang="scss" scoped>
.cart-item-wrapper {
  margin-left: -10px;
}

.cart-item {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
}

.cart-item img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  margin-right: 10px;
}

.quantity-label {
  margin-right: 0;
  white-space: nowrap;
  vertical-align: middle;
}

.quantity-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 1px 5px;
  cursor: pointer;
  font-size: 10px;
  vertical-align: middle;
}

.quantity-value {
  margin: 0 5px;
  font-weight: bold;
  vertical-align: middle;
}
</style>
