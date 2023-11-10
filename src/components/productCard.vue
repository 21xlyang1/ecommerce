<template>
  <div  class=" p-3" style="min-width: 250px  ; height: 350px;">
    <div class="w-100 h-100 bg-danger">
      {{proId}}
    </div>

  </div>
</template>
<script>
  export default {
    name:"productCard",
    props:['proId'],
  }
</script>

<style lang="scss" scoped>

</style>

