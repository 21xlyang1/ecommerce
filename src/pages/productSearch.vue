<template>
    <div class="mainDiv">
        <div class="search-Box">
            <searchBox v-model="searchText" @search="Search" :placeholder="placeholder" />
        </div>
        <div class="Hr">
            <hr />
        </div>
        <div class="background-plate">
            <div class="Card-box">
                <commodityCard v-for="(item, index) in searchList" :key="index" :data="item"/>
            </div>
        </div>
    </div>
</template>

<!-- http://localhost:8080/#/ss/search -->

<script>
import { post } from '@/utils/http';
import commodityCard from "../components/productItem.vue";
import searchBox from "../components/searchPages.vue";

export default {
    components: {
        commodityCard, // 注册commodityCard组件
        searchBox,   // 注册searchBox搜索框组件
    },
    data () {
        return {
            placeholder: "请输入关键字进行搜索...",
            searchText: '',
            dataList: [

            ],
        }
    },
    methods: {
        Search( data ) {
            let keyword = data[0];
            let type = data[1];
            console.log("父组件:", "'", data[0], "' '", data[1], "'");
            post("/product/getList", { keyword }).then(
                (Response) => {
                    console.log("搜索商品请求成功", Response);
                    this.dataList = Response.data;
                },
                (error) => {
                    console.log("搜索商品请求失败", error.message);
                }
            );
            this.dataList.forEach((item) => {
                post("/product/getProductInfo", { item }).then(
                    (Response) => {
                        console.log("获取商品请求成功", Response);
                        this.dataList.push(Response.data);
                    },
                    (error) => {
                        console.log("获取商品请求失败", error.message);
                    }
                );
            });
        },
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
    margin-top: 10px;
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