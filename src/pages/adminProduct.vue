<template>
  <div class="adminProduct">
    <!-- 页面标题 -->
    <div class="page-title">
      后台商品管理
    </div>

    <!-- 商品显示数量和搜索 -->
    <div class="row" style="margin-bottom: 10px; color: #797171;">
      <!-- 添加商品-->
      <div style="height: 50px; margin-right: 10px">
        <el-button>添加商品</el-button>
      </div>

      <div class="col-md-6" style="font-size: 15px">
        显示
        <input style="width: 50px; height: 23px; margin: 0 5px 0 5px" type="number" v-model="itemsPerPage" min="5"
               max="10" @input="updatePageCount">
        商品
      </div>
      <div class="col-md-6" style="font-size: 15px; display: flex;">
        <el-input
            style="width: 350px; margin-right: 10px"
            type="text"
            v-model="searchQuery"
            placeholder="输入关键词"></el-input>
        <el-button style="height: 40px; margin-right: 10px" @click="search">搜索</el-button>
      </div>
    </div>


    <!-- 商品列表 -->
    <div style="margin-bottom: 10px">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered table-striped">
              <thead>
              <tr>
                <th class="text-center" style="width: 5%;">
                  <input type="checkbox" v-model="selectAll" @change="selectAllProducts">
                </th>
                <th class="text-center" style="width: 30%;">商品</th>
                <th class="text-center" style="width: 15%;">商铺</th>
                <th class="text-center" style="width: 15%;">价格</th>
                <th class="text-center" style="width: 15%;">库存</th>
                <th class="text-center" style="width: 15%;">商品状态</th>
                <th class="text-center" style="width: 15%;">编辑</th>
              </tr>
              </thead>
              <tbody>
              <tr class="product-row" v-for="(product, productId) in displayedProducts" :key="productId">
                <td class="text-center">
                  <input type="checkbox" v-model="product.selected">
                </td>
                <td style="display: flex;">
                  <div class="product-image" style="height: 30%; width: 30%; margin-right: 10px;">
                    <img :src="getProductImage(productId)" alt="商品图片">
                  </div>
                  <div class="product-info"
                       style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    {{ product.productName }}:{{ product.description }}
                  </div>
                </td>
                <td class="text-center">{{ product.storeId }}</td>
                <td class="text-center">${{ product.price }}</td>
                <td class="text-center">{{ product.stock }}</td>
                <td class="text-center">{{ product.status }}</td>
                <td class="text-center">
                  <el-button class="edit-btn" @click="openEditProduct(productId)">编辑商品</el-button>
                  <el-button class="edit-btn" @click="deleteProduct(productId)">删除商品</el-button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页控件 -->
    <div class="row">
      <div class="col-md-12">
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" href="#" aria-label="Previous" @click="changePage(currentPage - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
              <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" href="#" aria-label="Next" @click="changePage(currentPage + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <el-dialog title="编辑商品" :visible="editProductVisible" @close="closeEditDialog">
      <el-form :model="editedProduct" ref="editForm" label-width="80px">
        <el-form-item label="商品编号" prop="productId">
          <el-input v-model="editedProduct.productId" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input v-model="editedProduct.description"></el-input>
        </el-form-item>
        <el-form-item label="商铺" prop="storeId">
          <el-input v-model="editedProduct.storeId"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editedProduct.price"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="editedProduct.stock"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="status">
          <el-input v-model="editedProduct.status"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import repsonse from "core-js/internals/is-forced";
import {post} from "@/utils/http";

