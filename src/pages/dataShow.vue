<template>
  <div class="w-100 p-3">
    <div class=" " style="height: 50px">
      <div
        class="ps-3 d-flex justify-content-between align-items-center w-100 h-100"
      >
        <div style="font-weight: 700; font-size: 18px">数据展示</div>
        <div></div>
        <div></div>
      </div>
    </div>

    <div class="row m-0">
      <div class="row m-0 col-xxl-5 col-12 p-0">
        <div
          v-for="(item, index) in dataList"
          :key="index"
          class="col-12 col-md-6 p-3"
          style="height: 200px"
        >
          <div class="rounded-1 bg-body w-100 h-100 shadow-sm p-4">
            <div class="d-flex justify-content-between" style="height: 75px">
              <div class="" style="height: 100px">
                <div class="mt-1" style="color: #98a6ad; font-weight: 700">
                  {{ item.name }}
                </div>
                <div
                  class="mt-3"
                  style="font-size: 26px; font-weight: 700; color: #6c757d"
                >
                  {{ item.num }}
                </div>
              </div>
              <div></div>
              <div class="d-flex mt-1">
                <div
                  class="rounded-2 d-flex justify-content-center align-items-center"
                  style="
                    color: #727cf5;
                    background-color: rgba(114, 124, 245, 0.25);
                    height: 40px;
                    width: 40px;
                  "
                >
                  <v-icon style="font-size: 22px" :name="item.icon"></v-icon>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center" style="height: 60px">
              <div
                class="d-flex align-items-center me-3"
                :style="{ color: item.grow > 0 ? '#0acf97' : '#fa5c7c' }"
              >
                <v-icon
                  :name="item.grow > 0 ? 'shangsheng' : 'xiajiang'"
                ></v-icon>
                <div style="font-size: 14px">
                  {{ (item.grow > 0 ? item.grow : -item.grow) + "%" }}
                </div>
              </div>
              <div style="color: #98a6ad; font-size: 14px">
                Since last month
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xxl-7 col-12 p-3" style="height: 400px">
        <div
          class="rounded-1 bg-body w-100 h-100 shadow-sm"
          style="position: relative"
        >
          <div
            style="
              position: absolute;
              top: 15px;
              left: 6%;
              color: #98a6ad;
              font-weight: 700;
            "
          >
            每月新增用户VS去年
          </div>
          <div id="main" style="width: 100%; height: 400px"></div>
        </div>
      </div>
    </div>
    <div class="row m-0">
      <div class="col-xxl-7 col-12 p-3" style="height: 500px">
        <div class="rounded-1 bg-body w-100 h-100 shadow-sm"></div>
      </div>
      <div class="col-xxl-5 col-12 p-3" style="height: 500px">
        <div class="rounded-1 bg-body w-100 h-100 shadow-sm"></div>
      </div>
    </div>
    <div class="row m-0">
      <div class="col-xxl-5 col-12 p-3" style="height: 500px">
        <div class="rounded-1 bg-body w-100 h-100 shadow-sm"></div>
      </div>
      <div class="col-xxl-7 col-12 p-3" style="height: 500px">
        <div class="rounded-1 bg-body w-100 h-100 shadow-sm"></div>
      </div>
    </div>
    <!-- <div id="main" style="width: 100%; height: 400px"></div> -->
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      dataList: [
        { name: "用户", icon: "person", num: "29,401", grow: 5.27 },
        { name: "商品", icon: "shangpinguanli1", num: "5,983", grow: -1.34 },
        { name: "订单", icon: "dingdan1", num: "20,987", grow: 3.29 },
        { name: "收入", icon: "shouru", num: "$831,231", grow: 2.46 },
      ],
      option1:undefined,
      option2:undefined,
      option3:undefined,
      option4:undefined,
      option5:undefined,
    };
  },
  mounted() {
    var myChart1 = echarts.init(document.getElementById("main"));
    myChart1.setOption({
      xAxis: {
        type: "category",
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#98a6ad",
            width: 2,
          },
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: [53, 24, 61, 121, 101, 45, 83, 57, 93, 151, 84, 111],
          type: "bar",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgb(114,124,245)" },

              { offset: 1, color: "rgb(146,117,214)" },
            ]),
          },
        },
        {
          data: [83, 121, 47, 87, 111, 24, 68, 54, 133, 121, 47, 78],
          type: "bar",
          itemStyle: {
            color:'rgb(226,233,239)',
          },
        },
      ],
    });
    window.addEventListener("resize", function () {
      myChart1.resize();
    });
  },
};
</script>

<style lang="scss" scoped>
</style>

