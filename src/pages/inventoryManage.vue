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

.inventory-table th,
.inventory-table td {
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
import { post } from '@/utils/http';
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
      this.changeDataStock(product.id, product.stock);
    },
    decreaseStock(product) {
      if (product.stock > 0) {
        product.stock -= 1;
        if (product.stock === 0) {
          this.removeProduct(product);
        }
      }
      this.changeDataStock(product.id, product.stock);
    },
    editStock(product) {
      const newStock = prompt("请输入新的库存数量:", product.stock);
      if (newStock !== null && !isNaN(newStock)) {
        product.stock = parseInt(newStock, 10);
        if (product.stock === 0) {
          this.removeProduct(product);
        }
      }
      this.changeDataStock(product.id, product.stock);
    },
    deleteProduct(product) {
      const confirmDelete = confirm("确定要删除该商品吗？");
      if (confirmDelete) {
        // product.stock = 0;
        // this.removeProduct(product);
        post("/product/deleteProduct", { productId: Number(product.id) }).then(
        (Response) => {
          console.log("删除成功", Response);
          //Response是返回的参数
          var data = Response;
          //打印商品已经成功修改
          if (data.isSuccess)
            console.log(data.msg);
          this.loadData()
        },
        (error) => {
          console.log("删除失败", error.message);
        }
      );
      }
      // this.changeDataStock(product.id, product.stock);
    },
    removeProduct(product) {
      // Filter out the product with stock = 0
      this.products = this.products.filter((p) => p.stock > 0);
    },
    changeDataStock(productId, stock) {
      post("/product/editProduct", { productId: productId, stock: stock }).then(
        (Response) => {
          console.log("请求成功", Response);
          //Response是返回的参数
          var data = Response;
          //打印商品已经成功修改
          if (data.isSuccess)
            console.log(data.msg);
        },
        (error) => {
          console.log("请求失败", error.message);
        }
      );
    },
    loadData() {
      post("/product/getList", { searchKey: "", type: Number(0) }).then(
      (response) => {
        console.log("请求成功", response);
        // response是返回的参数
        var data = response.data;

        // 检查是否存在 productId 字段
        if (Array.isArray(data) && data.length > 0) {
          this.products = [];
          data.forEach((product) => {
            if (product.productId) {
              // 提取并处理 productId
              var productId = product.productId;
              console.log("商品ID:", productId);

              //此处根据商品id获取商品信息并且展示在前端上
              post("/product/getProductInfo", { productId: productId }).then(
                (Response) => {
                  console.log("请求成功", Response);
                  //Response是返回的参数
                  var data = Response.data;
                  var t = {};
                  t = {
                    id: data.productId,
                    name: data.productName,
                    stock: data.stock,
                  }
                  this.products.push(t);
                },
                (error) => {
                  console.log("请求失败", error.message);
                }
              );
            } else {
              console.error("未找到productId字段");
            }
          });
        } else {
          console.error("未找到符合条件的商品列表");
        }
      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );
    }
  },
  mounted() {
    //先获取商品id列表
    this.loadData()



  },
};
</script>
