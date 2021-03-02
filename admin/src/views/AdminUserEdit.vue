<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}管理员</h1>
		<el-form label-width="120px" 
				@submit.native.prevent="save">
			<el-form-item label="用户名">
				<el-input v-model="model.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" v-model="model.password"></el-input>
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
			id: {}
		},
		data() {
			return {
				model: {},
			}
		},
		methods: {
			afterUpload(res) { // res是服务器端响应的数据
				this.$set(this.model, 'icon', res.url);
			},
			async save() {
				let res // 定义变量
				if (this.id) { // 如果有id参数
					res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
				} else { // 如果没有id参数
					res = await this.$http.post('rest/admin_users', this.model);
				}
				this.$router.push('/admin_users/list');// 物品数据创建完成后，跳转到物品列表
				this.$message({ // 提示信息
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch() { // 请求数据 获取输入框中的数据
				const res = await this.$http.get(`rest/admin_users/${this.id}`);
				this.model = res.data; // 把获取的数据给上述model
			}
		},
		created() { // 组件创建成功 就执行的代码
			// 获取输入框数据 即如果有id参数，才执行后面的方法
			this.id && this.fetch(); // 调用上述获取输入框中的数据
		}
	}
</script>
