<template>
	<div :key="avkey">
		<navbar />
		<div class="detail_info" v-if="model">
			<div class="video">
				<video controls="controls" :src="model.content" :poster="model.img"></video>
				<div class="nameTable">
					<van-collapse v-model="active">
						<van-collapse-item name="1">
							<template #title>
								<div>
									<van-button
										:plain="true"
										size="mini"
										color="pink"
										v-if="model.category!=undefined"
										to="/"
									>{{model.category.title}}</van-button>
									{{model.name}}
									<van-icon name="question-o" />
								</div>
							</template>
							<div class="video_detail">
								<div class="simple_detail">
									<span v-if="model.userinfo!=undefined">{{model.userinfo.name}}</span>
									<span>11451次观看</span>
									<span>11451条弹幕</span>
									<span>{{model.date}}</span>
								</div>
							</div>
						</van-collapse-item>
					</van-collapse>
					<div class="smbox">
						<span @click="collectclick">
							<van-icon class="icon" name="star" :color="scclick==false?'inherit':'pink'" />收藏
						</span>

						<span @click="gzclick">
							<van-icon class="icon" name="send-gift" :color="hcclick==false?'inherit':'pink'" />关注
						</span>
						<span @click="dzclick=!dzclick">
							<van-icon class="icon" name="good-job" :color="dzclick==false?'inherit':'pink'" />点赞
						</span>
					</div>
				</div>
			</div>
			<div class="detailparent">
				<detail
					class="detailitem"
					:detailitem="catitem"
					v-for="(catitem, catindex) in commendList"
					:key="catindex"
				/>
			</div>
			<articles />
		</div>
	</div>
</template>
<script>
import Navbar from '@/components/common/NavBar'
import detail from '@/components/homeComponents/detail'
import articles from '@/components/article/common'
export default {
	data() {
		return {
			model: null, //视频信息
			active: [],
			scclick: false,
			hcclick: false,
			dzclick: false,
			commendList: null, //推荐列表
			myUseritem: null, //自己用户信息
			avkey: 1
		}
	},
	watch: {
		$route() {
			this.avkey++
			this.articleItemData()
			this.commenddata()
			this.collectInit()
			this.gzInit()
			console.log('lu变化' + this.avkey)
		}
	},
	components: {
		Navbar,
		detail,
		articles
	},
	methods: {
		async commenddata() {
			const res = await this.$http.get('/commend')
			this.commendList = res.data
		},
		async articleItemData() {
			const res = await this.$http.get(
				'/article/' + this.$route.params.id
			)

			this.model = res.data[0]
			if (this.model) {
				this.gzInit()
			}
		},
		async collectInit() {
			if (localStorage.getItem('token')) {
				const res = await this.$http.get(
					'/collection/' + localStorage.getItem('id'),
					{
						params: {
							article_id: this.$route.params.id
						}
					}
				)
				// console.log(res.data.success)
				if (res.data.success == false) {
					this.scclick = false
				} else {
					this.scclick = true
				}
			}
		},
		async gzInit() {
			if (localStorage.getItem('token')) {
				const res = await this.$http.get(
					'/sub_scription/' + localStorage.getItem('id'),
					{
						sub_id: this.model.userid
					}
				)
				console.log(res)
				if (res.data.msg == '失败') {
					this.hcclick = false
				} else {
					this.hcclick = true
				}
			}
		},
		async collectclick() {
			this.scclick = !this.scclick
			if (localStorage.getItem('token')) {
				const res = await this.$http.post(
					'/collection/' + localStorage.getItem('id'),
					{
						article_id: this.$route.params.id
					}
				)
				this.$msg.fail(res.data.msg)
			}
		},
		async gzclick() {
			this.hcclick = !this.hcclick
			if (localStorage.getItem('token')) {
				const res = await this.$http.post(
					'/sub_scription/' + localStorage.getItem('id'),
					{
						sub_id: this.model.userid
					}
				)
				this.$msg.fail(res.data.msg)
			}
		}
	},
	created: function() {
		console.log('create触发')
		this.articleItemData()
		this.commenddata()
		this.collectInit()
	}
}
</script>
<style lang="less">
.detail_info {
	background-color: white;
	.video {
		width: 100%;
		video {
			width: 100%;
		}
	}
	.van-button__text {
		font-size: 15px;
	}
	.nameTable {
		.video_detail {
			.simple_detail {
				display: flex;
				span:nth-child(1) {
					font-size: 15px;
					color: black;
				}
				span {
					font-size: 11px;
					padding: 0 10px;
					flex: 1;
				}
			}
		}
		.smbox {
			margin: 10px 0;
			.icon {
				position: relative;
				top: 2px;
				font-size: 18px;
			}
			span {
				color: #757575;
				font-size: 14px;
				padding: 10px;
			}
		}
	}
	.detailparent {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.detailitem {
			margin-bottom: 10px;
			width: 45%;
		}
	}
}
</style>