import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginShow:true,
    gunDongHigh:0,
  },
  getters: {
  },
  mutations: {
    showLogin(state){
      state.isLoginShow=true
      var dialog = document.querySelector('dialog')
      document.querySelectorAll("dialog[closeByMask]").forEach(dialog => {
        dialog.onclick = function(event) {
          if(event.target.tagName.toLowerCase() == "dialog") this.close();
        }
      });
      dialog.showModal()
    
    },
    showRegister(state){
      state.isLoginShow=false
      var dialog = document.querySelector('dialog')
      document.querySelectorAll("dialog[closeByMask]").forEach(dialog => {
        dialog.onclick = function(event) {
          if(event.target.tagName.toLowerCase() == "dialog") this.close();
        }
      });
      dialog.showModal()

    },
    closeLogin(state){
      var dialog = document.querySelector('dialog')
      dialog.close()
    },
    setGunDongHigh(state,high){
      state.gunDongHigh=high
    }
  },
  actions: {
  },
  modules: {
  }
})
