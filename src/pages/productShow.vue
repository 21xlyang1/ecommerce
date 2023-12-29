<template>
  <div style="background: #f1f1f1">
    <div class="container-xl d-flex justify-content-center">
      <div class="p-3" style="width: 90%">
        <div class="w-100 bg-body rounded-4">
          <!-- 商品信息 -->
          <div class="w-100 d-flex">
            <div class="" style="width: 400px">
              <!-- 图片 -->
              <div class="w-100" style="padding: 20px">
                <img
                  class="rounded-4"
                  src="../assets/img/1.png"
                  alt=""
                  style="height: 360px; width: 360px"
                />
                <div class="w-100 d-flex mt-3">
                  <img
                    class="rounded-2"
                    v-for="index in imgNum"
                    :key="index"
                    src="../assets/img/1.png"
                    :style="{
                      height: calculateImgSize(),
                      width: calculateImgSize(),
                      'margin-left':
                        index == 1 ? '0px' : 40 / (imgNum - 1) + 'px',
                    }"
                  />
                </div>
              </div>
              <!-- 店铺信息 -->
              <div
                class="d-flex mt-4"
                style="
                  height: 80px;
                  width: 330px;
                  margin-left: 20px;
                  padding: 10px 10px;
                  border-radius: 40px;
                  background: #eee;
                "
              >
                <!-- 店铺头像 -->
                <img
                  src="../assets/img/1.png"
                  alt=""
                  style="height: 60px; width: 60px; border-radius: 50%"
                />
                <div>
                  <div
                    class="d-flex align-items-end"
                    style="height: 24px; padding: 0px 10px"
                  >
                    <div style="font-size: 20px">{{ shopInf.name }}</div>
                    <div class="ms-2" style="font-size: 14px; color: #777">
                      {{ "粉丝" + shopInf.fenNum }}
                    </div>
                  </div>
                  <div class="d-flex" style="padding: 0px 10px">
                    <el-button size="medium" style="padding: 5px 15px" round>
                      <div class="d-flex align-items-center">
                        <v-icon name="kefu" style="font-size: 24px"></v-icon>
                        <div style="font-size: 16px">联系客服</div>
                      </div>
                    </el-button>

                    <el-button size="medium" style="padding: 5px 15px" round>
                      <div class="d-flex align-items-center">
                        <v-icon name="dingyue" style="font-size: 24px"></v-icon>
                        <div style="font-size: 16px">订阅</div>
                      </div>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 具体信息 -->
            <div style="flex-grow: 1; padding: 20px 20px 20px 0px">
              <div
                class="d-flex justify-content-between"
                style="font-size: 30px"
              >
                <div>{{ productInf.name }}</div>
                <div></div>
                <v-icon name="shoucang" style="font-size: 30px"></v-icon>
              </div>
              <div class="d-flex" style="color: #888">
                本月已售{{ productInf.xiaoliang }}
              </div>
              <div class="mt-3 mb-3 d-flex">
                <div
                  v-for="(item, index) in productInf.labelList"
                  :key="index"
                  class="rounded-2 bg-danger"
                  style="
                    padding: 0px 10px;
                    color: #fff;
                    font-size: 14px;
                    margin-right: 10px;
                  "
                >
                  {{ item }}
                </div>
              </div>
              <!-- 配送 -->
              <div class="d-flex align-items-center">
                <div
                  class="text-secondary me-3"
                  style="font-size: 20px; min-width: 60px"
                >
                  配送：
                </div>
                <div class="d-flex ms-2" style="font-size: 20px">
                  <div>{{ productInf.fahuodi }}</div>
                  <div class="ms-2 me-2">至</div>
                  <div>用户地址</div>
                </div>
              </div>
              <!-- 款式 -->
              <div class="d-flex align-items-center mb-4 mt-4">
                <div
                  class="text-secondary me-3"
                  style="font-size: 20px; min-width: 60px"
                >
                  款式：
                </div>
                <div class="d-flex flex-wrap">
                  <div
                    v-for="index in 3"
                    :key="index"
                    class="m-2 d-flex align-items-center rounded-2"
                    style="height: 74px; padding: 7px; background-color: #eee"
                  >
                    <img
                      class="rounded-2"
                      src="../assets/img/1.png"
                      alt=""
                      style="height: 60px; width: 60px"
                    />
                    <div class="ms-2 text-secondary" style="font-size: 22px">
                      套装一
                    </div>
                  </div>
                </div>
              </div>
              <!-- 数量 -->
              <div class="d-flex align-items-center mt-4">
                <div
                  class="text-secondary me-3"
                  style="font-size: 20px; min-width: 60px"
                >
                  数量：
                </div>
                <button
                  class="d-flex align-items-center justify-content-center btndong ms-2"
                  style="border-radius: 10px 0px 0px 10px"
                  @click="productInf.num -= productInf.num > 1 ? 1 : 0"
                >
                  <v-icon
                    style="font-size: 20px; color: #fff"
                    name="jianhao"
                  ></v-icon>
                </button>
                <div
                  class="d-flex align-items-center pe-3 ps-3"
                  style="height: 40px; background-color: #eee; font-size: 24px"
                >
                  {{ productInf.num }}
                </div>
                <button
                  class="d-flex align-items-center justify-content-center btndong"
                  style="border-radius: 0px 10px 10px 0px"
                  @click="productInf.num++"
                >
                  <v-icon
                    style="font-size: 20px; color: #fff"
                    name="add"
                  ></v-icon>
                </button>
              </div>
              <!-- 价格 -->
              <div class="d-flex align-items-center mt-4">
                <div
                  class="text-secondary me-3"
                  style="font-size: 20px; min-width: 60px"
                >
                  价格：
                </div>
                <div class="text-danger" style="font-size: 50px">
                  ￥{{ productInf.price }}
                </div>
              </div>
              <!-- 购买按钮 -->
              <div class="w-100 d-flex justify-content-end mt-5 pe-4">
                <button class="gwcbtn">加入购物车</button>
                <button class="gmbtn">立即购买</button>
              </div>
            </div>
          </div>
          <div class="w-100" style="margin-top: 40px">
            <!-- 选项 -->
            <div class="d-flex ms-4">
              <button
                class="itembtn"
                @click="choosed = '商品详情'"
                :style="{
                  background: choosed == '商品详情' ? '#1984ff' : '',
                  color: choosed == '商品详情' ? '#fff' : '',
                }"
              >
                商品详情
              </button>
              <button
                class="itembtn"
                @click="choosed = '评论'"
                :style="{
                  background: choosed == '评论' ? '#1984ff' : '',
                  color: choosed == '评论' ? '#fff' : '',
                }"
              >
                评论
              </button>
            </div>

            <div class="w-100 p-2">
              <el-divider class="m-0"></el-divider>
            </div>
            <!-- 商品详情页 -->
            <div v-show="choosed == '商品详情'" style="height: 500px"></div>
            <!-- 评论区 -->
            <div v-show="choosed == '评论'">
              <div class="d-flex ms-3">
                <button
                  @click="plflchoosed = item"
                  class="plbtn"
                  v-for="(item, index) in plflList"
                  :key="index"
                  :style="{
                    background: plflchoosed == item ? '#ff7575' : '#eee',
                    color: plflchoosed == item ? '#fff' : '',
                  }"
                >
                  {{ item }}
                </button>
              </div>
              <div class="d-flex w-100 p-4 pt-5">
                <!-- 头像 -->
                <div style="height: 100%; width: 60px">
                  <img
                    src="../assets/img/1.png"
                    style="
                      height: 56px;
                      width: 56px;
                      border-radius: 50%;
                      border: solid 3px #eee;
                    "
                  />
                </div>

                <div class="pe-3 ps-3 mt-1" style="flex-grow: 1">
                  <div class="d-flex align-items-center">
                    <!-- 昵称 -->
                    <div style="color: #fb7299">普普通通Tony大叔</div>
                    <!-- 标签 -->
                    <div
                      class="pe-1 ps-1 ms-2 rounded-1 d-flex align-items-center"
                      style="
                        color: #fff;
                        background: #ff6699;
                        font-size: 12px;
                        height: 16px;
                      "
                    >
                      买家
                    </div>
                  </div>
                  <div class="d-flex mt-1">
                    <v-icon
                      class="me-1"
                      :style="{ color: index <= 4 ? 'orange' : '#bbb' }"
                      v-for="index in 5"
                      :key="index"
                      name="xingxing"
                    ></v-icon>
                  </div>
                  <!-- 内容 -->
                  <div class="mt-1" style="font-size: 18px">
                    许多小伙伴在问这张M.2
                    4060Ti何时开售，预计是11月22号晚上上架各大电商平台，价格比普通版Dual
                    4060Ti贵100块
                  </div>
                  <div
                    class="d-flex align-items-center mt-2"
                    style="color: #888; font-size: 16px"
                  >
                    <!-- 时间 -->
                    <div class="d-flex">
                      <!-- 日期 -->
                      <div>{{ "2023-11-20" }}</div>
                      <!-- 时间 -->
                      <div class="ms-1">{{ "18:26" }}</div>
                    </div>
                    <!-- 点赞 -->
                    <div class="ms-4 d-flex align-items-center">
                      <button class="goodbtn">
                        <v-icon name="good"></v-icon>
                      </button>
                      <div class="ms-1">{{ 13 }}</div>
                    </div>
                    <!-- 回复按钮 -->
                    <button class="ms-4 chakanbtn">回复</button>
                  </div>
                  <!-- 回复区 -->
                  <div class="mt-2">
                    <div v-for="index in 3" :key="index" class="d-flex mt-3">
                      <div style="width: 50px">
                        <img
                          src="../assets/img/1.png"
                          style="
                            height: 44px;
                            width: 44px;
                            border-radius: 50%;
                            border: solid 2px #eee;
                          "
                        />
                      </div>
                      <div class="ps-2 pe-2" style="flex-grow: 1">
                        <div class="d-flex flex-wrap">
                          <!-- 昵称 -->
                          <div class="d-flex align-items-center pe-3">
                            <div style="color: #fb7299; font-size: 14px">
                              普普通通Tony大叔
                            </div>
                            <!-- 标签 -->
                            <div
                              class="pe-1 ps-1 ms-2 rounded-1 d-flex align-items-center"
                              style="
                                color: #fff;
                                background: #ff6699;
                                font-size: 11px;
                                height: 14px;
                              "
                            >
                              买家
                            </div>
                          </div>
                          <div v-for="index in content.length" :key="index">
                            {{ content[index - 1] }}
                          </div>
                        </div>
                        <div
                          class="d-flex align-items-center mt-1"
                          style="color: #888; font-size: 15px"
                        >
                          <!-- 时间 -->
                          <div class="d-flex">
                            <!-- 日期 -->
                            <div>{{ "2023-11-20" }}</div>
                            <!-- 时间 -->
                            <div class="ms-1">{{ "18:26" }}</div>
                          </div>
                          <!-- 点赞 -->
                          <div class="ms-4 d-flex align-items-center">
                            <button class="goodbtn">
                              <v-icon name="good"></v-icon>
                            </button>

                            <div class="ms-1">{{ 13 }}</div>
                          </div>
                          <!-- 回复按钮 -->
                          <button class="ms-4 chakanbtn">回复</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 回复统计 -->
                  <div class="mt-3 d-flex" style="color: #888; font-size: 16px">
                    <div>共有12条回复，</div>
                    <button class="chakanbtn">点击查看</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { post } from "@/utils/http";
