<template>
  <div>
    <div style="width: 100%; background-color: rgb(0, 145, 255); font-size: 20px;padding-left: 5px;">
      欢迎使用库存管理系统
    </div>
    <table class="inventory-table">
      <thead>
        <tr>
          <th>商品ID</th>
          <th>商品名称</th>
          <th>当前库存数量</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <button class="action-btn" @click="increaseStock(product)">增加库存</button>
            <button class="action-btn" @click="decreaseStock(product)">减少库存</button>
            <button class="action-btn" @click="editStock(product)">编辑库存</button>
            <button class="action-btn" @click="deleteProduct(product)">删除商品</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.inventory-table {
  width: 100%;
  border-collapse: collapse;
}

.inventory-table th, .inventory-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.inventory-table th {
  background-color: #f2f2f2;
}

.action-btn {
  margin: 0 5px;
}
</style>

<script>
export default {
  name: "InventoryManagement",
  data() {
    return {
      products: [
        { id: 1, name: "商品1", stock: 100 },
        { id: 2, name: "商品2", stock: 50 },
        // Add more products as needed
      ],
    };
  },
  methods: {
    increaseStock(product) {
      product.stock += 1;
    },
    decreaseStock(product) {
      if (product.stock > 0) {
        product.stock -= 1;
        if (product.stock === 0) {
          this.removeProduct(product);
        }
      }
    },
    editStock(product) {
      const newStock = prompt("请输入新的库存数量:", product.stock);
      if (newStock !== null && !isNaN(newStock)) {
        product.stock = parseInt(newStock, 10);
        if (product.stock === 0) {
          this.removeProduct(product);
        }
      }
    },
    deleteProduct(product) {
      const confirmDelete = confirm("确定要删除该商品吗？");
      if (confirmDelete) {
        product.stock = 0;
        this.removeProduct(product);
      }
    },
    removeProduct(product) {
      // Filter out the product with stock = 0
      this.products = this.products.filter((p) => p.stock > 0);
    },
  },
};
</script>
