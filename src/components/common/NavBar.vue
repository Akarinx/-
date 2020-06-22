<template>
	<div class="NavBar" v-if="model">
		<div class="logo">
			<img src="@/assets/logo.png" alt="bilibili" @click="$router.push('/')" />
		</div>
		<div>
			<van-search v-model="value" shape="round" placeholder="请输入搜索关键词" style="padding:1.833vw" />
		</div>
		<div>
			<div class="head_pic" @click="$router.push('/userInfo')">
				<img v-if="model.user_img" :src="model.user_img" alt />
				<img v-else src="@/assets/1.jpg" alt />
			</div>
			<p>下载app</p>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			value: '',
			model: null
		}
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
.NavBar {
	height: 12.5vw;
	background-color: white;
	display: flex;
	.logo {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25vw;
		img {
			width: 35%;
		}
	}
	div:nth-child(2) {
		flex: 1;
		display: flex;
		justify-content: center;
		.van-field__control {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	div:nth-child(3) {
		display: flex;
		justify-content: center;
		align-items: center;
		.head_pic {
			width: 6.667vw;
			height: 6.667vw;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}

		p {
			padding: 1.389vw 2.778vw;
			margin: 0 2.778vw;
			border-radius: 0.833vw;
			color: white;
			background-color: pink;
			font-size: 3.611vw;
		}
	}
}
</style>