export default {
  name: "adminProduct",
  data() {
    return {
      originalProducts: [],
      // products: [
      //   {
      //     productId: 1,
      //     productName: '商品1',
      //     description: '信息1',
      //     storeId: 'AAA',
      //     price: '20.9',
      //     stock: '50',
      //     status: '上架',
      //     selected: false,
      //   },
      //   {
      //     productId: 2,
      //     productName: '商品2',
      //     description: '信息2',
      //     storeId: 'GGG',
      //     price: '9.9',
      //     stock: '20',
      //     status: '售罄',
      //     selected: false,
      //   },
      //   {
      //     productId: 3,
      //     productName: '商品3',
      //     description: '信息3',
      //     storeId: 'BBB',
      //     price: '9.9',
      //     stock: '20',
      //     status: '下架',
      //     selected: false,
      //   },
      //   {
      //     productId: 4,
      //     productName: '商品4',
      //     description: '信息4',
      //     storeId: 'CCC',
      //     price: '9.9',
      //     stock: '20',
      //     status: '下架',
      //     selected: false,
      //   },
      //   {
      //     productId: 5,
      //     productName: '商品5',
      //     description: '信息5',
      //     storeId: 'DDD',
      //     price: '9.9',
      //     stock: '20',
      //     status: '上架',
      //     selected: false,
      //   },
      //   {
      //     productId: 6,
      //     productName: '商品6',
      //     description: '信息6',
      //     storeId: 'EEE',
      //     price: '9.9',
      //     stock: '20',
      //     status: '上架',
      //     selected: false,
      //   },
      //   {
      //     productId: 7,
      //     productName: '商品7',
      //     description: '信息7',
      //     storeId: 'FFF',
      //     price: '9.9',
      //     stock: '20',
      //     status: '上架',
      //     selected: false,
      //   }
      // ],
      products: [],
      itemsPerPage: 5, // 初始每页显示的商品数量
      currentPage: 1,  // 初始当前页码
      searchQuery: '', // 用户的搜索关键词
      totalPages: 0, // 总页数
      selectAll: false,// 添加全局的属性来表示是否勾选了所有商品

      editProductVisible: false,
      editedProduct: {
        productId: '',
        productName: '',
        description: '',
        storeId: '',
        price: '',
        stock: '',
        status: '',
      },

    }
  },
  methods: {
    getProductImage(productId) {
      // 根据商品ID获取对应的商品图片路径，可以根据实际情况替换为真实的图片路径
      return './img/product/' + productId % 2 + '.jpg';
    },

    search() {
      // 如果是第一次搜索，则保存原始数据
      if (this.originalProducts.length === 0) {
        this.originalProducts = [...this.products];
      }

      // 根据关键词进行搜索
      const filteredProducts = this.products.filter(item => {
        return item.productName.includes(this.searchQuery) || item.storeId.includes(this.searchQuery) || item.description.includes(this.searchQuery);
      });

      // 更新商品
      this.products = filteredProducts;
      // 更新总页数
      this.calculateTotalPages();
      // 重置当前页码为1
      this.currentPage = 1;
    },

    // 计算总页数
    calculateTotalPages() {
      this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },

    // 切换页面
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    // 更新每页显示商品数量
    updatePageCount() {
      this.currentPage = 1;
      if (this.itemsPerPage > this.filteredProducts.length) {
        this.itemsPerPage = this.filteredProducts.length;
      }
      this.calculateTotalPages();
    },

    // 点击标题全选
    selectAllProducts() {
      this.products.forEach(product => {
        product.selected = this.selectAll;
      });
    },

    // 删除商品
    deleteProduct(productId) {
      const index = productId;

      // axios.post('/product/deleteProduct', {
      //   productId: index,
      // }).then(response => {
      //   const msg = response.msg;
      //   alert(msg);
      // }).catch(error => {
      //   console.log('商品数据删除失败：', error);
      // });

      post('/product/deleteProduct', {
        productId: index,
      }).then((Response) => {
        const msg = Response.msg;
        alert(msg);
      }).catch((error) => {
        console.log('商品数据删除失败：', error);
      });


      if (index !== -1) {
        this.products.splice(index, 1);
        this.calculateTotalPages(); // 更新总页数
      }
    },

    // 编辑
    openEditProduct(productId) {
      // 打开编辑对话框，设置编辑项的初始值
      this.editedProduct = {
        ...this.products[productId]
      };
      this.editProductVisible = true;
    },
    closeEditDialog() {
      // 关闭编辑对话框
      this.editProductVisible = false;
    },
    // 更新商品数据
    saveEdit() {
      // axios.post('/product/editProduct', {
      //   productId: this.editedProduct.productId,
      //   productName: this.editedProduct.productName,
      //   description: this.editedProduct.description,
      //   storeId: this.editedProduct.storeId,
      //   price: this.editedProduct.price,
      //   stock: this.editedProduct.stock,
      //   productStatus: this.editedProduct.status,
      // }).then(response => {
      //   const msg = response.msg;
      //   alert(msg);
      // }).catch(error => {
      //   console.log('商品数据更新失败：', error);
      // });

      post('/product/editProduct', {
        productId: this.editedProduct.productId,
        productName: this.editedProduct.productName,
        description: this.editedProduct.description,
        storeId: this.editedProduct.storeId,
        price: this.editedProduct.price,
        stock: this.editedProduct.stock,
        productStatus: this.editedProduct.status,
      }).then((Response) => {
        const msg = Response.msg;
        alert(msg);
      }).catch((error) => {
        console.log('商品数据更新失败：', error);
      });

      // // 找到编辑项在原始数据中的索引
      // const index = this.products.findIndex(item => item.productId === this.editedProduct.productId)
      // // console.log("index:",index);

      // if (index !== -1) {
      //   const updatedProducts = {
      //     productName: this.editedProduct.productName,
      //     description: this.editedProduct.description,
      //     storeId: this.editedProduct.storeId,
      //     price: this.editedProduct.price,
      //     stock: this.editedProduct.stock,
      //     status: this.editedProduct.status,
      //   };
      //   this.products.splice(index, 1, Object.assign({}, this.products[index], updatedProducts));
      // }

      // 关闭编辑对话框
      this.editProductVisible = false;
    },
    validEditForm() {
      // 进行数据验证，这里只是简单的示例，你可以根据实际需求进行修改
      if (!this.editedProduct.productName || !this.editedProduct.storeId || !this.editedProduct.price || !this.editedProduct.stock || !this.editedProduct.status) {
        // 如果数据不合法，可以添加提示或其他操作
        return false;
      }

      return true;
    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.productName.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    displayedProducts() {
      const startIdx = (this.currentPage - 1) * this.itemsPerPage;
      const endIdx = startIdx + this.itemsPerPage;
      const actualEndIdx = Math.min(endIdx, this.filteredProducts.length);
      return this.filteredProducts.slice(startIdx, actualEndIdx);
    },
  },
  watch: {
    filteredProducts() {
      this.calculateTotalPages();
    },
  },
  // 获取商品数据
  mounted() {
    post('/product/getsList').then((Response) => {
          console.log("请求成功");

          this.products = Response.data;

          this.calculateTotalPages();
        }, (error) => {
          console.log("请求失败:", error);
        }
    );

    //   axios.post('/product/getList')
    //       .then(response => {
    //         this.products = response.data;
    //       })
    //       .catch(error => {
    //         console.error('获取商品数据失败：', error);
    //       });
    //
    //   this.calculateTotalPages();
  },

}
</script>

<style lang="scss" scoped>
.adminProduct {
  margin-left: 35px;
  color: #797171;

  .page-title {
    margin: 20px 20px 10px 0;
    padding: 5px;
    font-weight: 800;
    font-size: 25px;
  }

  .card {
    margin-left: 0;

    .table-responsive {
      overflow-x: auto;
      max-width: 100%;
    }

    .table {
      width: 100%;
      color: #797171;

      .product-row {
        height: 50px;
        margin-top: 5px;
      }

      .product-image img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
      }

      .product-info {
        flex-grow: 1;
        overflow: hidden;
        font-size: 20px;
      }
    }
  }
}
</style>

<head>
<!-- 其他 head 内容 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      integrity="sha512-" crossorigin="anonymous" referrerpolicy="no-referrer"/>
</head>

