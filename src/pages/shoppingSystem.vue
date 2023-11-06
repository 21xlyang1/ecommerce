<template>
  <div class=" w-100" style="height: 1000px;">

    <!-- 导航栏 -->
    <div class=" w-100 " style="height: 70px;">
      <myHead></myHead>
    </div>
    <!-- 主体内容 -->
    <div class=" container-xl" style="height: 800px;">
      <router-view name="tow"></router-view>
    </div>
  </div>
</template>
<script>

import myHead from '@/components/myHead.vue'

  export default {
    components: { myHead },
    name:"",

    
  }
</script>

<style lang="scss" scoped>

</style>

