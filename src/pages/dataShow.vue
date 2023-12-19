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
      <!-- 数据总量 -->
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
      <!-- 条形图 -->
      <div class="col-xxl-7 col-12 p-3" style="height: 400px">
        <div
          class="rounded-1 bg-body w-100 h-100 shadow-sm"
          style="position: relative"
        >
          <div
            style="
              position: absolute;
              top: 20px;
              left: 25px;
              color: #98a6ad;
              font-weight: 700;
            "
          >
            每月新增用户VS去年
          </div>
          <div id="chart1" style="width: 100%; height: 350px"></div>
        </div>
      </div>
    </div>
    <div class="row m-0">
      <!-- 折线图 -->
      <div class="col-xxl-8 col-12 p-3" style="height: 500px">
        <div
          class="rounded-1 bg-body w-100 h-100 shadow-sm p-3"
          style="position: relative"
        >
          <div
            style="
              position: absolute;
              top: 20px;
              left: 25px;
              color: #98a6ad;
              font-weight: 700;
            "
          >
            本周收入和支出
          </div>
          <div
            class="w-100 ps-4 pe-4"
            style="top: 45px; right: 0px; height: 90px; position: absolute"
          >
            <div
              class="w-100 h-100 d-flex align-items-center justify-content-evenly"
              style="background-color: #f9f9fd"
            >
              <div>
                <div class="w-100 d-flex justify-content-center">
                  <div style="color: #98a6ad; font-weight: 700">一周总支出</div>
                </div>
                <div class="d-flex align-items-center">
                  <div
                    class="me-2"
                    style="font-size: 34px; font-weight: 1000; color: #80ffa5"
                  >
                    ·
                  </div>
                  <div
                    style="font-size: 34px; font-weight: 700; color: #6c757d"
                  >
                    {{ "$8,254" }}
                  </div>
                </div>
              </div>
              <div>
                <div class="w-100 d-flex justify-content-center">
                  <div style="color: #98a6ad; font-weight: 700">一周总收入</div>
                </div>
                <div class="d-flex align-items-center">
                  <div
                    class="me-2"
                    style="font-size: 34px; font-weight: 1000; color: #00ddff"
                  >
                    ·
                  </div>
                  <div
                    style="font-size: 34px; font-weight: 700; color: #6c757d"
                  >
                    {{ "$18,254" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="chart2" style="width: 100%; height: 410px"></div>
        </div>
      </div>
      <!--  -->
      <div class="col-xxl-4 col-12 p-3" style="height: 500px">
        <div
          class="rounded-1 bg-body w-100 h-100 shadow-sm p-3"
          style="position: relative"
        >
          <div
            style="
              position: absolute;
              top: 20px;
              left: 25px;
              color: #98a6ad;
              font-weight: 700;
            "
          >
            用户类型比例
          </div>
          <div class="d-flex w-100 justify-content-center w-100">
            <div id="chart3" style="width: 300px; height: 270px"></div>
          </div>

          <div
            v-for="(item, index) in userList"
            :key="index"
            class="d-flex w-100 justify-content-between align-items-center"
            style="border-bottom: solid 1px #eee; height: 40px"
          >
            <div class="d-flex align-items-center">
              <div class="ps-2 pe-1" style="font-size: 34px; font-weight: 1000" :style="{color:item.color}">·</div>
              <div style="color:#888">{{item.name}}</div>
            </div>
            <div></div>
            <div style="color:#888;font-size:15px">
              {{item.value}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row m-0">
      <div class="col-xxl-5 col-12 p-3" style="height: 500px">
        <div class="rounded-1 bg-body w-100 h-100 shadow-sm"></div>
      </div>
      <div class="col-xxl-7 col-12 p-3" style="height: 500px">
        <div class="rounded-1 bg-body w-100 h-100 shadow-sm"></div>
      </div>
    </div> -->
    <!-- <div id="main" style="width: 100%; height: 400px"></div> -->
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      userList: [
        { value: 1348, name: "游客", color: "#546fc6" },
        { value: 2048, name: "普通用户", color: "#91cb74" },
        { value: 823, name: "商家", color: "#fac859" },
        { value: 278, name: "管理员", color: "#ee6666" },
      ],
      dataList: [
        { name: "用户", icon: "person", num: "29,401", grow: 5.27 },
        { name: "商品", icon: "shangpinguanli1", num: "5,983", grow: -1.34 },
        { name: "订单", icon: "dingdan1", num: "20,987", grow: 3.29 },
        { name: "收入", icon: "shouru", num: "$831,231", grow: 2.46 },
      ],
      option1: undefined,
      option2: undefined,
      option3: undefined,
      option4: undefined,
      option5: undefined,
    };
  },
  mounted() {
    var myChart1 = echarts.init(document.getElementById("chart1"));
    var myChart2 = echarts.init(document.getElementById("chart2"));
    var myChart3 = echarts.init(document.getElementById("chart3"));
    this.initChart1(myChart1);
    this.initChart2(myChart2);
    this.initChart3(myChart3);
    window.addEventListener("resize", function () {
      myChart1.resize();
      myChart2.resize();
      myChart3.resize();
      setTimeout(() => {
        myChart1.resize();
      myChart2.resize();
      myChart3.resize();
    }, 500); 
    });
  },
  methods: {
    initChart1(myChart) {
      myChart.setOption({
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: "25px",
          right: "25px",
          bottom: "0px",
          top: "55px",
          containLabel: true,
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
              color: "rgb(226,233,239)",
            },
          },
        ],
      });
    },
    initChart2(myChart) {
      myChart.setOption({
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },

        grid: {
          left: "10px",
          right: "10px",
          bottom: "",
          top: "130px",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "支出",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [1402, 1325, 1012, 1264, 1490, 2191, 1824],
          },
          {
            name: "收入",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [1200, 2420, 1610, 2340, 2200, 3400, 3100],
          },
        ],
      });
    },
    initChart3(myChart) {
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "用户类型",
            type: "pie",
            radius: ["50%", "80%"],

            label: {
              show: false,
            },
            data: [
              { value: 1348, name: "游客" },
              { value: 2048, name: "普通用户" },
              { value: 823, name: "商家" },
              { value: 278, name: "管理员" },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

