<template>
  <div>
    <div class="shell" :style="{width:boxWidth+'px'}">
      <input type="text" v-model="searchData" placeholder="Search" />
      <a :href="'#/ss/search?data='+searchData">
        <i class="fa fa-hand-o-right"></i>
        <i class="fa fa-search"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data(){
    return{
      searchData:"",
      maxWidth: window.innerWidth, // 最外层div的宽度
      boxWidth:400
    }
  },
  methods: {
    setOuterDivSize() {
      this.maxWidth = window.innerWidth;
      if(this.maxWidth>1700){
        this.boxWidth=600
      }else if(this.maxWidth>1500){
        this.boxWidth=500
      }else if(this.maxWidth>600){
        this.boxWidth=400
      }else{
        this.boxWidth=290
      }
    },
  },
  mounted() {
    this.setOuterDivSize(); // 初始化时设置最外层div的尺寸
    window.addEventListener("resize", this.setOuterDivSize);
  },
  beforeDestroy() {
    // 组件销毁时，移除窗口大小改变事件的监听
    window.removeEventListener("resize", this.setOuterDivSize);
  },
};
</script>

<style lang="scss" scoped>
* {
  outline: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffdcdc;
}

.shell {
  margin: 10px;
  position: relative;
  transition: 0.4s;
  padding: 6px 20px;
  background-color: #ff8989;
  border-radius: 4px;
  box-shadow: 0 2px 5px #ff8989, 0 10 0 10px #fff;
}

.shell input {
  width: 80%;
  height: 40px;
  color: #ffffff;
  font: 300 20px "优设标题黑";
  border: 0;
  background-color: transparent;
}

.shell input::placeholder {
  color: #ffffff;
}

.shell a {
  display: flex;
  font-size: 40px;
  position: absolute;
  right: 0px;
  top: 0px;
  color: #fff;
  width: 40px;
  height: 40px;
}

.shell a .fa {
  margin: 5px 10px;
  transition: 0.3s;
}

.shell a .fa-search {
  transform: translateX(-80px);
  opacity: 1;
}

.shell a .fa-hand-o-right {
  transform: translateX(-20px);
  opacity: 0;
}

.shell a:hover .fa-search {
  transform: translateX(0px);
  opacity: 0;
}

.shell a:hover .fa-hand-o-right {
  transform: translateX(-15px);
  opacity: 1;
}

.shell a::before {
  content: "GO";
  position: absolute;
  display: block;
  font-size: 12px;
  background-color: #ff8989;
  padding: 0px 3px;
  top: -25px;
  right: -25px;
  border-radius: 5px;
  transition: 0.3s;
  opacity: 0;
  animation: box 1s infinite ease;
}

.shell a:hover::before {
  top: 12px;
  opacity: 1;
}

@keyframes box {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(8deg);
  }
  66% {
    transform: rotate(-8deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>

