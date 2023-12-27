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
            <th>邮箱</th>
            <th>号码</th>
            <th>地址</th>
            <th>操作</th>
          </tr>
          <tr><th colspan="6">
              <button class="btn-neumorphism add" @click="addingSeller= true">添加</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="seller in filteredSellers" :key="seller.id">
            <td>{{ seller.id }}</td>
            <td>{{ seller.sellername }}</td>
            <td>{{ seller.email }}</td>
            <td>{{ seller.phone }}</td>
            <td>{{ seller.address }}</td>
            <td>
              <button class="btn-neumorphism edit" @click="editingSeller = true">编辑</button>
              <button class="btn-neumorphism delete" @click="deleteSeller(seller.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 编辑商家信息的模态框 -->
    <div class="modal" :class="{ active: editingSeller }">
      <div class="modal-content">
        <h3>编辑商家信息</h3>
        <form>
          <label for="edit-sellername">商家名:</label>
          <input type="text" id="edit-sellername" v-model="editedSeller.sellername" required>

          <label for="edit-email">邮箱:</label>
          <input type="email" id="edit-email" v-model="editedSeller.email" required>

          <label for="edit-phone">号码:</label>
          <input type="text" id="edit-phone" v-model="editedSeller.phone" required>

          <label for="edit-address">地址:</label>
          <input type="text" id="edit-address" v-model="editedSeller.address" required>

          <div class="modal-footer">
            <button type="submit" @click="handleEdit">保存</button>
            <button type="button" @click="cancelEdit">取消</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 添加商家的模态框 -->
    <div class="modal" :class="{ active: addingSeller }">
      <div class="modal-content">
        <h3>添加新商家</h3>
        <form @submit.prevent="saveNewSeller">
          <label for="add-sellername">商家名:</label>
          <input type="text" id="add-sellername" v-model="newSeller.sellername" required>

          <label for="add-email">邮箱:</label>
          <input type="email" id="add-email" v-model="newSeller.email" required>

          <label for="add-phone">号码:</label>
          <input type="text" id="add-phone" v-model="newSeller.phone" required>

          <label for="add-address">地址:</label>
          <input type="text" id="add-address" v-model="newSeller.address" required>

          <div class="modal-footer">
            <button type="submit" @click="addSeller">保存</button>
            <button type="button" @click="cancelAddSeller">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { get,post } from "@/utils/http";

export default {
  name: "SellerManagement",
  data() {
    return {
      searchQuery: "",
      sellers: [
     
      ],
      tempSeller:{
        sellername: "", 
        email: "", 
        phone: "", 
        address: ""
      },
      editingSeller: false,
      editedSeller: { id: null, sellername: "", email: "", phone: "", address: "" },
      addingSeller: false, // 添加商家模态框的显示状态
      newSeller: { sellername: "", email: "", phone: "", address: "" }, // 新商家的信息
    };
  },  
  mounted() {
    
  //""填入url地址，{}为请求参数
    get("/seller/getList", {}).then(
      (Response) => {
        sellers = Response.data;
        console.log("请求成功", Response);
        //Response是返回的参数
      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );
  },


  computed: {
    filteredSellers() {
      // 根据搜索查询过滤商家
      return this.sellers.filter(seller =>
        Object.values(seller).some(value =>
          value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
  },
  methods: {
    searchSellers() {
      // 搜索商家的逻辑
    },
     handleEdit(){
      this.editingSeller = false
       get("/seller/updata",this.editedSeller).then(
      (Response) => {
        sellers = Response.data;
        console.log("请求成功", Response);
      },
      (error) => {
        alert("修改失败")
        console.log("请求失败", error.message);
      }
    );
    },
    cancelEdit(){
      this.editingSeller = false;
    },
    
    deleteSeller(sellerId) {
      post("/seller/delete",sellerId).then(
      (Response) => {
        sellers = Response.data;
        console.log("请求成功", Response);
      },
      (error) => {
        alert("修改失败")
        console.log("请求失败", error.message);
      }
    );
    
    },
    
    addSeller() {
    this.addingSeller = false;
    post("/sellerr/addSeller",this.newSeller).then(
      (Response) => {
        sellers = Response.data;
        console.log("请求成功", Response);
      },
      (error) => {
        alert("修改失败")
        console.log("请求失败", error.message);
      }
    );
       
    },
    cancelAddSeller() {
       this.addingSeller = false;

     },
  },
};
</script>


<style lang="scss" scoped>

/* 添加样式以适应模态框的显示和隐藏 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  visibility: hidden;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal.active {
  visibility: visible;
}
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
