<template>
	<div class="userInfo">
		<Nav-bar />
		<img class="background" src="@/assets/0134.jpg" alt="bg" />
		<user-detail :userInfo="model" />
	</div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
import userDetail from '@/components/userComponents/userTop'
export default {
	data() {
		return {
			model: {}
		}
	},
	components: {
		NavBar,
		userDetail
	},
	methods: {
		async setUserInfo() {
			let res = await this.$http.get(
				'/user/' + localStorage.getItem('id'),
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				}
			)
			this.model = res.data[0]
			// console.log(this.model)
		}
	},
	created() {
		this.setUserInfo()
	}
}
</script>
<style lang="less">
.userInfo {
	.background {
		height: 150px;
		width: 100%;
	}
}
</style>
