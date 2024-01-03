<template>
  <div
    :style="{
      'background-image': `url(${require('../../public/img/bg/2.png')})`,
    }"
  >
    <div class="container-xl d-flex justify-content-center">
      <el-scrollbar
        style=" background: rgba(255, 255, 255, 0.7)"
      
        :style="{ height: outerDivHeight + 'px' ,width:outerDivWidth>800?'200px':'140px'}"
      >
        <div
          class="w-100 d-flex justify-content-center align-items-center"
          style="height: 60px"
        >
          <div style="color: #333; font-weight: 700">订单中心</div>
        </div>
        <div
          v-for="item in itemList"
          class="w-100 d-flex align-items-center item"
          :key="item.ID"
          style="height: 40px;cursor: pointer;"
          :style="itemChosed==item.name?'color:#1889f1;':''"
          @click="itemChosed=item.name"
        >
          <div class="ms-4" style="font-weight: 1000 ;font-size:24px" >·</div>
          <div class="ms-3" style="font-weight: 700 ;">{{item.name}}</div>
        </div>
      </el-scrollbar>
      <div
        style="
          flex-grow: 1;
          padding: 10px;
          background: rgba(255, 255, 255, 0.6);
        "
        :style="{ height: outerDivHeight + 'px' }"
      >
        <div
          class="w-100 bg-body rounded-2 d-flex align-items-center ps-4"
          style="height: 40px; margin-bottom: 10px;font-weight: 700 ;font-size:18px;color:#666666"
        >
          {{itemChosed+'订单'}}
        </div>

        <el-scrollbar
          class="w-100  rounded-2"

          :style="{ height: outerDivHeight - 70 + 'px' }"
        >
          <div class="w-100" style="padding:10px">
            <div v-show="isLoading">
              <loading :size="60"></loading>
            </div>
            <div v-show="!isLoading" style="width: 100%; padding: 10px;">
              <productItem v-for="item in orderList" :key="item" :proId="item.productId" ></productItem>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import productItem from '@/components/productItem.vue';

import loading from '@/components/loading.vue';
import { post } from '@/utils/http';
export default {
  name: "",
  components: { productItem,loading },
  data() {
    return {
      outerDivHeight: "", // 最外层div的高度
      outerDivWidth:"",
      isLoading:true,
      orderList:[
        {productId:1},
        {productId:2},
        {productId:3},
        {productId:4},
        {productId:5},
        {productId:6},
        {productId:7},
        {productId:8},
        {productId:9},
      ],
      itemList: [
        { ID: 1, name: "全部" },
        { ID: 2, name: "待付款" },
        { ID: 3, name: "待收货" },
        { ID: 4, name: "已完成" },
        { ID: 5, name: "已取消" },
      ],
      itemChosed:"全部",
    };
  },
  methods: {
    setOuterDivSize() {
      this.outerDivHeight = window.innerHeight - 70;
      this.outerDivWidth = window.innerWidth;
    },
    getOrdList() {
      this.isLoading = true;
      post("/order/useGetList", { userId: this.$cookies.get("userId") }).then(
        (Response) => {
          console.log("请求成功", Response);
          //Response是返回的参数
          var data = Response.data;
          this.orderList = data;
          this.isLoading = false;
        },
        (error) => {
          console.log("请求失败", error.message);
        }
      );
      setTimeout(() => {
         this.isLoading = false;
      }, 1000); 
    },
  },
  mounted() {
    this.setOuterDivSize(); // 初始化时设置最外层div的尺寸
    window.addEventListener("resize", this.setOuterDivSize);

    this.getOrdList()
  },
  beforeDestroy() {
    // 组件销毁时，移除窗口大小改变事件的监听
    window.removeEventListener("resize", this.setOuterDivSize);
  },
  watch:{
    itemChosed(){
      this.getOrdList()
    }
  }
};
</script>

<style lang="scss" scoped>
.item{
  color:#666666;
}
.item:hover{
  background: rgba($color: #000000, $alpha: 0.1);
  color:#000000;
  // color:#1889f1;
}
</style>

