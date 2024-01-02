<template>
  <div
    class="bg"
    :style="{
      'background-image': `url(${require('../../public/img/log/' +
        (bgIndex % 10) +
        '.png')})`,
    }"
    style="z-index: -2"
  >
    <div class="hui" style="z-index: -1"></div>
    <div ref="parent" class="container-xxl pt-5">
      <div
        class="w-100 justify-content-center d-flex"
        style="padding: 100px 0px; font-size: 50px; color: #fff"
      >
        项目开发日志
      </div>
      <div
        ref="child"
        v-for="(item, index) in logList"
        :key="index"
        :class="index % 2 == 0 ? '' : 'flex-row-reverse'"
        class="w-100 d-flex"
        :style="{ opacity: index == bgIndex ? 1 : 0.5 }"
      >
        <div class="w-50" :class="index % 2 == 0 ? 'xianl' : 'xianr'"></div>
        <div class="w-50 father" :class="index % 2 == 0 ? 'xianr' : 'xianl'">
          <div :class="index % 2 == 0 ? 'dian' : 'a-dian'"></div>
          <div :class="index % 2 == 0 ? 'data' : 'a-data'">
            <div class="d-flex align-items-end" style="height: 40px">
              <div class="riqi">{{ item.time.y }}</div>
              <div class="danwei">年</div>
              <div class="riqi">{{ item.time.m }}</div>
              <div class="danwei">月</div>
              <div class="riqi">{{ item.time.d }}</div>
              <div class="danwei">日</div>
            </div>
          </div>
          <div class="pt-5 p-4">
            <div
              class="w-100 rounded card shadow"
              style="text-align: left; padding: 35px"
            >
              <div class="w-100">
                {{ item.text }}
              </div>
              <div class="line"></div>
              <div class="w-100 d-flex mt-3">
                <div class="pe-1" style="color: #ff7575">
                  {{ item.submitName }}
                </div>
                <div style="color: #5e6d82">
                  提交于
                  {{
                    item.time.hour + ":" + item.time.min + ":" + item.time.sec
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 d-flex">
        <div class="w-50 xianl" style="height: 300px"></div>
        <div class="w-50 xianr" style="height: 300px"></div>
      </div>
      <div class="w-100" style="height: 300px"></div>
    </div>
  </div>
</template>
<script>
import { post } from "@/utils/http";

export default {
  name: "",
  data() {
    return {
      logList: [
        {
          Id: 1,
          time: {
            y: 2023,
            m: 11,
            d: 15,
            hour: 12,
            min: 23,
            sec: 56,
          },
          submitName: "清菱悦风",
          text: "Use align-self utilities on flexbox items to individually change their alignment on the cross axis (the y-axis to start, x-axis if flex-direction: column). Choose from the same options as align-items: start, end, center, baseline, or stretch (browser default).",
        },
      ],
      relativePositions: [],
      bgIndex: 0,
    };
  },
  computed: {
    isMethodBTriggered() {
      return this.$store.state.gunDongHigh;
    },
  },
  methods: {
    getRelativePositions() {
      const parentDiv = this.$refs.parent;
      const positions = [];

      // 遍历子元素获取相对位置
      this.logList.forEach((item, index) => {
        const childDiv = this.$refs.child[index];
        const rect = childDiv.getBoundingClientRect();
        const relativePosition = {
          top: rect.top - parentDiv.getBoundingClientRect().top,
          left: rect.left - parentDiv.getBoundingClientRect().left,
        };
        positions.push(relativePosition);
      });

      this.relativePositions = positions;
      console.log(this.relativePositions);
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.getRelativePositions();
    // });

    post("/log/getInf", {}).then(
      (Response) => {
        console.log("请求成功", Response);
        //Response是返回的参数
        var data = Response.data;

        this.logList = data;
        if (this.logList != [])
          for (var i = 0; i < this.logList.length; i++) {
            var dateTime = new Date(data[i].time_data);
            var t = {
              y: dateTime.getFullYear(),
              m: dateTime.getMonth() + 1,
              d: dateTime.getDate(),
              hour: dateTime.getHours(),
              min: dateTime.getMinutes(),
              sec: dateTime.getSeconds(),
            };
            this.logList[i].time = t;
          }
      },
      (error) => {
        console.log("请求失败", error.message);
      }
    );
  },
  watch: {
    isMethodBTriggered(high) {
      // this.bgIndex = Math.floor(high / 300);
      this.getRelativePositions();
      console.log("high" + high);
      var t = this.relativePositions;
      for (var i = 0; i < t.length; i++) {
        console.log("top" + t[i].top);
        if (high + 100 < t[i].top) {
          this.bgIndex = i;
          break;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-attachment: fixed;
  background-size: cover;
  animation: fly-in 0.3s ease-in-out;
  position: relative;
  transition: background-image 0.5s ease-in-out;
}
/* 添加一个额外的类来设置透明度 */
.bg.fade-out {
  opacity: 0;
}
.hui {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.6);
}
@keyframes fly-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.line {
  margin-top: 15px;
  background: #e4e7ed;
  height: 2px;
  width: 100%;
}
.xianl {
  border-right: 2px solid #e4e7ed;
}
.xianr {
  border-left: 2px solid #e4e7ed;
}
.father {
  position: relative;
  // padding-bottom: 20px;
}
.dian {
  position: absolute;
  top: 0px;
  left: -14px;
  background: #e4e7ed;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.a-dian {
  position: absolute;
  top: 0px;
  right: -14px;
  background: #e4e7ed;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.data {
  position: absolute;
  top: -0px;
  left: 30px;
  color: #fff;
}
.a-data {
  position: absolute;
  top: -0px;
  right: 30px;
  color: #fff;
}
.riqi {
  padding: 0px 8px;
  font-size: 44px;
}
.danwei {
  padding-bottom: 12px;
}
.card {
  background: rgba($color: #ffffff, $alpha: 0.8);
  backdrop-filter: blur(6px);
  font-size: 18px;
}
</style>

