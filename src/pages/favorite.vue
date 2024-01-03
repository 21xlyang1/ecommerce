<template>
  <div
    class="w-100 bg"
    style="user-select: none"
    :style="{ height: outerDivHeight + 'px' }"
  >
    <div class="container-xl h-100" style="padding: 50px">
      <div class="rounded-3 w-100 h-100 card overflow-hidden">
        <div
          class="w-100 d-flex"
          style="height: 69px; background: rgba(255, 255, 255, 0.4)"
        >
          <div
            class="h-100 d-flex justify-content-between align-items-center"
            style="border-right: solid 1px #99a2aa; width: 20%"
          >
            <div class="ms-4" style="font-size: 20px">个人收藏夹</div>
            <div></div>
            <!-- 添加收藏夹按钮 -->
            <iconbutton
              class="me-4"
              :iconSize="'30px'"
              :icon="'add'"
              :size="'30px'"
              :color="'green'"
              @click="addInf.show = true"
            ></iconbutton>
          </div>
          <div class="h-100 d-flex align-items-center p-4" style="width: 80%">
            <div style="font-size: 22px; font-weight: 700">
              {{ collectList[nowIndex].name }}
            </div>
          </div>
        </div>
        <div class="w-100 d-flex">
          <!-- 收藏夹 -->
          <el-scrollbar
            :style="{ height: outerDivHeight - 170 + 'px' }"
            style="border-right: solid 1px #99a2aa; width: 20%"
          >
            <div
              v-for="(item, index) in collectList"
              :key="index"
              class="w-100 d-flex"
              :class="nowIndex == index ? 'nowstyle' : ''"
              style="height: 60px; cursor: pointer"
              :style="
                nowIndex != index && overIndex == index
                  ? 'background: rgba(0,0,0,0.1)'
                  : ''
              "
              @mouseover="overIndex = index"
              @mouseleave="overIndex = -1"
            >
              <div
                class="h-100 d-flex justify-content-center align-items-center"
                style="width: 25%"
                @click="nowIndex = index"
              >
                <v-icon
                  name="shoucangjia"
                  :style="{ color: overIndex == index ? 'bule' : '' }"
                  style="font-size: 30px"
                ></v-icon>
              </div>
              <div
                class="h-100 d-flex align-items-center"
                @click="nowIndex = index"
                style="width: 60%"
              >
                <div>
                  {{ item.name }}
                </div>
              </div>
              <div
                class="d-flex align-items-center justify-content-center"
                :style="overIndex == index ? 'background:rgba(0,0,0,0.05)' : ''"
                style="width: 15%; position: relative; overflow: visible"
                @mouseover="updateIndex = index"
                @mouseleave="updateIndex = -1"
              >
                <div v-show="overIndex != index">{{ item.num }}</div>
                <v-icon
                  class="showdong"
                  v-show="overIndex == index"
                  style="font-size: 24px"
                  name="list"
                ></v-icon>
                <div
                  v-show="updateIndex == index && overIndex == index"
                  class="list showdong"
                  style="width: 100%; height: 100px"
                >
                  <div
                    class="rounded-1"
                    style="
                      width: 100%;
                      height: 70px;
                      z-index: 10000;
                      background: rgba(255, 255, 255, 0.8);
                    "
                  >
                    <div
                      style="height: 35px"
                      class="w-100 d-flex justify-content-center align-items-center"
                    >
                      <iconbutton
                        :iconSize="'24px'"
                        :icon="'updata'"
                        :size="'28px'"
                        :color="'green'"
                        :showBorder="false"
                        @click="updateInf.show = true"
                      ></iconbutton>
                    </div>
                    <div
                      style="height: 35px"
                      class="w-100 d-flex justify-content-center align-items-center"
                    >
                      <iconbutton
                        :iconSize="'24px'"
                        :icon="'delate'"
                        :size="'28px'"
                        :color="'red'"
                        :showBorder="false"
                      ></iconbutton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
          <!-- 收藏商品 -->
          <el-scrollbar
            :style="{ height: outerDivHeight - 170 + 'px' }"
            style="width: 80%"
          >
            <div class="w-100 mt-3" v-show="isLoading">
              <loading :size="60"></loading>
            </div>
            <div v-show="!isLoading" style="width: 100%; padding: 10px">
              <productItem
                v-for="item in productList"
                :key="item.productId"
                :proId="item.productId"
              ></productItem>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <!-- 添加对话框 -->
    <el-dialog title="添加收藏夹" width="500px" :visible.sync="addInf.show">
      <div class="d-flex w-100 align-items-center p-4">
        <div style="width: 100px">收藏夹名称</div>
        <el-input placeholder="请输入内容" v-model="addInf.name" clearable>
        </el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog
      title="修改收藏夹信息"
      width="500px"
      :visible.sync="updateInf.show"
    >
      <div class="d-flex w-100 align-items-center p-4">
        <div style="width: 100px">收藏夹名称</div>
        <el-input placeholder="请输入内容" v-model="updateInf.name" clearable>
        </el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import iconbutton from "@/components/iconbutton.vue";
