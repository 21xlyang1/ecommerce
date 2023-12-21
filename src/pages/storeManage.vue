<template>
  <div class="store-management-system">
    <h1>店铺管理系统</h1>
    
    <!-- 店铺信息管理区域 -->
    <section class="store-info">
      <h2>店铺信息管理</h2>
      <form>
        <input type="text" placeholder="店铺名称" />
        <input type="text" placeholder="地址" />
        <input type="text" placeholder="联系信息" />
        <input type="file" placeholde="上传店铺LOGO" accept="image/*" /> <!-- 上传店铺Logo -->
        <button type="submit">创建店铺</button>
      </form>
    </section>
    
    <!-- 店铺列表和详情 -->
    <div class="store-list">
      <!-- 示例店铺 -->
      <div class="store-example" >
        <h3>示例店铺1</h3>
        <!-- 点击此按钮展开/收回店铺设置和促销 -->
        <button class="toggle-button" @click="toggleDetails('store1')">*</button>

        <div class="store-details" v-show="activeStore === 'store1'">
          <!-- 店铺设置区域 -->
          <section class="store-settings">
            <h4>店铺设置</h4>
            <form @submit.prevent="updateSettings">
              <input type="text" v-model="settings.operatingHours" placeholder="经营时间" />
              <input type="text" v-model="settings.businessDays" placeholder="营业日期" />
              <!-- 定义服务范围或配送区域 -->
              <!-- 更多设置... -->
              <button type="submit">更新设置</button>
            </form>
          </section>
          <!-- 促销和折扣区域 -->
          <section class="promotions">
            <h4>促销和折扣</h4>
            <form @submit.prevent="createPromotion">
              <input type="text" v-model="promotion.name" placeholder="促销活动名称" />
              <input type="text" v-model="promotion.discount" placeholder="折扣优惠" />
              <input type="text" v-model="promotion.conditions" placeholder="促销条件" />
              <input type="date" v-model="promotion.expiry" placeholder="有效期" />
              <!-- 更多促销设置... -->
              <button type="submit">创建促销</button>
            </form>
          </section>
        </div>
      </div>

      <!-- 更多店铺... -->
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreManagementSystem",
  data() {
    return {
      activeStore: null, // 当前展开的店铺详情
      settings: {
        operatingHours: '',
        businessDays: '',
        // 其他设置...
      },
      promotion: {
        name: '',
        discount: '',
        conditions: '',
        expiry: '',
        // 其他促销信息...
      },
    };
  },
  methods: {
    toggleDetails(storeId) {
      this.activeStore = this.activeStore === storeId ? null : storeId;
    },
    updateSettings() {
      // 在这里添加更新店铺设置的逻辑...
    },
    createPromotion() {
      // 在这里添加创建促销活动的逻辑...
    },
  },
}
</script>

<style lang="scss" scoped>
.store-management-system {
  // 定义页面样式
  // 使用阴影、圆角等效果
  h1, h2 {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
  section {
    background: #f0f0f0;
    border-radius: 10px;
    box-shadow: 8px 8px 15px #a7a7a7,
                -8px -8px 15px #ffffff;
    padding: 20px;
    margin: 20px 0;
  }
  input, button {
    border: none;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: inset 2px 2px 5px #a7a7a7,
                inset -2px -2px 5px #ffffff;
  }
  // 预设其它风格的CSS...
}
.store-list .store-example {
  position: relative;
  display: flex;
  align-items: center;
}

.toggle-button {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #4CAF50; /* 可以调节的颜色 */
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s;
}

.store-title {
  margin-left: 10px;
}

.store-list .store-details {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.store-list .store-example .store-details {
  display: block;
  max-height: 500px; /* 调整为内容的最大高度 */
}

.store-example[aria-expanded="true"] .toggle-button {
  transform: rotate(180deg);
}
</style>
