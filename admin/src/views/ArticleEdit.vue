<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}文章</h1>
		<el-form label-width="120px" 
				@submit.native.prevent="save">
			<el-form-item label="所属分类">
				<!-- 一篇文章可能属于多个分类故使用复数categories
				使用multiple 表示可以多选 -->
				<el-select v-model="model.categories" multiple>
					<el-option v-for="item in categories"
							:key="item._id" 
							:label="item.name"
							:value="item._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标题">
				<el-input v-model="model.title"></el-input>
			</el-form-item>
			<el-form-item label="详情">
				<!-- 使用富文本组件 -->
				<vue-editor v-model="model.body"
				useCustomImageHandler 
				@image-added="handleImageAdded"></vue-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	// 引用富文本编辑组件
	import { VueEditor } from 'vue2-editor';
	export default {
		props: { // 接收参数
			id: {} // 接收地址栏中传递来的id参数
		},
		components: { // 注册组件
			VueEditor,
		},
		data() {
			return {
				model: {}, // 输入框中的数据 保存的是分类id 即唯一性的东西
				categories: [], // 保存所属分类下拉菜单选项 
			}
		},
		methods: {
			// 处理富文本组件的图片上传
			async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
				const formData = new FormData(); // 提交表单数据
				// file对应我上传文件时名称 服务端接收的字段名也是file
				formData.append("file", file);
				// 发起请求
				const res = await this.$http.post('upload', formData);
				// Editor 表示编辑器对象 insertEmbed 插入元素
				// 1>cursorLocation光标位置 2>"image"插入的图片 3>图片地址
				Editor.insertEmbed(cursorLocation, "image", res.data.url);
				resetUploader(); // 重置上传器
    	},
			async save() {
				let res // 定义变量
				if (this.id) { // 如果有id参数
					res = await this.$http.put(`rest/articles/${this.id}`, this.model);
				} else { // 如果没有id参数
					res = await this.$http.post('rest/articles', this.model);
				}
				// 分类数据创建完成后，跳转到分类列表
				this.$router.push('/articles/list');
				// 提示信息
				this.$message({
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch() { // 请求数据 获取输入框中的数据
				const res = await this.$http.get(`rest/articles/${this.id}`);
				this.model = res.data; // 把获取的数据给上述model
			},
			async fetchCatgories() { // 获取所有现有分类 即下拉菜单中的选项
				const res = await this.$http.get(`rest/categories`);
				this.categories = res.data; // 把获取的数据给上述parents
			}
		},
		created() { // 组件创建成功 就执行的代码
			this.fetchCatgories();
			this.id && this.fetch(); // 调用上述获取输入框中的数据
		}
	}
</script>
