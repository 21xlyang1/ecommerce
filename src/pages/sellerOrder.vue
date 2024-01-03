<template>
  <div class="title">
    <p>下面是订单页面，商家可以在这个页面对订单进行管理，编辑、删除的操作</p>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/ms/productAdd' }">商家管理</el-breadcrumb-item>
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

    <div class="tab">
      <table class="custom-table">
        <thead>
          <tr>
            <th>日期</th>
            <th>用户名</th>
            <th>是否发货</th>
            <th>省份</th>
            <th>地址</th>
            <th>订单号</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in displayedData" :key="index">
            <td>
              <span v-if="!item.editing">{{ item.date }}</span>
              <input v-else v-model="item.date" />
            </td>
            <td>
              <span v-if="!item.editing">{{ item.name }}</span>
              <input v-else v-model="item.name" />
            </td>
            <td>
              <span v-if="!item.editing">{{ item.deliveryStatus }}</span>
              <input v-else v-model="item.deliveryStatus" />
            </td>
            <td>
              <span v-if="!item.editing">{{ item.provence }}</span>
              <input v-else v-model="item.provence" />
            </td>
            <td>
              <span v-if="!item.editing">{{ item.address }}</span>
              <input v-else v-model="item.address" />
            </td>
            <td>
              <span v-if="!item.editing">{{ item.orderNumber }}</span>
              <input v-else v-model="item.orderNumber" />
            </td>
            <td>
              <el-button @click="openEditDialog(index)" type="primary">编辑</el-button>
              <el-button @click="deleteRow(index)" type="danger">删除</el-button>
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
        :total="tableData.length"
      />
    </div>

    <el-dialog title="编辑信息" :visible="editDialogVisible" @close="closeEditDialog">
      <el-form :model="editedItem" ref="editForm" label-width="80px">
        <el-form-item label="日期" prop="date">
          <el-input v-model="editedItem.date" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editedItem.name"></el-input>
        </el-form-item>
        <el-form-item label="是否发货" prop="deliveryStatus">
          <el-input v-model="editedItem.deliveryStatus"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="provence">
          <el-input v-model="editedItem.provence"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editedItem.address"></el-input>
        </el-form-item>
        <el-form-item label="订单号" prop="orderNumber">
          <el-input v-model="editedItem.orderNumber"></el-input>
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
    originalTableData: [], // 保存原始的表格数据
    tableData: [{
      date: '2016-05-02',
      name: '王小虎',
      deliveryStatus: '发货',
      provence: '广东省',
      address: '汕头市澄海区汕头大学东海岸校区',
      orderNumber: 20033312312312312,
      editing: false
    }, {
      date: '2016-05-04',
      name: '王小虎',
      deliveryStatus: '未发货',
      provence: '广东省',
      address: '汕头市澄海区汕头大学东海岸校区',
      orderNumber: 20033312312312312,
      editing: false
    }, {
      date: '2016-05-04',
      name: '王小虎',
      deliveryStatus: '未发货',
      provence: '广东省',
      address: '汕头市澄海区汕头大学东海岸校区',
      orderNumber: 20033312312312312,
      editing: false
    }, {
      date: '2016-05-04',
      name: '王小虎',
      deliveryStatus: '未发货',
      provence: '广东省',
      address: '汕头市澄海区汕头大学东海岸校区',
      orderNumber: 20033312312312312,
      editing: false
    }, {
      date: '2016-05-04',
      name: '张三',
      deliveryStatus: '发货',
      provence: '广东省',
      address: '汕头市澄海区汕头大学东海岸校区',
      orderNumber: 20033312312312312,
      editing: false
    }, {
      date: '2016-05-04',
      name: '王小虎',
      deliveryStatus: '未发货',
      provence: '广东省',
      address: '汕头市澄海区汕头大学东海岸校区',
      orderNumber: 20033312312312312,
      editing: false
    }, {
      date: '2016-05-01',
      name: '王小虎',
      deliveryStatus: '发货',
      provence: '广东省',
      address: '汕头市澄海区汕头大学东海岸校区',
      orderNumber: 20033312312312312,
      editing: false
    }, {
      date: '2016-05-03',
      name: '王小虎',
      deliveryStatus: '发货',
      provence: '广东省',
      address: '汕头市澄海区汕头大学东海岸校区',
      orderNumber: 20033312312312312,
      editing: false
    }],
    keyword: '',
    editDialogVisible: false,
    editedItem: {
      date: '',
      name: '',
      deliveryStatus: '',
      provence: '',
      address: '',
      orderNumber: '',
    },
    currentPage: 1, // 添加 currentPage 属性
    pageSize: 5,
  };
},

