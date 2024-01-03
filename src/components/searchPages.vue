<template>
    <div class="search-container">
        <div class="category-buttons">
            <button :class="{ active: activeCategory === '商品' }" @click="changeCategory('商品')">商品</button>
            <button :class="{ active: activeCategory === '店铺' }" @click="changeCategory('店铺')">店铺</button>
            <button :class="{ active: activeCategory === '用户' }" @click="changeCategory('用户')">用户</button>
        </div>
        <div class="search-input-container">
            <div class="search-wrapper">
                <input type="text" v-model="searchQuery" placeholder="请输入搜索关键字" class="search-input">
                <button @click="startSearch" class="search-button">
                    <img src="../assets/img/search-icon.png" alt="搜索" class="search-icon">
                    <span class="sr-only">搜索</span>
                </button>
            </div>
        </div>
        <div class="sort-buttons">
            <button :class="{ active: activeSort === '综合排序' }" @click="changeSort('综合排序')">综合排序</button>
            <button :class="{ active: activeSort === '高销量优先' }" @click="changeSort('高销量优先')">高销量优先</button>
            <button :class="{ active: activeSort === '新发布优先' }" @click="changeSort('新发布优先')">新发布优先</button>
            <button :class="{ active: activeSort === '价格区间' }" @click="changeSort('价格区间')">价格区间</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '', // 搜索关键字
            activeCategory: '商品', // 当前选中的分类
            activeSort: '综合排序', // 当前选中的排序方式
        };
    },
    methods: {
        changeCategory(category) {
            // 切换分类
            this.activeCategory = category;
        },
        changeSort(sort) {
            // 切换排序方式
            this.activeSort = sort;
        },
        startSearch() {
            // 发起搜索请求，与后端进行通信
            console.log('开始搜索:', this.searchQuery);
            // 清空搜索框
            this.searchQuery = '';
            // 隐藏模糊搜索的提示
            this.showSuggestions = false;

            // 使用异步请求库发送请求
            axios.post('/api/search', {
                query: this.searchQuery,
                category: this.activeCategory,
                sort: this.activeSort,
            })
                .then(response => {
                    // 处理请求成功的响应
                    console.log('搜索结果:', response.data);
                })
                .catch(error => {
                    // 处理请求失败的错误
                    console.error('搜索请求失败:', error);
                });
        },
    },
};
</script>
  
<style>
.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.category-buttons button,
.sort-buttons button {
    background-color: #fff;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    cursor: pointer;
}

.category-buttons button.active,
.sort-buttons button.active {
    background-color: #f2f2f2;
}

.search-input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

.search-wrapper {
    position: relative;
    /* 添加这行代码 */
    display: flex;
    align-items: center;
}

.search-input {
    padding: 20px;
    /* 调整内边距以增大搜索框 */
    border: 1px solid #ccc;
    border-radius: 60px;
    /* 圆角边框半径，根据需要进行调整 */
    flex: 1;
    font-size: 14px;
    width: 800px;
    /* 可以通过指定宽度来调整搜索框的大小 */
}

.search-button {
    background-color: #fff;
    border: none;
    padding: 10px;
    margin-left: -40px;
    /* 负边距调整按钮位置 */
    z-index: 1;
    /* 确保按钮位于输入框上层 */
    position: relative;
    right: 5px;
    cursor: pointer;
}

.search-icon {
    width: 16px;
    height: 16px;
}

.sort-buttons {
    /* 调整排序按钮的位置 */
    display: flex;
    justify-content: space-between;
    /* 可以考虑使用 flex 布局对按钮进行定位 */
    width: 100%;
    /* 适应父容器宽度 */
    max-width: 800px;
    /* 或者根据需要设置最大宽度 */
    margin-top: 10px;
}

.sort-buttons button {
    background-color: #fff;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    cursor: pointer;
}

.sort-buttons button.active {
    background-color: #f2f2f2;
}

.search-button span.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -20px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}</style>
