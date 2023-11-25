<template>
  <div>
    <div id="app" :style="{ height: size + 'px', width: size + 'px' }">
      <div
        v-for="(ball, index) in balls"
        :key="index"
        class="ball"
        :style="{
          top: ball.top,
          left: ball.left,
          background: color,
          height: ballsize + 'px',
          width: ballsize + 'px',
          transform: 'scale(' + calculatescale(index, indexBalls) + ')',
          'box-shadow': boxshow,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [ "size"],
  data() {
    return {
      numberOfBalls: 20,
      balls: [],
      center: { x: 40, y: 40 }, // 中心点坐标
      radius: 40, // 半径
      color: "red",
      size: 50,
      ballsize: 10,
      ballscale: 0.14,
      indexBalls: 3,
      boxshow: "",
    };
  },
  mounted() {
    this.ballsize = this.size * this.ballscale;
    this.center.x = (this.size * (1 - this.ballscale)) / 2;
    this.center.y = this.center.x;
    this.radius = (this.size * (1 - this.ballscale)) / 2;

    this.calculateBallPositions();
    window.addEventListener("resize", this.calculateBallPositions);

    this.intervalId = setInterval(() => {
      this.indexBalls++;
      this.indexBalls = this.indexBalls % this.numberOfBalls;
    }, 70);
    this.getboxshow();




    this.color = this.getRandomColor(); // 每秒改变一次颜色
    this.getboxshow();
    this.intervalId = setInterval(() => {
      this.color = this.getRandomColor(); // 每秒改变一次颜色
      this.getboxshow();
    }, 2000); // 每秒触发一次
  },
  destroyed() {
    window.removeEventListener("resize", this.calculateBallPositions);
    clearInterval(this.intervalId);
  },

  methods: {
    calculateBallPositions() {
      this.balls = [];
      for (let i = 0; i < this.numberOfBalls; i++) {
        const angle = (i / this.numberOfBalls) * 2 * Math.PI;
        const x = this.center.x + this.radius * Math.cos(angle);
        const y = this.center.y + this.radius * Math.sin(angle);
        this.balls.push({
          left: x + "px",
          top: y + "px",
        });
      }
    },
    calculatescale(index, indexBalls) {
      var t = index - indexBalls;
      if (t < 0) {
        t += this.numberOfBalls;
      }
      t -= this.numberOfBalls / 4;
      if (t < 0) {
        t = 0;
      }
      return t / this.numberOfBalls;
    },
    getboxshow() {
      this.boxshow = "";
      var color = this.color;
      var beishu = [0.1, 0.2, 0.4, 0.6, 0.8, 1];
      for (var i = 0; i < 6; i++) {
        this.boxshow +=
          (i != 0 ? "," : "") +
          "0px 0px " +
          this.size * beishu[i] * 0.5 +
          "px " +
          color;
      }
    },
    getRandomColor() {
      // 生成鲜艳的颜色
      const hue = Math.floor(Math.random() * 360); // 随机色调
      const saturation = 80 + Math.floor(Math.random() * 20); // 饱和度在80-100之间
      const lightness = 50 + Math.floor(Math.random() * 10); // 亮度在50-60之间

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    },
  },
  watch: {},
};
</script>

<style scoped>
#app {
  position: relative;
  animation: pop-btn 0.3s ease-in-out;
}

.ball {
  border-radius: 50%;
  position: absolute;
  transition: background 2s, box-shadow 2s;

}

@keyframes pop-btn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  40%{
        transform: scale(0.6);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}



</style>
