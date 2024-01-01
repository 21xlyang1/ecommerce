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
          <el-form-item>
            <el-date-picker v-model="form.valueDay" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-time-picker v-model="form.valueTime" :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }" :editable=false placeholder="选择时间">
            </el-time-picker>
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
import { post } from "@/utils/http";

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
        valueDay: '',
        valueTime: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dataList: [
        {
          Id: 1,
          submitName: "测试人员",
          time_data: "2023/12/22 11:12:59",
          title: "测试用",
          text: "文本文本文本",
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
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // console.log("this.form.valueTime" + this.form.valueTime);
          // console.log("this.form.valueDay" + this.form.valueDay);
          const year = this.form.valueDay.getFullYear();
          const month = this.form.valueDay.getMonth() + 1;
          const day = this.form.valueDay.getDate();
          const hours = this.form.valueTime.getHours();
          const minutes = this.form.valueTime.getMinutes();
          const seconds = this.form.valueTime.getSeconds();
          // console.log(year + " " + month + " " + day + " " + hours + " " + minutes + " " + seconds);
          const formattedDateTime = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          const title = this.form.title;
          const content = this.form.text;
          let userId = '';
          let Id = this.dataList[0].Id + 1;
          const cookies = document.cookie.split(';');
          for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName == 'userId') {
              userId = cookieValue
              break;
            }
            else userId = null
          }

          // console.log(newEntry);
          // console.log(this.form.time_data);
          // console.log(this.form);

          this.dialogVisible = false;

          // 重置表单
          this.onReset();

          post("/log/addLog", { userId, title, content }).then(
            (Response) => {
              // 创建新的对象，使用表单数据填充
              const newEntry = {
                Id: Id,
                time_data: formattedDateTime,
                title: title, // 使用表单中的名称作为标题
                text: content, // 使用表单中的描述作为文本内容，根据实际需求调整
                submitName: userId,
              };
              // 将新的对象添加到 dataList 数组中
              this.dataList.push(newEntry);
              this.form.valueDay = this.form.valueTime = ''
              // 按照时间排序
              this.sortDataList();
              console.log("请求成功", Response);
              var D = Response
            },
            (error) => {
              console.log("userId:", userId, "title:", title, "content:", content);
              console.log("请求失败", error.message);
            }
          );
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
        desc: '',
        valueDay: '',
        valueTime: '',
      };
    },
    updateLog( newData ) {
      let identifier = newData.Id
      console.log(identifier);
      console.log(newData);
      let logId = identifier;
      let title = newData.title;
      let content = newData.text;
      post("/log/editLog", { logId, title, content }).then(
        (Response) => {
          this.dataList[identifier].time_data = newData.time_data;
          this.dataList[identifier].title = title;
          this.dataList[identifier].text = content;
          // 按照时间排序
          this.sortDataList();
          console.log("请求成功", Response);
        },
        (error) => {
          console.log("logId:", logId, "title:", title, "content:", content);
          console.log("请求失败", error.message);
        }
      );
    },
    deleteLog(identifier) {
      let logId = identifier;
      post("/log/delLog", { logId }).then(
        (Response) => {
          console.log("请求成功", Response);
          // Delete
          this.dataList.splice(identifier, 1);
        },
        (error) => {
          console.log("logId:", logId);
          console.log("请求失败", error.message);
        }
      );
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
  mounted() {
    post("/log/getInf").then(
      (Response) => {
        console.log("请求成功", Response);
        this.dataList = Response;
        // 按照时间排序
        this.sortDataList();
      },
      (error) => {
        console.log("请求失败", error.message);
      });
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
  box-shadow: -1px 7px 35px rgba(154, 161, 171, .15);

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

