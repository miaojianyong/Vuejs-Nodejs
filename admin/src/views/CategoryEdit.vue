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
			<!-- 上级分类 -->
			<el-form-item label="上级分类">
				<!-- v-model实现双向绑定数据 -->
				<el-select v-model="model.parent">
					<!-- v-for 循环parents中的所有分类数据
					:key="itet._id" 使用v-for添加key增加vue的性能
					:label 显示的内容
					:value 选择时关联的id -->
					<el-option v-for="item in parents"
							:key="item._id" 
							:label="item.name"
							:value="item._id"></el-option>
				</el-select>
			</el-form-item>
			<!-- 新建分类 -->
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
				model: {}, // 输入框中的数据 保存的是分类id 即唯一性的东西
				parents: [], // 保存上级分类下拉菜单选项 
			}
		},
		methods: {
			async save() {
				let res // 定义变量
				// categories表示分类数据的路由
				// this.model 即上述data中保存的输入框中的数据
				if (this.id) { // 如果有id参数
					// 给服务器端 传递id参数
					res = await this.$http.put(`rest/categories/${this.id}`, this.model);
				} else { // 如果没有id参数
					// 没有id参数 即是新增 就是新建分类
					res = await this.$http.post('rest/categories', this.model);
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
				const res = await this.$http.get(`rest/categories/${this.id}`);
				this.model = res.data; // 把获取的数据给上述model
			},
			async fetchParents() { // 获取所有现有分类 即下拉菜单中的选项
				const res = await this.$http.get(`rest/categories`);
				this.parents = res.data; // 把获取的数据给上述parents
			}
		},
		created() { // 组件创建成功 就执行的代码
			// 执行上述定义的获取全部分类数据方法
			this.fetchParents();
			// 获取输入框数据 即如果有id参数，才执行后面的方法
			this.id && this.fetch(); // 调用上述获取输入框中的数据
		}
	}
</script>
