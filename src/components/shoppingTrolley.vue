<template>
  <div style="background-color: azure;">
    <!-- 头部 -->
    <div class="w-100 d-flex justify-content-between align-items-center" style="height: 50px; padding-left: 20px;">
      <Iconbutton size="34px" iconSize="30px" icon="updata" color="blue" :showBorder="false"></Iconbutton>
      <div style="font-size: 26px;">购物车</div>
      <div></div>
    </div>
    <!-- 商品列表 -->
    <el-scrollbar class="w-100" :style="{ height: overHeight }">
      <div class="p-2" style="width: 100%;">
        <!-- 遍历店铺 -->
        <div v-for="(shop, shopIndex) in cartItems" :key="shopIndex">
          <div class="w-100 bg-body rounded-2 p-2" style="margin-bottom: 10px;">
            <div class="w-100 d-flex">
              <el-checkbox style="padding-left: 10px;" :checked="shopSelections[shop.shopname]"
                @change="toggleShopSelection(shop.shopname)">{{ shop.shopname }}</el-checkbox>
            </div>
            <!-- 商品列表 -->
            <div v-for="(item, itemIndex) in shop.cartItems" :key="itemIndex" class="d-flex justify-content-between"
              style="height: 120px; width: 100%;">
              <div class="d-flex">
                <div class="h-100 d-flex align-items-center"><el-checkbox style="padding-left: 10px;"
                    v-model="item.selected"></el-checkbox></div>
                <img class="rounded-2" style="height: 110px; width: 110px; margin: 5px; margin-left: 10px;"
                  :src="require(`@/assets/img/${item.image}`)" alt="">
                <div class="h-100 p-2" style="flex-grow: 1;">
                  <div class="h-50 d-flex" style="width: 100px;">{{ item.name }}</div>
                  <div class="h-50 d-flex align-items-end" style="width: 100px;">￥{{ item.totalPrice.toFixed(2) }}</div>
                </div>
              </div>
              <div class="d-flex align-items-end" style="height: 100%;">
                <div class="d-flex" style="width: 70px; height: 24px; margin-bottom: 10px;">
                  <button style="border: solid 1px rgba(200, 200, 200); border-radius: 5px 0px 0px 5px; padding: 0px 5px;"
                    @click="updateQuantity(shopIndex, itemIndex, -1)">-</button>
                  <div
                    style="border-top: solid 1px rgba(200, 200, 200); border-bottom: solid 1px rgba(200, 200, 200); padding: 0px 5px;">
                    {{ item.quantity }}</div>
                  <button style="border: solid 1px rgba(200, 200, 200); border-radius: 0px 5px 5px 0px; padding: 0px 5px;"
                    @click="updateQuantity(shopIndex, itemIndex, 1)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <!-- 尾部 -->
    <div class="w-100 d-flex justify-content-between align-items-center" style="height: 50px;">
      <el-checkbox style="padding-left: 20px;" @change="toggleSelectAll">全选</el-checkbox>
      <div></div>
      <div class="d-flex align-items-center" style="">
        <div>合计:￥{{ calculateTotalPrice() }}</div>
        <button class="bg-danger"
          style="border: none; border-radius: 15px; width: 80px; height: 30px; color: #fff; margin: 0px 10px;"
          @click="submitOrder">去结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import Iconbutton from './iconbutton.vue';
