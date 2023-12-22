<template>
  <div class="Main" style="
      background-color: #fafbfe;
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 170px);
      margin-top: 100px;
    ">
    <div class="up">
      <div class="title"><span>日志管理</span></div>
    </div>
    <div class="down">
      <div style="text-align: center" class="addLog">
        <button @click="dialogVisible = true" class="addLog_btn">添加日志</button>
      </div>

      <el-dialog title="添加日志" :visible.sync="dialogVisible" width="700px" :modal-append-to-body="false"
        :close-on-press-escape="true" style="z-index: 100;">

        <el-form :model="form" label-position="top" ref="form" :rules="rules">
          <el-form-item label="标题" class="title" prop="title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="正文" class="text" prop="text">
            <el-input type="textarea" v-model="form.text"></el-input>
          </el-form-item>
          <el-form-item class="btn_box">
            <el-button @click="onSubmit">确认添加</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>

      <el-timeline v-if="dataList.length > 0">
        <Card v-for="(item, index) in dataList" :key="index" :data="item" @update-log="updateLog" :data-identifier="index"
          @delete-log="deleteLog" />
      </el-timeline>
      <div v-else class="non_log">
        当前无日志
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/logCard.vue";
export default {
  components: {
    Card, // 注册卡片的组件
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        title: '',
        text: '',
        time_data: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dataList: [
        {
          time_data: "2023/12/22 11:12:59",
          title: "标题1",
          text: "内容",
        },
        {
          time_data: "2023/11/11 11:12:59",
          title: "标题2",
          text: "内容",
        },
      ],
      formLabelWidth: '120px',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      rules: {
        title: [
          { required: true, message: '请输入日志标题', trigger: 'blur' },
        ],
        text: [
          { required: true, message: '请输入日志内容', trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 获取当前时间
          const currentTime = new Date();
          const formattedDateTime = currentTime.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // 使用24小时制
          });
          // 创建新的对象，使用表单数据填充
          const newEntry = {
            time_data: formattedDateTime,
            title: this.form.title, // 使用表单中的名称作为标题
            text: this.form.text, // 使用表单中的描述作为文本内容，根据实际需求调整
          };

          // console.log(newEntry);
          // console.log(this.form.time_data);
          // console.log(this.form);

          // 将新的对象添加到 dataList 数组中
          this.dataList.push(newEntry);

          // 按照时间排序
          this.sortDataList();

          this.dialogVisible = false;

          // 重置表单
          this.onReset();
        }
        else {
          console.log('表单验证失败');
        }
      });
    },
    onReset() {
      // 重置表单数据
      this.form = {
        text: '',
        title: '',
        time_data: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      };
    },
    updateLog({ identifier, newData }) {
      console.log(identifier);
      console.log(newData);
      this.dataList[identifier].time_data = newData.time_data;
      this.dataList[identifier].title = newData.title;
      this.dataList[identifier].text = newData.text;
      // 按照时间排序
      this.sortDataList();
    },
    deleteLog(identifier) {
      // Delete
      this.dataList.splice(identifier, 1);
    },
    // 添加一个排序方法
    sortDataList() {
      this.dataList.sort((a, b) => {
        // 将时间字符串转换为日期对象进行比较
        const dateA = new Date(a.time_data);
        const dateB = new Date(b.time_data);

        // 逆序排序，最新的在前面
        return dateB - dateA;
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.down {
  // background-color: blueviolet; // 测试时使用的背景颜色
  background-color: #fff;
  box-sizing: border-box;
  margin: 30px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);

  .addLog {
    // background-color: blueviolet;
    display: flex;
    justify-content: flex-start;
    padding-left: 35px;
    margin-bottom: 20px;

    .addLog_btn {
      text-align: center;
      width: 135px;
      height: 35px;
      cursor: pointer;
      border: 1px solid transparent;
      background-color: #fa5c7c;
      border-color: #fa5c7c;
      border-top-color: rgb(250, 92, 124);
      border-right-color: rgb(250, 92, 124);
      border-bottom-color: rgb(250, 92, 124);
      border-left-color: rgb(250, 92, 124);
      // box-shadow: 0 2px 6px 0 rgba(250, 92, 124, .5);
      color: #fff;
      font-weight: 400;
      font-size: 1.05rem;
      border-radius: 2px;
      transition: all 0.2s ease;
    }

    .addLog_btn:hover {
      background-color: #f9375e;
      box-shadow: 0 2px 10px 0 rgba(250, 92, 124, .5);
      border: 1px solid transparent;
    }
  }

  .btn_box {
    // background-color: red;
    display: flex;
    justify-content: flex-end;
  }
}

.up {
  height: 100px; // 对话框高度
  position: fixed;
  // background-color: chocolate; // 测试时使用的背景颜色
  background-color: rgb(255, 255, 255);
  top: 70px;
  width: calc(100% - 30px);
  transition: width 0.5s ease;
  box-shadow: -1px 7px 5px rgba(0, 0, 0, 0.2);

  z-index: 3;

  .title {
    // background-color: black;
    font-size: 18px;
    margin-top: 30px;
    margin-left: 30px;
    font-weight: 700;
    color: #6c757d;
  }
}

@media screen and (min-width: 1000px) {
  .up {
    /* 在页面宽度大于1000px时的样式 */
    width: calc(100% - 300px);
    /* 添加过渡动画 */
    transition: width 0.5s ease;
  }
}

.non_log {
  text-align: center;
  font-size: 1.7rem;
  font-weight: 600;
}
</style>

