<template>
	<div class="commentt" :key="commonkey">
		<p class="commentTitle">
			<span>评论</span>
			<span>({{plnum}})</span>
		</p>
		<div class="userinput">
			<img v-if="myUseritem" :src="myUseritem.user_img" alt />
			<img v-else src="@/assets/1.jpg" />
			<van-field v-model="value" placeholder="说点什么吧" ref="PostIpt" @keyup.enter="commentPublish" />
			<van-button @click="commentPublish">发表</van-button>
		</div>
		<articleComment @getplnum="num=>plnum=num" @publishClick="PostChildClick" />
	</div>
</template>
<script>
import articleComment from './articleComment'
export default {
	data() {
		return {
			myUseritem: null,
			value: '',
			plnum: 0,
			Postcom: {
				comment_content: '',
				comment_date: '',
				parent_id: null,
				article_id: null
			},
			commonkey: 1
		}
	},
	components: {
		articleComment
	},
	methods: {
		async myUser() {
			const res = await this.$http.get(
				'/user/' + localStorage.getItem('id'),
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				}
			)
			this.myUseritem = res.data[0]
		},
		getplnum(num) {
			this.plnum = num
		},
		async commentPublish() {
			if (
				!this.myUseritem &&
				!localStorage.getItem('token') &&
				!localStorage.getItem('id')
			) {
				this.$msg.fail('请先登录')
				return
			}
			if (this.value == '') {
				this.$msg.fail('输入不可为空')
				return
			}
			const date = new Date()
			let month = date.getMonth() + 1
			let day = date.getDate()
			let datestr =
				month.toString().padStart(2, '0') +
				'-' +
				day.toString().padStart(2, '0')
			this.Postcom.comment_content = this.value
			this.Postcom.comment_date = datestr
			this.Postcom.article_id = this.$route.params.id
			const res = await this.$http.post(
				'/comment_post/' + localStorage.getItem('id'),
				this.Postcom,
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				}
			)
			if (res.status == 200) {
				this.$msg.fail('发表成功')
			}
			this.commonkey++ //刷新组件
			this.value = '' //清空输入框内容
			this.Postcom.parent_id = null
		},
		PostChildClick(id) {
			this.Postcom.parent_id = id
			this.$refs.PostIpt.focus()
		}
	},
	created() {
		this.myUser()
	}
}
</script>
<style lang="less">
.commentt {
	padding: 30px 10px;
	.commentTitle {
		span:nth-child(2) {
			color: #aaa;
			margin-left: 10px;
		}
	}
	.userinput {
		display: flex;
		img {
			margin: 12px 5px;
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
		.van-field__body {
			background-color: #f4f4f4;
			color: #c6c6c6;
			padding: 5px 15px;
			border-radius: 20px;
		}
		button {
			white-space: nowrap;
			background-color: pink;
			color: white;
			border: 0;
		}
	}
}
</style>