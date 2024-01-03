<template>
    <div class="search-container">
        <div class="category-buttons">
            <button :class="{ active: activeCategory === '商品' }" @click="changeCategory('商品')">商品</button>
            <button :class="{ active: activeCategory === '店铺' }" @click="changeCategory('店铺')">店铺</button>
            <button :class="{ active: activeCategory === '用户' }" @click="changeCategory('用户')">用户</button>
        </div>
        <div class="search-input-container">
            <div class="search-wrapper">
                <input type="text" v-model="searchQuery" :placeholder="placeholder" class="search-input">
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
    props: {
        placeholder: {
            type: String,
            default: '请输入关键字进行搜索...'
        }
    },
    data() {
        return {
            searchQuery: '',        // 搜索关键字
            activeCategory: '商品', // 当前选中的分类
            activeSort: '综合排序', // 当前选中的排序方式
        };
    },
    methods: {
        changeCategory(category) {
            console.log("当前的类型是", category);
            // 切换分类
            this.activeCategory = category;
        },
        changeSort(sort) {
            console.log("当前的类型是", sort);
            // 切换排序方式
            this.activeSort = sort;
        },
        startSearch() {
            this.$emit("search", [this.searchQuery, this.activeCategory])
            console.log("子组件中的数据 keyword：", this.searchQuery);
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
    /* z-index: 1; */
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
