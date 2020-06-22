<template>
	<div class="userDetail" v-if="userInfo">
		<div>
			<div class="user_img">
				<img v-if="userInfo.user_img" :src="userInfo.user_img" alt />
				<img v-else src="@/assets/1.jpg" alt />
			</div>
			<div class="user_edit">
				<ol>
					<li>
						<span>0</span>
						<span>粉丝</span>
					</li>|
					<li>
						<span>54</span>
						<span>关注</span>
					</li>|
					<li>
						<span>0</span>
						<span>获赞</span>
					</li>
				</ol>
				<button @click="$router.push('/edit')">编辑资料</button>
			</div>
		</div>
		<div>
			<h3>{{userInfo.name}}</h3>
			<p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
			<p v-else>这人什么都没写</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['userInfo']
}
</script>
<style lang="less">
.userDetail {
	background-color: white;
	padding: 0 12px;
	> div:nth-child(1) {
		display: flex;
		.user_img {
			height: 85px;
			width: 85px;
			margin-right: 20px;
			margin-bottom: 10px;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.user_edit {
			flex: 1;
			ol {
				display: flex;
				color: #ccc;
				padding: 10px;
				li {
					flex: 1;
					display: flex;
					align-items: center;
					// justify-content: center;
					flex-direction: column;
					font-size: 13px;
					span:nth-child(1) {
						color: black;
					}
					span:nth-child(2) {
						color: grey;
					}
				}
			}
			button {
				border: 1px solid pink;
				background-color: pink;
				color: white;
				padding: 4px 90px;
			}
		}
	}
	> div:nth-child(2) {
		p {
			padding: 5px 0;
			color: #999;
			font-size: 15px;
		}
	}
}
</style>