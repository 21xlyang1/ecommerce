<template>
  <div id="app">
    <dialog closeByMask  class="d-flex align-items-center"  style="padding: 0px; border:0px;z-index: 100;height: 100%; background: none;">
      <loginCard :islog="$store.state.isLoginShow" ></loginCard>
    </dialog>
    <router-view name="one"></router-view>


  </div>
</template>
 

<script>

import loginCard from './components/loginCard.vue';

export default {
  name: "",
  components: { loginCard },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

dialog::backdrop {
  background: rgba($color: #000000, $alpha: 0.4);
}
dialog {
   transition: opacity 0.4s ease;
   opacity: 1;
}
dialog:not([open]) {
  display: block;
  opacity: 0;
  visibility: hidden;
}
</style>
