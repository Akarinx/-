<template>
	<div class="home">
		<nav-bar />
		<van-tabs v-model="active" swipeable>
			<van-tab v-for="(item, index) in category" :key="index" :title="item.title">
				<van-list
					v-model="item.loading"
					:immediate-check="false"
					:finished="item.finished"
					finished-text="没有更多了"
					@load="onLoad"
				>
					<div class="detailparent">
						<detail
							class="detailitem"
							:detailitem="catitem"
							v-for="(catitem, catindex) in item.list"
							:key="catindex"
						/>
					</div>
				</van-list>
			</van-tab>
		</van-tabs>
	</div>
</template>
<script>
import detail from '@/components/homeComponents/detail'
import NavBar from '@/components/common/NavBar'

export default {
	data() {
		return {
			category: [],
			active: 0
		}
	},
	components: {
		NavBar,
		detail
	},
	methods: {
		async selectCatagory() {
			//获取列表
			let res = await this.$http.get('/category')
			this.changeCategory(res.data)
		},
		changeCategory(data) {
			//对获取的数据添加属性
			data.forEach(item => {
				;(item.list = []),
					(item.page = 0),
					(item.pagesize = 10),
					(item.loading = false),
					(item.finished = false)
			})
			this.category = data
			this.selectArticle()
		},
		async selectArticle() {
			//获取对应列表内容
			const categoryitem = this.categoryItem()
			let res = await this.$http.get('/detail/' + categoryitem._id, {
				params: {
					page: categoryitem.page,
					pagesize: categoryitem.pagesize
				}
			})
			categoryitem.list.push(...res.data)
			categoryitem.loading = false
			if (res.data.length < categoryitem.pagesize)
				categoryitem.finished = true
		},
		categoryItem() {
			//确认当前列表
			const categoryitem = this.category[this.active]
			return categoryitem
		},
		onLoad() {
			const categoryitem = this.categoryItem()
			categoryitem.page += 1
			this.selectArticle()
		}
	},
	watch: {
		active() {
			this.selectArticle()
		}
	},
	created() {
		this.selectCatagory()
	}
}
</script>
<style lang="less">
.home {
	background-color: white;
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