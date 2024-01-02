<template>
  <div class="shell">
    <div class="container a-container" id="a-container">
      <form action="" method="" class="form" id="a-form">
        <h2 class="form_title title">创建账号</h2>

        <span class="form_span">选择注册方式活电子邮箱注册</span>
        <!-- 注册表单 -->
        <div v-for="(value, key) in registerInf" :key="key">
          <FloatingLabel :label="key" v-model="value.data"></FloatingLabel>
          <div
            class="d-flex ps-4 p-0"
            style="height: 26px; font-size: 14px; color: #ff7575"
          >
            {{ value.error }}
          </div>
        </div>
        <!-- 注册按钮 -->
        <button @click="register" class="form_button button submit">
          SIGN UP
        </button>
      </form>
    </div>
    <div class="container b-container" id="b-container">
      <form action="" method="" class="form" id="b-form">
        <h2 class="form_title title">登入账号</h2>
        <div class="form_icons">
          <i class="iconfont icon-QQ" style="background-color: red"></i>
          <i class="iconfont icon-weixin" style="background-color: green"></i>
          <i
            class="iconfont icon-bilibili"
            style="background-color: rgb(255, 81, 0)"
          ></i>
        </div>
        <span class="form_span">选择登录方式活电子邮箱登录</span>
        <!-- 登入表单 -->
        <div v-for="(value, key) in loginInf" :key="key">
          <FloatingLabel :label="key" v-model="value.data"></FloatingLabel>
          <div
            class="d-flex ps-4 p-0"
            style="height: 26px; font-size: 14px; color: #ff7575"
          >
            {{ value.error }}
          </div>
        </div>
        <!--自动登入 -->
        <div class="d-flex" style="width: 340px">
          <el-checkbox
            size="medium"
            style="color: #6b6b6b"
            class="mt-3"
            v-model="isSave"
            >自动登入</el-checkbox
          >
        </div>
        <!-- 忘记密码 -->
        <a class="form_link">忘记密码？</a>
        <!-- 登入按钮 -->
        <button
          @click="login"
          class="d-flex align-items-center ps-4  button submit"
        >
          <div class=" me-1" style="width: 40px; height: 40px ;">
            <loading v-show="logLoad" :size="40"></loading>
          </div>
          <div>SIGN IN</div>
        </button>
      </form>
    </div>
    <!-- 切换部分 -->
    <div class="switch" id="switch-cnt">
      <div class="switch_circle"></div>
      <div class="switch_circle switch_circle-t"></div>
      <div class="switch_container" id="switch-c1">
        <h2 class="switch_title title" style="letter-spacing: 0">
          Welcome Back！
        </h2>
        <p class="switch_description description">
          已经有账号了嘛，去登入账号来进入奇妙世界吧！！！
        </p>
        <button
          style="margin-top: 50px"
          class="switch_button button switch-btn"
          @click="changeForm"
        >
          SIGN IN
        </button>
      </div>

      <div class="switch_container is-hidden" id="switch-c2">
        <h2 class="switch_title title" style="letter-spacing: 0">
          Hello Friend！
        </h2>
        <p class="switch_description description">
          去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！
        </p>

        <button
          style="margin-top: 50px"
          class="switch_button button switch-btn"
          @click="changeForm"
        >
          SIGN UP
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import FloatingLabel from "./FloatingLabel.vue";
import loading from "./loading.vue";
export default {
  name: "",
  props: ["islog"],
  components: { FloatingLabel, loading },
  data() {
    return {
      registerInf: {
        username: { data: "", error: "" },
        password: { data: "", error: "" },
        repassword: { data: "", error: "" },
        email: { data: "", error: "" },
        // phoneNum:{data:"",error:""},
      },
      loginInf: {
        username: { data: "", error: "" },
        password: { data: "", error: "" },
      },
      isSave: false,
      logLoad: false,
      registerLoad: false,
    };
  },
  mounted() {
    if (this.islog) {
      this.changeForm();
    }
  },
  methods: {
    changeForm() {
      let switchCtn = document.querySelector("#switch-cnt");
      let switchC1 = document.querySelector("#switch-c1");
      let switchC2 = document.querySelector("#switch-c2");
      let switchCircle = document.querySelectorAll(".switch_circle");
      let aContainer = document.querySelector("#a-container");
      let bContainer = document.querySelector("#b-container");
      // 修改类名
      switchCtn.classList.add("is-gx");
      setTimeout(function () {
        switchCtn.classList.remove("is-gx");
      }, 1500);
      switchCtn.classList.toggle("is-txr");
      switchCircle[0].classList.toggle("is-txr");
      switchCircle[1].classList.toggle("is-txr");

      switchC1.classList.toggle("is-hidden");
      switchC2.classList.toggle("is-hidden");
      aContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-z");
    },
    login() {
      this.logLoad = true;
      var isSuccess=true;
      var username = this.loginInf.username;
      var password = this.loginInf.password;
      // 清空error信息
      username.error = "";
      password.error = "";
      // 前端表单验证
      if (username.data == "") {
        username.error = "请输入用户名";
        isSuccess=false
      }
      if (password.data == "") {
        password.error = "请输入密码";
        isSuccess=false
      }
      // 后端表单验证


      if(isSuccess){
      this.$cookies.set("isLog", true);
      this.$cookies.set("userId", 1);
      this.$store.commit("closeLogin");
      setTimeout(() => {
        this.logLoad = false;
      }, 3000);
      }else{
              setTimeout(() => {
        this.logLoad = false;
      }, 3000);
      }

    },
    register() {
      var username = this.registerInf.username;
      var password = this.registerInf.password;
      var repassword = this.registerInf.repassword;
      var email = this.registerInf.email;
      // 清空error信息
      username.error = "";
      password.error = "";
      repassword.error = "";
      email.error = "";
      // 表单验证
      if (username.data == "") {
        username.error = "用户名不得为空";
      } else if (username.data.length < 8) {
        username.error = "用户名的长度不得小于8位";
      } else if (username.data.length > 11) {
        username.error = "用户名的长度不得大于11位";
      }

      if (password.data == "") {
        password.error = "密码不得为空";
      } else if (password.data.length < 8) {
        password.error = "密码的长度不得小于8位";
      } else if (password.data.length > 11) {
        password.error = "密码的长度不得大于11位";
      }

      if (password.data != repassword.data) {
        repassword.error = "两次密码输入不一致";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email.data == "") {
        email.error = "邮箱不得为空";
      } else if (!emailRegex.test(email.data)) {
        email.error = "邮箱格式不正确";
      }
    },
  },
  watch: {
    // 监听 propValue 的变化
    islog(newValue, oldValue) {
      // 在这里可以执行一些操作，响应 islog 的变化
      this.changeForm();
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 字体无法选中 */
  user-select: none;
}

body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}

.shell {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;

  background-color: #e4e9ec;
  // box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}

/* 设置响应式 */
@media (max-width: 1500px) {
  .shell {
    transform: scale(0.9);
  }
}
@media (max-width: 1200px) {
  .shell {
    transform: scale(0.8);
  }
}
@media (max-width: 1100px) {
  .shell {
    transform: scale(0.7);
  }
}
@media (max-width: 1000px) {
  .shell {
    transform: scale(0.6);
  }
}

@media (max-width: 800px) {
  .shell {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .shell {
    transform: scale(0.4);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.iconfont {
  margin: 0 10px;
  // border: rgba(0, 0, 0, 0.5) 2px solid;
  color: #ffffff;
  border-radius: 50%;
  font-size: 25px;
  padding: 3px;
  opacity: 0.7;
  transition: 0.1s;
}

.iconfont:hover {
  opacity: 1;
  transition: 0.15s;
  cursor: pointer;
}

.form_input {
  width: 350px;
  height: 40px;
  margin: 0px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.form_input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form_span {
  margin-top: 30px;
  margin-bottom: 12px;
}

.form_link {
  color: #181818;
  font-size: 15px;
  margin-top: 25px;

  line-height: 2;
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
  letter-spacing: 10px;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  // margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}

.switch_circle-t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}

.switch_button {
  cursor: pointer;
}

.switch_button:hover,
.submit:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}

.is-txr {
  left: calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}

.is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}

.is-z {
  z-index: 200;
  transition: 1.25s;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.is-gx {
  animation: is-gx 1.25s;
}

@keyframes is-gx {
  0%,
  10%,
  100% {
    width: 400px;
  }

  30%,
  50% {
    width: 500px;
  }
}
</style>