computed: {
    displayedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    search() {
      // 如果是第一次搜索，则保存原始数据
      if (this.originalTableData.length === 0) {
        this.originalTableData = [...this.tableData];
      }

      // 根据用户名或订单号进行搜索
      const filteredData = this.originalTableData.filter((item) => {
        return (
          item.name.includes(this.keyword) ||
          item.zip.toString().includes(this.keyword)
        );
      });

      // 更新显示的数据和总条数
      this.tableData = filteredData;
      this.$refs.pagination.currentPage = 1; // 重置当前页码为1
    },
    toggleEdit(index) {
      this.tableData[index].editing = !this.tableData[index].editing;
    },
    deleteRow(index) {
      post("/order/deleteOrder", { orderID: orderId }).then(
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
    openEditDialog(index) {
      this.editedItem = {
        date: this.tableData[index].date,
        name: this.tableData[index].name,
        deliveryStatus: this.tableData[index].deliveryStatus,
        provence: this.tableData[index].provence,
        address: this.tableData[index].address,
        orderNumber: this.tableData[index].orderNumber,
        };
      this.editDialogVisible = true;
    },
    closeEditDialog() {
      // 关闭编辑对话框
      this.editDialogVisible = false;
    },
    saveEdit() {
      // this.addingUser = false;
      post("/order/editOrder",this.editedItem).then(
        (Response) => {
          // this.users = Response.data;
          this.getOrdList()
          console.log("请求成功", Response);
        },
        (error) => {
          alert("保存失败");
          console.log("请求失败", error.message);
        }
      );
      // // 进行数据验证，这里只是简单的示例，你可以根据实际需求进行修改
      // if (!this.validateEditForm()) {
      //   // 数据验证失败，可以在这里添加提示或其他操作
      //   return;
      // }
      // // 找到编辑项在原始数据中的索引
      // const index = this.tableData.findIndex(item => item.date === this.editedItem.date);
      // if (index !== -1) {
      //   // 只更新需要修改的字段
      //   const updatedFields = {
      //     name: this.editedItem.name,
      //     send: this.editedItem.send,
      //     provence: this.editedItem.provence,
      //     address: this.editedItem.address,
      //     zip: this.editedItem.zip
      //   };
      //   // 使用 Object.assign 或者展开运算符 (...) 更新原始数据
      //   this.tableData.splice(index, 1, Object.assign({}, this.tableData[index], updatedFields));
      // }

      // 关闭编辑对话框
      this.editDialogVisible = false;
    },
    validateEditForm() {
      // 进行数据验证，这里只是简单的示例，你可以根据实际需求进行修改
      if (!this.editedItem.name || !this.editedItem.send) {
        // 如果数据不合法，可以添加提示或其他操作
        return false;
      }

      return true;
    },
    handleSizeChange(size) {
    this.pageSize = size;
    this.currentPage = 1; // 重置当前页码为1
    },

    handleCurrentChange(page) {
      this.currentPage = page;
    },
    getOrdList() {
      console.log("asdada")
      // this.isLoading = true;
      post("/order/orderList").then(
        (Response) => {
          // console.log("请求成功", Response);
          //Response是返回的参数
          var data = Response.data;
          console.log("请求成功", data);
          this.tableData = data;
          // this.isLoading = false;
        },
        (error) => {
          console.log("请求失败", error.message);
        }
      );
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    mounted() {
    this.getOrdList()
  },
  }
};
</script>

<style lang="scss" scoped>
  .title {
    margin-top: 30px;
    margin-left: 30px;
  }
  .tab{
    box-shadow: 0 0.125rem 0.25rem rgba(var(--bs-body-color-rgb), 0.075) !important;
    padding: 1rem !important;
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity)) !important;
    margin-right: 30px;
    margin-top: 20px;
    border-radius: 8px
  }
  .custom-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果，可根据需要调整 */
    border-radius: 8px;
    /* 设置边框边缘圆润度，根据需要调整 */
    overflow: hidden;
    /* 保证边框圆润效果 */
  }

  th,td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
</style>
