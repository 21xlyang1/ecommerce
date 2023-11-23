<template>
  <div class="floating-label">
    <label
      :for="label"
      :class="
        isFocused || inputValue != ''
          ? 'floating-label-text-float'
          : 'floating-label-text'
      "
      >{{ label }}</label
    >
    <input
      :id="label"
      class="input w-100"
      :type="canSee?'':'password'"
      @blur="handleBlur"
      @focus="handleFocus"
      v-model="inputValue"
    />
    <button v-show="label=='password'||label=='repassword'"  @click="canSee=!canSee" class="seebt">
      <v-icon class="seeicon"  :name="canSee?'notsee':'cansee'"></v-icon>
    </button>
  </div>
</template>

<script>
export default {
  // props: {
  //   label: {
  //     type: String,
  //     required: true,
  //   },
  //   value: {
  //     type: String,

  //   },
  // },
  props: ["value", "label"],
  data() {
    return {
      isFocused: false,
      canSee:false,
      // inputValue: "",
    };
  },
  computed: {
    inputValue: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },
  mounted(){
    if(this.label!='password'&&this.label!='repassword'){
      this.canSee=true
    }
  },
  methods: {
    handleInput(event) {
      this.inputValue = event.target.value;
      var result = this.$emit("input", this.inputValue);
      console.log(this.inputValue, result);
    },
    handleBlur() {
      this.isFocused = false;
      this.$emit("blur", this.value); // 用当前输入框的值触发blur事件
    },
    handleFocus() {
      this.isFocused = true;
    },
  },
};
</script>

<style lang="scss" scoped>

.seebt{
  padding: 3px 10px;
  border: none;
  background: none;
  position: absolute;
  top: 0px;
  right:  0px;
color: #6b6b6b;
}
.seebt:hover{
color: #000000;
}

.seeicon{
  font-size:24px;
  
}
.floating-label {
  position: relative;
  background: none;
}

.floating-label-text {
  position: absolute;
  top: 8px;
  left: 25px;
  font-size: 14px;
  color: #6b6b6b;
  /* pointer-events: none; */
  transition: 0.1s ease-out;
}
.floating-label-text-float {
  position: absolute;
  top: 0px;
  left: 25px;
  font-size: 13px;
  color: #668af0;
  /* pointer-events: none; */
  transition: 0.1s ease-out;
}

.input {
  /* background: none; */
  /* padding: 20px 12px 12px 12px; */
  /* border: 0px;
  border-bottom: 1px solid aliceblue;
  color: rgb(43, 45, 48); */
  /* background-color: #2d3035; */
  /* outline: none; */

  min-width: 350px;
  height: 40px;
  margin: 0px 0;
  padding-left: 25px;
  padding-top: 10px;
  font-size: 14px;
  letter-spacing: 0.15px;

  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}
.input:focus {
  /* border: 0px; */
  /* border-bottom: 1px solid rgba(219, 101, 116); */
  /* outline: none; */
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}
</style>