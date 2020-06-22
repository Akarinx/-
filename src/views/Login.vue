<template>
	<div>
		<Login-top name="bilibili登录">
			<template #right>
				<div @click="$router.push('/register')">注册</div>
			</template>
		</Login-top>
		<Login-text
			label_name="账号"
			style="margin:4.167vw 0"
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
		<Login-btn btn_name="登录" @registerSubmit="registerSubmit"></Login-btn>
	</div>
</template>
<script>
import LoginTop from '@/components/common/LoginTop'
import LoginText from '@/components/common/LoginText'
import LoginBtn from '@/components/common/LoginBtn'
export default {
	data() {
		return {
			model: {
				username: '',
				password: ''
			}
		}
	},
	components: {
		LoginTop,
		LoginText,
		LoginBtn
	},
	methods: {
		async registerSubmit() {
			let rule = /^.{6,16}$/
			if (
				rule.test(this.model.username) &&
				rule.test(this.model.password)
			) {
				const res = await this.$http.post('/login', this.model)
				this.$msg.fail(res.data.msg)
				console.log(res.data)
				localStorage.setItem('id', res.data.id)
				localStorage.setItem('token', res.data.token)
				setTimeout(() => {
					this.$router.push('/userInfo')
				}, 1000)
			} else {
				this.$msg.fail('格式不正确,请重新输入')
			}
		}
	}
}
</script>