import { post } from '@/utils/http';
export default {


  name: "ShoppingCart",
  data() {
    return {
      // 初始购物车商品数据
      cartItems: [
        {
          shopname: "商铺1",
          cartItems: [
            {
              name: "商品1",
              description: "商品1的描述",
              price: 100,
              quantity: 2,
              image: "wallhaven-5dgw35.jpg",
              totalPrice: 0,
              selected: false,
            },
            {
              name: "商品2",
              description: "商品2的描述",
              price: 50,
              quantity: 1,
              image: "1.png",
              totalPrice: 0,
              selected: false,
            },
            // 根据需要添加更多商品
          ],
        },
        {
          shopname: "商铺2",
          cartItems: [
            // 商铺2的购物车商品列表
            {
              name: "商品3",
              description: "商品3的描述",
              price: 200,
              quantity: 2,
              image: "wallhaven-5dgw35.jpg",
              totalPrice: 0,
              selected: false,
            },
            {
              name: "商品4",
              description: "商品4的描述",
              price: 100,
              quantity: 1,
              image: "1.png",
              totalPrice: 0,
              selected: false,
            },
          ],
        },
        // 根据需要添加更多商铺
      ],
      overHeight: "",
      shopSelections: {}, // 用于追踪店铺选择框的状态
      selectAll: false, // 新增 selectAll 变量
    }
  },

  methods: {
    // 提交订单方法
    submitOrder() {
      console.log("订单已提交");
    },
    // 更新购物车中商品数量的方法
    updateQuantity(shopIndex, itemIndex, change) {
      const updatedQuantity = this.cartItems[shopIndex].cartItems[itemIndex].quantity + change;
      // 此处写一个接口定义发送后端数据
      if (updatedQuantity > 0) {
        this.cartItems[shopIndex].cartItems[itemIndex].quantity = updatedQuantity;
        // 更新单个商品价格
        this.cartItems[shopIndex].cartItems[itemIndex].totalPrice = this.calculateItemPrice(this.cartItems[shopIndex].cartItems[itemIndex]);
      } else {
        // 当数量为0时从购物车中移除商品
        this.cartItems[shopIndex].cartItems.splice(itemIndex, 1);
      }
    },
    // 计算单个商品价格的方法
    calculateItemPrice(item) {
      const totalPrice = item.price * item.quantity;
      item.totalPrice = totalPrice; // 设置totalPrice属性
      return totalPrice;
    },
    // 计算购物车中所有商品总价的方法
    calculateTotalPrice() {
      let total = 0;
      for (const shop of this.cartItems) {
        for (const item of shop.cartItems) {
          if (item.selected) {
            total += item.totalPrice;
          }
        }
      }
      return total.toFixed(2);
    },
    setOuterDivSize() {
      this.overHeight = window.innerHeight - 100 + "px";
    },
    // 初始化商品价格
    initializeItemPrices() {
      for (const shop of this.cartItems) {
        for (const item of shop.cartItems) {
          item.totalPrice = this.calculateItemPrice(item);
        }
      }
    },
    // 初始化店铺选择框状态
    initializeShopSelections() {
      for (const shop of this.cartItems) {
        this.$set(this.shopSelections, shop.shopname, false);
      }
    },
    // 切换店铺选择框状态
    toggleShopSelection(shopName) {
      console.log(shopName);
      console.log(this.shopSelections[shopName]);
      this.$set(this.shopSelections, shopName, !this.shopSelections[shopName]);
      console.log(this.shopSelections[shopName]);
      // 更新该店铺下所有商品的选择框状态
      const shop = this.cartItems.find(shop => shop.shopname === shopName);
      for (const item of shop.cartItems) {
        this.$set(item, 'selected', this.shopSelections[shopName]);
      }

      // 检查是否所有店铺都被选中，更新全选按钮状态
      this.selectAll = this.isAllShopsSelected();
    },



    // 切换全选状态
    toggleSelectAll() {
      // 更新所有店铺和商品的选择框状态
      for (const shop of this.cartItems) {
        this.toggleShopSelection(shop.shopname);
      }
    },

    // 检查是否所有店铺都被选中
    isAllShopsSelected() {
      for (const shop of this.cartItems) {
        if (!this.shopSelections[shop.shopname]) {
          return false;
        }
      }
      return true;
    },
  },
  mounted() {
    this.setOuterDivSize(); // 初始化时设置最外层div的尺寸
    window.addEventListener("resize", this.setOuterDivSize);

    // 初始化商品价格
    this.initializeItemPrices();
    // 初始化店铺选择框状态
    this.initializeShopSelections();
    post("/product/getCartList", { userId: this.$cookies.get("userId") }).then(
      (Response) => {
        console.log("请求成功", Response);
        //Response是返回的参数
        var data = Response.data;
        var sortData = data.slice().sort((a, b) => {
          // 根据name属性进行升序排序
          return a.storeId.localeCompare(b.storeId);
        });
        this.cartItems = []
        var lastId = undefined
        var t = {}
        for (var i = 0; i < data.length; i++) {
          if (sortData[i].storeId != lastId) {
            if (i != 0)
              this.cartItems.push(t)
            t = {
              shopname: sortData[i].storeName,
              cartItems: [],
            }
          }
          t.cartItems.push(sortData[i])

        }
      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );

  },
  beforeDestroy() {
    // 组件销毁时，移除窗口大小改变事件的监听
    window.removeEventListener("resize", this.setOuterDivSize);
  },
  components: { Iconbutton },
};
</script>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
}

.cart-item img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
</style>
