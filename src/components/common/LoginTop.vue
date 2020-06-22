<template>
  <div class="Login-top">
    <div></div>
    <div>{{ name }}</div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["name"],
};
</script>
<style lang="less">
.Login-top {
  height: 12.5vw;
  background-color: white;
  display: flex;
  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
  }
}
</style>
