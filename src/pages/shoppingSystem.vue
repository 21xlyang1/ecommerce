<template>
  <div class=" w-100" style=" min-width: 1300px;">

    <!-- 导航栏 -->
    <!-- <div class=" w-100 myhead " style="height: 70px;position: fixed;top: 0;z-index: 100000;">
      <myHead></myHead>
    </div>
    <div class="w-100" style="height:70px">

    </div> -->
    <!-- 主体内容 -->
    <!-- <div  class="w-100" style="height: 800px;">
      <router-view name="tow"></router-view>
    </div>
    <el-scrollbar class="w-100" style="height: 200px;">
      <div class="w-100 bg-danger " style="height: 500px;"></div>
    </el-scrollbar> -->
    <router-view name="tow"></router-view>
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

