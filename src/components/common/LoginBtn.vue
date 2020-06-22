<template>
  <div class="LoginBtn" @click="rgClick">
    <button class="btn">{{ btn_name }}</button>
  </div>
</template>
<script>
export default {
  props: ["btn_name"],
  methods: {
    rgClick() {
      this.$emit("registerSubmit");
    },
  },
};
</script>
<style lang="less">
.LoginBtn {
  padding: 15px 10px;
  .btn {
    height: 12.5vw;
    width: 100%;
    color: white;
    font-size: 4.444vw;
    border-radius: 6.25vw;
    background-color: red;
    border: 1px solid red;
  }
}
</style>
