<template>
  <div class="adminProduct">
    <div class="row">
      <!--    页面标题-->
      <div class="page-title">
        后台商品管理-页面未自动适应版
      </div>
      <!--    商品显示数量和搜索-->
      <div class="row" style="margin-bottom: 10px; color: #797171;">
        <div class="col-md-6" style="font-size: 15px">
          显示<input style="width: 50px;height: 23px; margin: 0 5px 0 5px" type="number" v-model="itemsPerPage" min="1"
                     max="10" @input="updatePageCount">商品
        </div>
        <div class="col-md-6" style="font-size: 15px">
          搜索:<input style="width: 300px; height: 23px; margin: 0 5px 0 5px" type="text" v-model="searchQuery"
                      placeholder="输入关键词">
        </div>
      </div>
      <!--      商品-->
      <div style="margin-bottom: 10px">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <div class="dataTables_wrapper dt-bootstrap4 no-footer">
                <!--    商品显示-->
                <table class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <div class="th text-center">
                      <input type="checkbox" v-model="selectAll" @change="selectAllProducts">
                    </div>
                    <th class="text-center" style="width: 30%;text-align: left;">商品</th>
                    <th class="text-center" style="width: 15%;text-align: left;">添加时间</th>
                    <th class="text-center" style="width: 10%;text-align: left;">价格</th>
                    <th class="text-center" style="width: 10%;text-align: left;">数量</th>
                    <th class="text-center" style="width: 10%;text-align: left;">商品状态</th>
                    <th class="text-center" style="width: 20%;text-align: left;">编辑</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="product-row" v-for="(product, productId) in displayedProducts" :key="productId">
                    <td class="th text-center">
                      <input type="checkbox" v-model="product.selected">
                    </td>
                    <!--    商品信息-->
                    <td style="flex: 1; display: flex; align-items: center; overflow: hidden;">
                      <!--    商品图片-->
                      <div class="product-image" style="height: 30%; width: 30%; margin-right: 10px;">
                        <img :src="getProductImage(productId)" alt="Product Image">
                      </div>
                      <!--    商品名称-->
                      <div class="product-info"
                           style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        {{ product.name }}
                      </div>
                    </td>
                    <td class="text-center" style="flex: 1;"> <!--    添加时间-->
                      {{ product.addedTime }}
                    </td>
                    <td class="text-center" style="flex: 1;"> <!--    价格-->
                      ${{ product.price }}
                    </td>
                    <td class="text-center" style="flex: 1;"> <!--    数量-->
                      {{ product.quantity }}
                    </td>
                    <td class="text-center" style="flex: 1;"> <!--    商品状态-->
                      {{ product.status }}
                    </td>
                    <!-- 编辑栏 -->
                    <td class="text-center" style="flex: 1;">
                      <!-- 编辑按钮容器，使用 Flex 布局 -->
                      <div class="edit-btn-container">
                        <!-- 查看历史记录按钮 -->
                        <div class="edit-btn" style="height: 33%" @click="viewHistory(product)">
                          <i class="fas fa-history">1</i>
                        </div>
                        <!-- 编辑商品信息按钮 -->
                        <div class="edit-btn" style="height: 33%" @click="editProduct(product)">
                          <i class="fas fa-edit">2</i>
                        </div>
                        <!-- 删除商品按钮 -->
                        <div class="edit-btn" style="height: 33%" @click="deleteProduct(product)">
                          <i class="fas fa-trash-alt">3</i>
                        </div>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--    换页-->
      <div class="row">
        <!-- 分页控件 当商品显示数量 <= 3 商品显示错误-->
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
    </div>
  </div>
</template>
<script>
export default {
  name: "adminProduct",
  data() {
    return {
      products: [
        {
          productId: 1,
          name: '商品1',
          addedTime: '2023-01-01',
          price: '20.9',
          quantity: '50',
          status: '在售',
          selected: false
        },
        {
          productId: 2,
          name: '商品2',
          addedTime: '2023-01-05',
          price: '9.9',
          quantity: '20',
          status: '售罄',
          selected: false
        },
        {
          productId: 3,
          name: '商品3',
          addedTime: '2023-01-05',
          price: '9.9',
          quantity: '20',
          status: '售罄',
          selected: false
        },
        {
          productId: 4,
          name: '商品4',
          addedTime: '2023-01-05',
          price: '9.9',
          quantity: '20',
          status: '售罄',
          selected: false
        },
        {
          productId: 5,
          name: '商品5',
          addedTime: '2023-01-05',
          price: '9.9',
          quantity: '20',
          status: '售罄',
          selected: false
        },
        {
          productId: 6,
          name: '商品6',
          addedTime: '2023-01-05',
          price: '9.9',
          quantity: '20',
          status: '售罄',
          selected: false
        },
        {
          productId: 7,
          name: '商品7',
          addedTime: '2023-01-05',
          price: '9.9',
          quantity: '20',
          status: '售罄',
          selected: false
        }
      ],
      itemsPerPage: 4, // 初始每页显示的商品数量
      currentPage: 1,  // 初始当前页码
      searchQuery: '', // 用户的搜索关键词
      totalPages: 0, // 总页数
      selectAll: false,// 添加全局的属性来表示是否勾选了所有商品
    }
  },
  methods: {
    getProductImage(productId) {
      // 根据商品ID获取对应的商品图片路径，可以根据实际情况替换为真实的图片路径
      return './img/product/' + productId % 2 + '.jpg';
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

    // // 查看历史记录
    // viewHistory(product) {
    //   // 实现查看历史记录的逻辑
    //   console.log(`查看商品${product.name}的历史记录`);
    // },
    //
    // // 编辑商品信息
    // editProduct(product) {
    //   // 实现编辑商品信息的逻辑
    //   console.log(`编辑商品${product.name}的信息`);
    // },
    //
    // // 删除商品
    // deleteProduct(product) {
    //   // 实现删除商品的逻辑
    //   const index = this.products.findIndex(p => p.productId === product.productId);
    //   if (index !== -1) {
    //     this.products.splice(index, 1);
    //     this.calculateTotalPages(); // 更新总页数
    //   }
    // },

  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
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
  mounted() {
    this.calculateTotalPages();
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
      //border: 1px solid red;
    }

    .product-info {
      flex-grow: 1;
      overflow: hidden;
      font-size: 20px;
    }
  }
}

</style>

<head>
<!-- 其他 head 内容 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      integrity="sha512-" crossorigin="anonymous" referrerpolicy="no-referrer"/>
</head>

