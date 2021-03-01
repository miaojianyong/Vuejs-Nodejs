<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}广告位</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
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
				model: {}, // 输入框中的数据 保存的是分类id 即唯一性的东西
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
				this.model = res.data; // 把获取的数据给上述model
			},
		},
		created() { // 组件创建成功 就执行的代码
			this.id && this.fetch(); // 调用上述获取输入框中的数据
		}
	}
</script>
