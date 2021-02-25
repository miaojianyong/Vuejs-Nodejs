<template>
	<div>
		<!-- 如地址栏有参数就进入分类编辑页面，如没有就算新建分类页面
		即判定是否有id参数 来决定显示的名称 -->
		<h1>{{id ? '编辑' : '新建'}}分类</h1>
		<!-- label-width 表示横向显示
		@submit 即点击保存时执行的保存事件
		native 原生的表单 prevent 表示阻止默认提交不要跳转页面 -->
		<el-form label-width="120px" 
				@submit.native.prevent="save">
			<el-form-item label="名称">
				<!-- v-model实现双向绑定数据 -->
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
				model: {} // 输入框中的数据
			}
		},
		methods: {
			async save() {
				let res // 定义变量
				// categories表示分类数据的路由
				// this.model 即上述data中保存的输入框中的数据
				if (this.id) { // 如果有id参数
					// 给服务器端 传递id参数
					res = await this.$http.put(`categories/${this.id}`, this.model);
				} else { // 如果没有id参数
					// 没有id参数 即是新增 就是新建分类
					res = await this.$http.post('categories', this.model);
				}
				// 分类数据创建完成后，跳转到分类列表
				this.$router.push('/categories/list');
				// 提示信息
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch() { // 请求数据 获取输入框中的数据
				const res = await this.$http.get(`categories/${this.id}`);
				this.model = res.data; // 把获取的数据给上述model
			}
		},
		created() { // 组件创建成功 就执行的代码
			// 获取输入框数据 即如果有id参数，才执行后面的方法
			this.id && this.fetch(); // 调用上述获取输入框中的数据
		}
	}
</script>
