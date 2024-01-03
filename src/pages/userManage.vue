<template>
  <div class="user-management">
    <!-- 标题栏 -->
    <div class=" d-flex mb-3 mt-2">
      <div style="font-weight: 700; font-size: 18px">用户管理</div>
    </div>
    <div class="w-100 mt-3 rounded-2  bg-body shadow p-3 ">
      <!-- 搜索栏 -->
      <div class="search-bar mb-4">
        <input v-model="searchQuery" placeholder="搜索用户...">
        <button @click="searchUsers">搜索</button>
      </div>

      <!-- 用户列表 -->
      <div class="user-list">
        <table class="table">
          <thead>
            <tr>
              <th>用户ID</th>
              <th>用户名</th>
              <th>邮箱</th>
              <th>号码</th>
              <th>角色</th>
              <th>操作</th>
            </tr>
            <tr>
              <th colspan="6">
                <button class="btn-neumorphism add" @click="addingUser = true">添加</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button class="btn-neumorphism edit" @click="editUser(user)">编辑</button>
                <button class="btn-neumorphism delete" @click="deleteUser(user.id)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 编辑用户信息的模态框 -->
    <div class="modal" :class="{ active: editingUser }">
      <div class="modal-content">
        <h3>编辑用户信息</h3>
        <form>
          <label for="edit-id">用户ID:</label>
          <input type="text" id="edit-id" v-model="editedUser.id" readonly>

          <label for="edit-username">用户名:</label>
          <input type="text" id="edit-username" v-model="editedUser.username" required>

          <label for="edit-email">邮箱:</label>
          <input type="email" id="edit-email" v-model="editedUser.email" required>

          <label for="edit-phone">号码:</label>
          <input type="text" id="edit-phone" v-model="editedUser.phone" required>

          <label for="edit-password">密码：</label>
          <input type="text" id="edit-password" v-model="editedUser.password" required>

          <label for="edit-role">角色:</label>
          <select id="edit-role" v-model="editedUser.role" required>
            <option value="管理员">管理员</option>
            <option value="普通用户">普通用户</option>
            <option value="用户">用户</option>
            <!-- 添加更多角色选项 -->
          </select>
          <div class="modal-footer">
            <button type="submit" @click="handleEdit">保存</button>
            <button type="button" @click="cancelEdit">取消</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 添加用户的模态框 -->
    <div class="modal" :class="{ active: addingUser }">
      <div class="modal-content">
        <h3>添加新用户</h3>
        <form @submit.prevent="saveNewUser">

          <label for="add-username">用户名:</label>
          <input type="text" id="add-username" v-model="newUser.username" required>

          <label for="add-email">邮箱:</label>
          <input type="email" id="add-email" v-model="newUser.email" required>

          <label for="add-phone">号码:</label>
          <input type="text" id="add-phone" v-model="newUser.phone" required>

          <label for="add-password">密码：</label>
          <input type="text" id="add-password" v-model="newUser.password" required>

          <label for="add-role">角色:</label>
          <select id="add-role" v-model="newUser.role" required>
            <option value="管理员">管理员</option>
            <option value="普通用户">普通用户</option>
            <option value="用户">用户</option>
            <!-- 添加更多角色选项 -->
          </select>
          <div class="modal-footer">
            <button type="submit" @click="addUser">保存</button>
            <button type="button" @click="cancelAddUser">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from "@/utils/http";

export default {
  name: "UserManagement",
  data() {
    return {
      searchQuery: "",
      users: [
        // { id: 1, username: "JaneDoe", email: "janedoe@example.com", phone: "13579", role: "管理员" },
        // { id: 2, username: "JohnDoe", email: "johndoe@example.com", phone: "24680", role: "用户" },
        // 更多用户数据...
      ],
      tempUser: {
        username: "",
        email: "",
        phone: "",
        role: ""
      },
      editingUser: false,
      editedUser: { id: null, username: "", email: "", phone: "", password: "", role: "" },
      addingUser: false, // 添加用户模态框的显示状态
      newUser: { username: "", email: "", phone: "", password: "", role: "" }, // 新用户的信息
    };
  },
  mounted() {
    //""填入url地址，{}为请求参数
    // get("/user/getList", {}).then(
    //   (Response) => {
    //     this.users = Response.data;
    //     console.log("请求成功", Response);
    //     //Response是返回的参数
    //   },
    //   (error) => {
    //     console.log("请求失败", error.message);
    //   }
    // );
    this.loadData()
  },


  computed: {
    filteredUsers() {
      // 根据搜索查询过滤用户
      return this.users.filter(user =>
        Object.values(user).some(value =>
          value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
  },
  methods: {
    loadData() {
      get("/user/getList", {}).then(
        (Response) => {
          this.users = Response.data;
          console.log("请求成功", Response);
          //Response是返回的参数
        },
        (error) => {
          console.log("请求失败", error.message);
        }
      )
    },
    searchUsers() {
      // 搜索用户的逻辑
    },
    editUser(user) {
      this.editedUser.id = user.id;
      this.editedUser.username = user.username;
      this.editedUser.email = user.email;
      this.editedUser.phone = user.phone;
      this.editedUser.password = user.password;
      this.editedUser.role = user.role;

      // 打开编辑用户信息的模态框
      this.editingUser = true;
    },
    handleEdit() {
      this.editingUser = false;
      post("/user/update", this.editedUser).then(
        (Response) => {
          this.loadData()
          console.log("请求成功", Response);
        },
        (error) => {
          alert("修改失败");
          console.log("请求失败", error.message);
        }
      );
    },
    cancelEdit() {
      this.editingUser = false;
    },
    deleteUser(userId) {
      post("/user/delete", { userID: userId }).then(
        (Response) => {
          this.loadData()
          console.log("请求成功", Response);
        },
        (error) => {
          alert("删除失败");
          console.log("请求失败", error.message);
        }
      );
    },
    addUser() {
      this.addingUser = false;
      post("/user/addUser", this.newUser).then(
        (Response) => {
          // this.users = Response.data;
          this.loadData()
          console.log("请求成功", Response);
        },
        (error) => {
          alert("添加失败");
          console.log("请求失败", error.message);
        }
      );
    },
    cancelAddUser() {
      this.addingUser = false;
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

.user-management {
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

  .user-list {
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
}</style>
