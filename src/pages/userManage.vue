<template>
  <div class="user-management">
    <!-- 标题栏 -->
    <div class="header p-3 mb-3 shadow-sm">
      <h2>用户管理</h2>
    </div>
    
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
            <th>注册日期</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.registeredAt }}</td>
            <td>{{ user.role }}</td>
            <td>
            <button class="btn-neumorphism edit">编辑</button>
            <button class="btn-neumorphism delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
  data() {
    return {
      searchQuery: '',
      users: [
        { id: 1, username: 'JaneDoe', email: 'janedoe@example.com', registeredAt: '2021-01-01', role: '管理员' },
        { id: 2, username: 'JohnDoe', email: 'johndoe@example.com', registeredAt: '2021-02-01', role: '普通用户' },
        // 更多用户数据...
      ],
    };
  },
  methods: {
    searchUsers() {
      // TODO: 实现搜索逻辑
    },
    editUser(userId) {
      // TODO: 实现编辑用户逻辑
    },
    deleteUser(userId) {
      // TODO: 实现删除用户逻辑
    }
  }
};
</script>

<style lang="scss" scoped>
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
}
</style>
