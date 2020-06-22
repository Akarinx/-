<template>
	<div class="edit" v-if="model">
		<nav-bar :model="model" />
		<van-cell-group>
			<div class="uploadHead">
				<van-uploader class="head" preview-size="100vw" :after-read="afterRead" />
				<van-cell center title="头像">
					<template #default>
						<div>
							<img v-if="model.user_img" class="head_img" :src="model.user_img" />
							<img v-else class="head_img" src="../assets/1.jpg" />
						</div>
					</template>
				</van-cell>
			</div>

			<van-cell center title="昵称" @click="show=true" :value="model.name" />
			<van-cell center title="UID" :value="model.id" />
			<van-cell
				center
				title="性别"
				v-if="model.gender!=undefined"
				:value="model.gender==0?'男':'女'"
				@click="showGenner=true"
			/>
			<van-cell center title="出生日期" value="01-01" />
			<van-cell center title="个性签名" @click="textshow=true" :value="model.user_desc" />
			<van-dialog v-model="show" title="昵称" show-cancel-button @confirm="name_confirm">
				<van-field v-model="name_value" autofocus placeholder="请输入昵称" />
			</van-dialog>
			<van-dialog v-model="textshow" title="个性签名" show-cancel-button @confirm="text_confirm">
				<van-field v-model="text_value" autofocus placeholder="请输入个性签名" />
			</van-dialog>
		</van-cell-group>
		<div class="btn">
			<van-button type="default">退出登录</van-button>
			<van-button type="default" to="/userInfo">返回空间</van-button>
		</div>
		<van-action-sheet v-model="showGenner" :actions="actions" @select="onGenner" />
	</div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
import axios from 'axios'
import { Toast } from 'vant'
export default {
	data() {
		return {
			model: {},
			show: false,
			textshow: false,
			name_value: '',
			text_value: '',
			showGenner: false,
			actions: [
				{ name: '男', val: 0 },
				{ name: '女', val: 1 }
			]
		}
	},
	components: {
		NavBar
	},
	methods: {
		async selectUser() {
			let res = await this.$http.get(
				'/user/' + localStorage.getItem('id'),
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				}
			)
			this.model = res.data[0]
		},
		async afterRead(file) {
			// 此时可以自行将文件上传至服务器
			const formData = new FormData() //声明打包表单信息
			formData.append('file', file.file) //添加file属性信息,与后台对接
			const res = await this.$http.post('/upload', formData) //将表单信息提交
			this.model.user_img = res.data.url //更新本地信息
			this.UpdateUser() //更新服务器信息
		},
		async UpdateUser() {
			const res = await this.$http.post(
				'/update/' + localStorage.getItem('id'),
				this.model
			)
		},
		name_confirm() {
			this.model.name = this.name_value
			this.UpdateUser()
		},
		text_confirm() {
			this.model.user_desc = this.text_value
			this.UpdateUser()
		},
		onGenner(item) {
			this.model.gender = item.val
			this.UpdateUser()
			this.showGenner = false
		}
	},
	created() {
		this.selectUser()
	}
}
</script>
<style lang="less">
.edit {
	.head_img {
		width: 65px;
		height: 65px;
		border-radius: 50%;
	}
	.btn {
		margin: 10px 0;
		display: flex;
		flex-direction: column;
	}
	.uploadHead {
		position: relative;
		overflow: hidden;
		.head {
			position: absolute;
			z-index: 1;
			opacity: 0;
		}
	}
}
</style>