<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}广告位</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			<el-form-item label="广告">
				<el-button size="small" @click="model.items.push({})">
					<i class="el-icon-plus"></i> 添加广告
				</el-button>
					<el-row type="flex" style="flex-wrap: wrap;">
						<!-- :md="24" 表示全宽即一行显示一条 -->
						<el-col :md="24" v-for="(item, i) in model.items" :key="i">
							<el-form-item label="跳转链接(URL)">
								<el-input v-model="item.url"></el-input>
							</el-form-item>
							<el-form-item label="图片" style="margin-top: 0.5rem;">
								<el-upload
									class="avatar-uploader"
									:action="$http.defaults.baseURL + '/upload'"
									:show-file-list="false"
									:on-success="res => $set(item, 'image', res.url)">
									<img v-if="item.image" :src="item.image" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="danger"
								@click="model.items.splice(i, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		props: { // 接收参数
			id: {} // 接收地址栏中传递来的id参数
		},
		data() {
			return {
				model: {
					items: [], // 存放多个广告数据
				},
			}
		},
		methods: {
			async save() {
				let res // 定义变量
				if (this.id) { // 如果有id参数
					res = await this.$http.put(`rest/ads/${this.id}`, this.model);
				} else { // 如果没有id参数
					res = await this.$http.post('rest/ads', this.model);
				}
				this.$router.push('/ads/list');
				this.$message({ 	// 提示信息
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch() { // 请求数据 获取输入框中的数据
				const res = await this.$http.get(`rest/ads/${this.id}`);
				this.model = Object.assign({}, this.model, res.data);
			},
		},
		created() { // 组件创建成功 就执行的代码
			this.id && this.fetch(); // 调用上述获取输入框中的数据
		}
	}
</script>
