<template>
  <div class="LoginText">
    <van-field
      v-model="text"
      :label="label_name"
      :type="type"
      :placeholder="ph"
      :rule="rule"
      @input="handleInput"
    />
  </div>
</template>
<script>
export default {
  props: ["label_name", "type", "ph", "rule"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    handleInput() {
      const rule = new RegExp(this.rule);
      if (rule.test(this.text)) {
        this.$emit("inputChange", this.text);
      } else {
        this.$emit("inputChange", "");
      }
    },
  },
};
</script>
