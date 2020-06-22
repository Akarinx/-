<template>
	<div class="commentParent">
		<div class="commentPart" v-for="(item, index) in commentlist" :key="index">
			<!--这是一块评论模块-->
			<div class="commentPart1">
				<!--这是主评论模块-->
				<div class="headimg">
					<img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt />
					<img v-else src="@/assets/1.jpg" alt />
				</div>
				<div class="content">
					<p>
						<span>{{item.userinfo.name}}</span>
						<span>{{item.comment_date}}</span>
					</p>
					<div class="com">
						{{item.comment_content}}
						<span class="publishf" @click="publishiClick(item.comment_id)">回复</span>
					</div>
				</div>
			</div>
			<reply @Postpublish="Postpublish" style="padding-left:30px" :child="item.child"></reply>
			<!--这是回复模块-->
		</div>
	</div>
</template>
<script>
import reply from './reply'
export default {
	components: {
		reply
	},
	data() {
		return {
			commentlist: []
		}
	},
	methods: {
		async commentData() {
			const res = await this.$http.get(
				'/comment/' + this.$route.params.id
			)
			this.commentlist = this.changeCommentData(res.data)
			this.$emit('getplnum', res.data.length)
			// console.log(this.commentlist)
		},
		changeCommentData(arr) {
			function fn(temp) {
				let arr1 = []
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].parent_id == temp) {
						arr1.push(arr[i])
						arr[i].child = fn(arr[i].comment_id)
					}
				}
				return arr1
			}
			const res = fn(null)
			return res
		},
		publishiClick(id) {
			this.$emit('publishClick', id)
		},
		Postpublish(id) {
			console.log('ok')
			this.$emit('publishClick', id)
		}
	},
	created() {
		this.commentData()
	}
}
</script>
<style lang="less">
.commentParent {
	padding: 20px 5px;
	.commentPart {
		border-bottom: solid #e7e7e7 1px;
		.commentPart1 {
			display: flex;
			padding: 10px 0;

			.headimg {
				margin-right: 10px;
				img {
					width: 35px;
					height: 35px;
					border-radius: 50%;
				}
			}
			.content {
				flex: 1;
				position: relative;
				p {
					font-size: 13px;
					color: #555;
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;
				}
				.com {
					font-size: 13px;
				}
				.publishf {
					position: absolute;
					right: 0;
					color: red;
				}
			}
		}
	}
}
</style>