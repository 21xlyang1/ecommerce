<template>
  <div class="container">
    <div class="content">
      <!-- Your content goes here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'DivWithThirdHeight',
};
</script>

<style scoped>
.container {
  width: 100%;
  position: relative;
  padding-top: 20%; /* 高度为宽度的三分之一 */
  background-color: #3498db;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e74c3c;
}
</style>
