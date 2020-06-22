<template>
  <div>
    <Login-top name="bilibili注册">
      <div slot="right" @click="$router.push('/login')">
        登录
      </div>
    </Login-top>
    <Login-text
      label_name="姓名"
      style="margin:4.167vw 0"
      ph="请输入姓名"
      rule="^.{6,16}$"
      @inputChange="(val) => (model.name = val)"
    />
    <Login-text
      label_name="账号"
      ph="请输入账号"
      rule="^.{6,16}$"
      @inputChange="(val) => (model.username = val)"
    />
    <Login-text
      label_name="密码"
      ph="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputChange="(val) => (model.password = val)"
    />
    <Login-btn btn_name="注册" @registerSubmit="registerSubmit"></Login-btn>
  </div>
</template>
<script>
import LoginTop from "@/components/common/LoginTop";
import LoginText from "@/components/common/LoginText";
import LoginBtn from "@/components/common/LoginBtn";
export default {
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn,
  },
  methods: {
    async registerSubmit() {
      let rule = /^.{6,16}$/;
      if (
        rule.test(this.model.name) &&
        rule.test(this.model.username) &&
        rule.test(this.model.password)
      ) {
        const res = await this.$http.post("/register", this.model);
        this.$msg.fail(res.data.msg);
        console.log(res);
      } else {
        this.$msg.fail("格式不正确,请重新输入");
      }
    },
  },
};
</script>
