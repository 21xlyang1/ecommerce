<template>
    <div class="search">
        <div class="icon">
            <span class="btuSearch" @click="starSearch"></span>
            <div class="input">
                <input type="text" placeholder="搜索相关商品" v-model="searchText" />
            </div>
            <span class="clear" v-show="searchText!=''" @click="clearSearch"></span>
        </div>
    </div>
</template>

<!-- http://localhost:8080/#/ss/search -->

<script>
export default {
    data() {
        return {
            searchText: ''  // 初始化为一个空字符串
        };
    },
    methods: {
        starSearch() {
            alert("搜索功能");
            console.log(this.searchText);
        },
        clearSearch() {
            this.searchText = "";
        },
    },
};
</script>

<style lang="scss" scoped>
// 不加width属性的话 该组件就是居中了
.search {
    height: 60px;
    background-color: #f0f;

    // 将 .search 设置为 Flex 容器
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
}

.search .icon {
    background-color: #fff;
    border: 2px solid #000; // 2px的黑色边框
    position: absolute;
    width: 60%;
    height: 60px;
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}

// 被 input 标签铺满
.input {
    // background-color: brown;
    position: relative;
    width: calc(100% - 140px);
    height: 60px;
    margin-left: 60px;
    margin-right: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input input {
    // background-color: lightgray;
    position: absolute;
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    padding: 10px 0;
}

.btuSearch {
    // background-color: #ff0;
    position: absolute;
    position: flex;

    border-radius: 50%;
    width: 60px;
    height: 54px;
    right: 2px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btuSearch::before {
    position: absolute;
    content: "";
    width: 25px;
    height: 25px;
    border: 3px solid #000;
    border-radius: 50%;
    transform: translate(-3px, -3px);
}

.btuSearch::after {
    position: absolute;
    content: "";
    width: 3px;
    height: 12px;
    background: #000;
    transform: translate(9px, 9px) rotate(315deg);
}

.clear {
    // background-color: #ff0;
    position: absolute;
    position: flex;

    right: 60px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.clear::before{
    position: absolute;
    content: "";
    width: 2px;
    height: 20px;
    background-color: #000;
    transform: rotate(45deg);
}

.clear::after{
    position: absolute;
    content: "";
    width: 2px;
    height: 20px;
    background-color: #000;
    transform: rotate(315deg);
}
</style>