import { post } from "@/utils/http";
import productItem from "@/components/productItem.vue";

import loading from "@/components/loading.vue";
export default {
  name: "",
  components: { iconbutton, productItem, loading },
  data() {
    return {
      isLoading: true,
      outerDivHeight: "", // 最外层div的高度
      collectList: [
        { id: 1, name: "电子产品", num: 2 },
        { id: 2, name: "服装用品", num: 11 },
        { id: 3, name: "智能手表", num: 4 },
        { id: 4, name: "休闲食品", num: 6 },
      ],
      addInf: { name: "", show: false },
      updateInf: { name: "", show: false },
      overIndex: -1,
      nowIndex: 0,
      dialogShow: false,
      updateIndex: -1,
      padding: 50,
      productList:[]
    };
  },
  methods: {
    setOuterDivSize() {
      this.outerDivHeight = window.innerHeight - 70;
    },
    getProList() {
      this.isLoading = true;
      post("/favorites/getProduct", { favoritesId:this.collectList[this.nowIndex].id  }).then(
        (Response) => {
          console.log("请求成功", Response);
          //Response是返回的参数
          var data = Response.data;
          this.productList = data;
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
    post("/favorites/getList", { userId: Number(this.$cookies.get("userId")) }).then(
        (Response) => {
          console.log("请求成功", Response);
          //Response是返回的参数
          var data = Response.data;
          this.collectList = data;
          this.getProList()
        },
        (error) => {
          console.log("请求失败", error.message);
        }
      );



    this.getProList();
  },
  beforeDestroy() {
    // 组件销毁时，移除窗口大小改变事件的监听
    window.removeEventListener("resize", this.setOuterDivSize);
  },
  watch: {
    nowIndex(form, to) {
      this.getProList();
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../public/img/log/7.png");
  background-attachment: fixed;
  background-size: cover;
  // position: relative;
  // border-bottom: solid 1px #000000;
}
// .hui {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   background: rgba($color: #000000, $alpha: 0.3);
// }

.list {
  position: absolute;
  top: 44px;
  left: 0px;
  z-index: 1000;
}

.showdong {
  animation: pop-btn 0.3s;
}
@keyframes pop-btn {
  0% {
    transform: scale(0);
    opacity: 0;
    /* 动画开始时缩放为0 */
  }
  80% {
    transform: scale(1.1);
    opacity: 0.8;
    /* 动画进行到80%时缩放为1.2 */
  }
  100% {
    transform: scale(1);
    opacity: 1;
    /* 动画结束时缩放为1 */
  }
}
.card {
  background: rgba($color: #ffffff, $alpha: 0.6);
  backdrop-filter: blur(6px);
}
.nowstyle {
  color: #ffffff;
  background: #00a1d6;
}
.collectitem {
  // background: #fff;
  cursor: pointer;
}
.collectitem:hover {
  background: rgba($color: #000000, $alpha: 0.1);
}
</style>

