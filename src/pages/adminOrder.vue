<template>
  <div class="title">
    <h4>订单页面-管理员可以在这个页面对订单进行管理</h4>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/as/dataShow' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="display: inline-flex; margin-top: 20px;">
      <el-input
        v-model="keyword"
        :disabled="disabled"
        :placeholder="placeholder"
        prefix-icon="el-icon-search"
        style="width: 350px; margin-right: 10px"
        clearable
        @clear="search"
        @keydown.enter.native="search"
      ></el-input>
      <el-button :disabled="disabled" icon="el-icon-search" type="primary" @click="search">搜索</el-button>
    </div>

    <!-- 商品订单表格 -->
    <div class="order-table">
      <table class="custom-table">
        <thead>
          <tr>
            <th>商品名称</th>
            <th>商品图片</th>
            <th>商品价格</th>
            <th>商品订单号</th>
            <th>发货状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in displayedProducts" :key="index">
            <td>{{ product.name }}</td>
            <td>
              <img :src="getProductImage(product.productId)" alt="商品图片" style="max-width: 50px; max-height: 50px; border-radius: 5px;">
            </td>
            <td>￥{{ product.price }}</td>
            <td>{{ product.orderNumber }}</td>
            <td>{{ product.deliveryStatus }}</td>
            <td>
              <el-button @click="editProduct(product)" type="primary">编辑</el-button>
              <el-button @click="deleteProduct(index)" type="danger">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <el-pagination
        style="margin-top: 20px; text-align: right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        :total="products.length"
      />

    </div>

    <!-- 编辑商品信息的弹窗 -->
    <el-dialog title="编辑商品信息" :visible="editDialogVisible" @close="closeEditDialog">
      <el-form :model="editedProduct" ref="editForm" label-width="80px">
        <el-form-item label="订单号" prop="orderNumber">
          <el-input v-model="editedProduct.orderNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="发货状态" prop="deliveryStatus">
          <el-input v-model="editedProduct.deliveryStatus"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入昵称进行搜索，可以直接回车搜索...'
    }
  },
  data() {
    return {
      keyword: '',
      originalTableData: [],
      products: [
        { productId: 1, name: '商品1', price: '20.9', orderNumber: 454654655465, deliveryStatus: '已发货' },
        { productId: 2, name: '商品2', price: '9.9', orderNumber: 121321231321, deliveryStatus: '未发货' },
        { productId: 3, name: '商品3', price: '19.9', orderNumber: 456456456455, deliveryStatus: '未发货' },
        { productId: 4, name: '商品4', price: '9.9', orderNumber: 121321231321, deliveryStatus: '已发货' },
        { productId: 5, name: '商品5', price: '19.9', orderNumber: 78789899891, deliveryStatus: '已发货' },
        { productId: 6, name: '商品6', price: '29.9', orderNumber: 121321231321, deliveryStatus: '未发货' },
      ],
      editedProduct: {
        orderNumber: '',
        deliveryStatus: '',
      },
      editDialogVisible: false,
      pageSize: 10,
      currentPage: 1,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          product.name.includes(this.keyword) ||
          product.orderNumber.toString().includes(this.keyword)
        );
      });
    },
    displayedProducts() {
    const startIdx = (this.currentPage - 1) * this.pageSize;
    const endIdx = startIdx + this.pageSize;
    return this.filteredProducts.slice(startIdx, endIdx);
  },
  },
  methods: {
    getProductImage(productId) {
      // Replace this with your logic to get the product image
      return `./img/product/${productId % 2}.jpg`;
    },
    editProduct(product) {
      this.editedProduct = {
        orderNumber: product.orderNumber,
        deliveryStatus: product.deliveryStatus,
      };
      this.editDialogVisible = true;
    },
    closeEditDialog() {
      this.editDialogVisible = false;
    },
    saveEdit() {
      const index = this.products.findIndex(
        (product) => product.orderNumber === this.editedProduct.orderNumber
      );
      if (index !== -1) {
        this.products[index].deliveryStatus = this.editedProduct.deliveryStatus;
      }
      this.editDialogVisible = false;
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
    },
    search() {
  // 如果是第一次搜索，则保存原始数据
      if (this.originalTableData.length === 0) {
        this.originalTableData = [...this.products];
      }

      // 根据商品名称或订单号进行搜索
      const keywordLower = this.keyword.toLowerCase();
      this.filteredProducts = this.originalTableData.filter((product) =>
        product.name.toLowerCase().includes(keywordLower) ||
        product.orderNumber.toString().includes(keywordLower)
      );

      // 更新分页控件的总数
      this.$refs.pagination.total = this.filteredProducts.length;

      // 重置当前页码为1
      this.currentPage = 1;
    },

handleSizeChange(size) {
  this.pageSize = size;
  this.currentPage = 1; // 重置当前页码为1
},

handleCurrentChange(page) {
  this.currentPage = page;
},

  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 30px;
  margin-left: 30px;
}
.order-table {
  margin-top: 20px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
}
</style>
