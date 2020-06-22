<template>
	<div class="detail" v-if="detailitem" @click="$router.push('/av/'+detailitem.id)">
		<div class="pic">
			<img :src="detailitem.img" style="width:100%;" />
			<div class="pl">
				<div class="bfnum">
					<van-icon name="play-circle" />&nbsp;123
				</div>
				<div class="comment">
					<van-icon name="comment" />&nbsp;345
				</div>
			</div>
		</div>

		<p>{{detailitem.name}}</p>
	</div>
</template>
<script>
export default {
	props: ['detailitem']
}
</script>
<style lang="less">
.detail {
	p {
		font-size: 3.333vw;
	}
	.pic {
		position: relative;
		.pl {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 5.556vw;
			color: white;
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
			.bfnum {
				position: absolute;
				left: 0;
				bottom: 0;
				font-size: 3.611vw;
			}
			.comment {
				position: absolute;
				right: 0;
				bottom: 0;
				font-size: 3.611vw;
			}
		}
	}
}
</style>