export default {
  name: "",
  data() {
    return {
      imgNum: 6,
      productInf: {
        name: "商品名称"+this.$route.params.id,
        fahuodi: "发货地",
        xiaoliang: "80万+",
        num: 1,
        price: 114.51,
        labelList: ["包邮", "假一赔十"],
      },
      shopInf: {
        ID: 21,
        name: "店铺名称",
        fenNum: "1.4万+",
      },
      choosed: "评论",
      plflList: ["全部", "有图/视频", "差评"],
      plflchoosed: "全部",
      content:
        "许多小伙伴在问这张M.2 4060Ti何时开售，预计是11月22号晚上上架各大电商平台，价格比普通版Dual 4060Ti贵100块",
    };
  },
  methods: {
    calculateImgSize() {
      var total = 360;
      var res = (total - 40) / this.imgNum;
      return res + "px";
    },
  },
  mounted() {
  //""填入url地址，{}为请求参数
    post("/product/getProductInfo", {productId:this.$route.params.id}).then(
      (Response) => {
        console.log("请求成功", Response);
        //Response是返回的参数
        var data=Response
        this.productInf.name=data.productName
        this.productInf.price=data.price

      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );
  },

};
</script>

<style lang="scss" scoped>
.btndong {
  background: #1984ff;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border: none;
}
.btndong:hover {
  background: #006ae4;
}

.gwcbtn {
  height: 60px;
  border-radius: 30px 0px 0px 30px;
  border: none;
  padding: 0px 25px 0px 35px;
  font-size: 22px;
  color: #fff;
  background-color: #eda5a5;
}
.gwcbtn:hover {
  background-color: #e78b8b;
}
.gmbtn {
  height: 60px;
  border-radius: 0px 30px 30px 0px;
  border: none;
  padding: 0px 35px 0px 25px;
  font-size: 22px;
  color: #fff;
  background-color: #ff7575;
}
.gmbtn:hover {
  background-color: #f35757;
}
.itembtn {
  padding: 5px 10px;
  margin: 0px 5px;
  font-size: 22px;
  border-radius: 5px;
  border: none;
  background: none;
}
.itembtn:hover {
  background: #eee;
}

.plbtn {
  height: 34px;
  padding: 5px 20px;
  margin: 0px 5px;
  font-size: 18px;
  border-radius: 20px;
  border: none;
  background: none;
}
.chakanbtn {
  padding: 0px;
  margin: 0px;
  border: none;
  background: none;
  color: #888;
}
.chakanbtn:hover {
  color: #006bff;
}
.goodbtn {
  padding: 0px;
  margin: 0px;
  border: none;
  background: none;
  color: #888;
}
.goodbtn:hover {
  color: #f35757;
}
</style>

 