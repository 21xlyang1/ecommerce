<template>
    <div class="mainDiv">
        <div class="search-Box">
            <searchBox />
        </div>
        <div class="Hr">
            <hr />
        </div>
        <div class="background-plate">
            <div class="Card-box">
                <commodityCard />
            </div>
        </div>
    </div>
</template>

<!-- http://localhost:8080/#/ss/search -->

<script>
import commodityCard from "../components/productItem.vue";
import searchBox from "../components/search.vue";

export default {
    components: {
        commodityCard, // 注册commodityCard组件
        searchBox,   // 注册searchBox搜索框组件
    },
};
</script>

<style lang="scss" scoped>
.Hr {
    padding: 0;
    display: flex;
    justify-content: center; // 水平居中
    // background-color: burlywood;
}

div hr {
    height: 3px;
    width: 86%;
    background-color: black;
}

.background-plate {
    // 确定整个卡片页面
    // background-color: cyan;
    // height: 1200px; // 这里注释掉可以自适应高度
    display: flex;
    justify-content: center; // 水平居中
    // align-items: center; // 垂直居中
}

.search-Box {
    // 同上，只是让搜索框水平居中
    display: flex;
    justify-content: center;
}

.Card-box {
    // 确定卡片的盒子位置
    background-color: rgb(255, 236, 236);
    height: 100%;
    width: 70%;
    border-radius: 10px;

    padding: 30px;
}
</style>