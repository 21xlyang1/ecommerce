<template>
  <div
    class="bg"
    :style="{
      'background-image': `url(${require('../../public/img/log/' +
        bgIndex%10 +
        '.png')})`,
    }"
    style="z-index: -2"
  >
    <div class="hui" style="z-index: -1"></div>
    <div ref="parent" class="container-xxl pt-5">
      <div
        class="w-100"
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
        :style="{opacity:index==bgIndex?1:0.5}"
      >
        <div class="w-50" :class="index % 2 == 0 ? 'xianl' : 'xianr'"></div>
        <div class="w-50 father" :class="index % 2 == 0 ? 'xianr' : 'xianl'">
          <div :class="index % 2 == 0 ? 'dian' : 'a-dian'"></div>
          <div :class="index % 2 == 0 ? 'data' : 'a-data'">
            <div class="d-flex align-items-end" style="height: 40px">
              <div class="riqi">2023</div>
              <div class="danwei">年</div>
              <div class="riqi">11</div>
              <div class="danwei">月</div>
              <div class="riqi">15</div>
              <div class="danwei">日</div>
            </div>
          </div>
          <div class="pt-5 p-4">
            <div
              class="w-100 rounded card shadow"
              style="text-align: left; padding: 35px"
            >
              <div class="w-100">
                {{ item.content }}
              </div>
              <div class="line"></div>
              <div class="w-100 d-flex mt-3">
                <div class="pe-1" style="color: #ff7575">{{ "清菱悦风" }}</div>
                <div style="color: #5e6d82">提交于 2018/11/15 13:36:47</div>
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
export default {
  name: "",
  data() {
    return {
      logList: [
        {
          time: "",
          content:
            "Use align-self utilities on flexbox items to individually change their alignment on the cross axis (the y-axis to start, x-axis if flex-direction: column). Choose from the same options as align-items: start, end, center, baseline, or stretch (browser default).",
        },
        {
          time: "",
          content:
            "Use align-items utilities on flexbox containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if flex-direction: column). Choose from start, end, center, baseline, or stretch (browser default).",
        },
        {
          time: "",
          content:
            "Set the direction of flex items in a flex container with direction utilities. In most cases you can omit the horizontal class here as the browser default is row. However, you may encounter situations where you needed to explicitly set this value (like responsive layouts).",
        },
        {
          time: "",
          content:
            "Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.",
        },
        {
          time: "",
          content:
            "Apply display utilities to create a flexbox container and transform direct children elements into flex items. Flex containers and items are able to be modified further with additional flex properties.",
        },
        {
          time: "",
          content:
            "Use align-self utilities on flexbox items to individually change their alignment on the cross axis (the y-axis to start, x-axis if flex-direction: column). Choose from the same options as align-items: start, end, center, baseline, or stretch (browser default).",
        },
        {
          time: "",
          content:
            "Use align-items utilities on flexbox containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if flex-direction: column). Choose from start, end, center, baseline, or stretch (browser default).",
        },
        {
          time: "",
          content:
            "Set the direction of flex items in a flex container with direction utilities. In most cases you can omit the horizontal class here as the browser default is row. However, you may encounter situations where you needed to explicitly set this value (like responsive layouts).",
        },
        {
          time: "",
          content:
            "Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.",
        },
        {
          time: "",
          content:
            "Apply display utilities to create a flexbox container and transform direct children elements into flex items. Flex containers and items are able to be modified further with additional flex properties.",
        },
        {
          time: "",
          content:
            "Use align-self utilities on flexbox items to individually change their alignment on the cross axis (the y-axis to start, x-axis if flex-direction: column). Choose from the same options as align-items: start, end, center, baseline, or stretch (browser default).",
        },
        {
          time: "",
          content:
            "Use align-items utilities on flexbox containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if flex-direction: column). Choose from start, end, center, baseline, or stretch (browser default).",
        },
        {
          time: "",
          content:
            "Set the direction of flex items in a flex container with direction utilities. In most cases you can omit the horizontal class here as the browser default is row. However, you may encounter situations where you needed to explicitly set this value (like responsive layouts).",
        },
        {
          time: "",
          content:
            "Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.",
        },
        {
          time: "",
          content:
            "Apply display utilities to create a flexbox container and transform direct children elements into flex items. Flex containers and items are able to be modified further with additional flex properties.",
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
  },
  watch: {
    isMethodBTriggered(high) {
      // this.bgIndex = Math.floor(high / 300);
      this.getRelativePositions();
      console.log("high"+high)
      var t = this.relativePositions;
      for (var i = 0; i < t.length; i++) {
        console.log("top"+t[i].top)
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
  font-size: 18px;
}
</style>

