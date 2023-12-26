<template>
  <div class="seller-management">
    <!-- 标题栏 -->
    <div class="header p-3 mb-3 shadow-sm">
      <h2>商家管理</h2>
    </div>
    
    <!-- 搜索栏 -->
    <div class="search-bar mb-4">
      <input v-model="searchQuery" placeholder="搜索商家...">
      <button @click="searchSellers">搜索</button>
    </div>

    <!-- 商家列表 -->
    <div class="seller-list">
      <table class="table">
        <thead>
          <tr>
            <th>商家ID</th>
            <th>商家名称</th>
            <th>商品数量</th>
            <th>邮箱</th>
            <th>电话</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="seller in sellers" :key="seller.id">
            <td>{{ seller.id }}</td>
            <td>{{ seller.sellername }}</td>
            <td>{{ seller.member }}</td>
            <td>{{ seller.email }}</td>
            <td>{{ seller.phone }}</td>
            
            <td>
            <button class="btn-neumorphism edit" @click="editSeller(seller.id)">编辑</button>
            <button class="btn-neumorphism delete" @click="deleteSeller(seller.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
//import { get, post, deleter, put } from 'A:\stu\use\ecommerce\src\utils\http.js'; // 确保路径正确


export default {
  name: "SellerManagement",
  data() {
    return {
      searchQuery: '',
      sellers: [
        { id: 1, sellername: 'JaneDoe', member: '7', email: 'janedoe@example.com', phone:'13579' },
        { id: 2, sellername: 'JohnDoe', member: '489', email: 'johndoe@example.com', phone:'24680' },
        // 更多用户数据...
      ],
    };
  },
  methods: {
    fetchSellers() {
      get('/api/sellers')
        .then(response => {
          this.sellers = response.data;
        })
        .catch(error => {
          console.error("Error fetching sellers:", error);
        });
    },
    searchSellers() {
      get('/api/sellers/search', { query: this.searchQuery })
        .then(response => {
          this.sellers = response;
        })
        .catch(error => {
          console.error("Error searching sellers:", error);
        });
    },
    editSeller(sellerId) {
      // 替换为实际需要编辑的商家信息
      const sellerData = { sellername: 'NewName', member: '10', email: 'newemail@example.com', phone:'12345' };
      put(`/api/sellers/${sellerId}`, sellerData)
        .then(() => {
          this.fetchSellers(); // 重新获取商家列表
        })
        .catch(error => {
          console.error("Error editing seller:", error);
        });
    },
    deleteSeller(sellerId) {
      deleter(`/api/sellers/${sellerId}`)
        .then(() => {
          this.fetchSellers(); // 重新获取商家列表
        })
        .catch(error => {
          console.error("Error deleting seller:", error);
        });
    }
  },
  mounted() {
    this.fetchSellers(); // 组件加载完成时获取商家列表
  }
};
</script>

<style lang="scss" scoped>
.seller-management {
  background-color: #f0f0f3;
  padding: 20px;
  border-radius: 20px;
  .neumorphism-container {
    box-shadow: -10px -10px 20px #ffffff, 10px 10px 20px rgba(174, 174, 192, 0.4);
  }

  .neumorphism {
    background-color: #f0f0f3;
    border-radius: 20px;
    box-shadow: -5px -5px 10px #ffffff, 5px 5px 15px rgba(174, 174, 192, 0.4);
    margin-bottom: 20px;
  }

  .header {
    text-align: center;
  }

  .search-bar {
    display: flex;
    align-items: center;
    input {
      flex-grow: 1;
      padding: 10px 15px;
      border: none;
      border-radius: 20px;
      background-color: #f0f0f3;
      box-shadow: inset -2px -2px 5px #ffffff, inset 2px 2px 5px rgba(174, 174, 192, 0.4);
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 10px 20px;
      border: none;
      background-color: #f0f0f3;
      border-radius: 20px;
      box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px rgba(174, 174, 192, 0.4);
      color: #007bff;
      cursor: pointer;
      &:hover {
        background-color: #e0e0e3;
      }
    }
  }
  .btn-neumorphism {
    padding: 5px 15px;
    border: none;
    background-color: #f0f0f3;
    border-radius: 20px;
    box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px rgba(174, 174, 192, 0.4);
    color: #6c757d;
    cursor: pointer;
    margin-right: 10px;
    font-size: 14px;

    &:hover {
      background-color: #e0e0e3;
    }

    &.edit {
      color: #007bff;
    }

    &.delete {
      color: #dc3545;
    }
  }
  .seller-list {
    .table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 15px;
      thead {
        tr {
          background-color: transparent;
          th {
            padding: 10px;
            border: none;
            text-align: left;
            color: #6c757d;
          }
        }
      }
      tbody {
        tr {
          background-color: #f0f0f3;
          box-shadow: -5px -5px 10px #ffffff, 5px 5px 15px rgba(174, 174, 192, 0.4);
          border-radius: 10px;
          td {
            padding: 10px;
            border: none;
            color: #6c757d;
          }
        }
      }
    }
  }
}
</style>
