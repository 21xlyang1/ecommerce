<template>


    <span :class="'iconfont icon-'+name"></span>

  
  
</template>
  <script>
// [class*=" v-icon-"],[class^="v-icon-"]
export default {
  name: "VIcon",
  props: {
    name: String,
  },
};
</script>
  
  <style  scoped>
@import url("./iconfont.css");
</style>
  
  