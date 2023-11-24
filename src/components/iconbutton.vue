<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="border-radius: 50%"
    :style="{
      height: size,
      width: size,
      background: isOver ? color : 'none',
      // border: isOver ? 'none' : ' 1px solid' + color,
      border: showBorder ? '2px solid ' + color : '',
    }"
    @mouseover="isOver = true"
    @mouseleave="isOver = false"
    @click="handleClick"
  >
    <v-icon
      :name="icon"
      :style="{ fontSize: iconSize, color: isOver ? '#fff' : color }"
    ></v-icon>
  </div>
</template>
<script>
export default {
  name: "",
  // props: ["size", "iconSize", "icon", "color"],
  props: {size: { default: '30px' },iconSize: { default: '30px' },icon: { default: 'add' },color: { default: 'green' }, showBorder: { default: true } },
  data() {
    return {
      isOver: false,
    };
  },
  mounted() {},
  methods: {
    handleClick() {
      this.$emit("click"); // 触发点击事件
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

