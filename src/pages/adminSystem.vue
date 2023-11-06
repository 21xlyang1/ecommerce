<template>

  <div class="w-100" style="height: 1000px">
后台管理系统
    <!-- 导航栏 -->
    <div class="w-100 bg-danger" style="height: 70px">
      <myHead></myHead>
    </div>
    <div class="w-100 d-flex" style="height: 800px;">
      <div class="h-100 bg-success" style="width: 300px;">
        
      </div>
      <div class=" bg-primary h-100" style="flex-grow: 1;">
        <router-view name="tow"></router-view>
      </div>
      
    </div>



  </div>
</template>
<script>
import myHead from '@/components/myHead.vue';
  export default {
    name:"",
    components:{myHead},
  }
</script>

<style lang="scss" scoped>

</style>

