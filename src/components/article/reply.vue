<template>
	<div class="reply">
		<div class="commentPart1" v-for="(item, index) in child" :key="index">
			<!--这是主评论模块-->
			<div class="headimg">
				<img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt />
				<img v-else src="@/assets/1.jpg" alt />
				<p>
					<span>{{item.userinfo.name}}</span>
					<span>{{item.comment_date}}</span>
				</p>
			</div>
			<div class="content">
				<div class="com">
					回复
					<span style="color:skyblue">@{{item.parent_user_info.name}}</span>
					:{{item.comment_content}}
					<span
						class="publish"
						@click="postItemComment(item.comment_id)"
					>回复</span>
				</div>
			</div>
			<div class="commentchild">
				<comment-childitem @postchild="postItemComment" :child="item.child"></comment-childitem>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'commentChilditem',
	props: ['child'],
	methods: {
		postItemComment(id) {
			this.$emit('postchild', id)
			this.$emit('Postpublish', id)
		}
	}
}
</script>
<style lang="less">
.reply {
	.commentPart1 {
		display: flex;
		flex-direction: column;
		.headimg {
			display: flex;
			img {
				margin: 0 5px 10px 0;
			}
			p {
				flex: 1;
				font-size: 13px;
				color: #555;
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
			}
		}
		.content {
			position: relative;
			.publish {
				color: pink;
				position: absolute;
				right: 15px;
			}
		}
	}
}
</style>