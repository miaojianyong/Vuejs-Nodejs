<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}物品</h1>
		<el-form label-width="120px" 
				@submit.native.prevent="save">
			<!-- 新建物品 -->
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			<el-form-item label="图标">
				<!-- :action 表示上传的图片地址
				$http.defaults 表示默认参数，baseURL 默认参数是这个(http.js里的)
				故选择图标后显示的地址为：http://localhost:3000/admin/api/upload
				:on-success 表示上传成功后做的事情 
				里面的方法 表示把返回的值赋值给model.icon，即图片地址-->
				<el-upload
					class="avatar-uploader"
					:action="$http.defaults.baseURL + '/upload'"
					:show-file-list="false"
					:on-success="afterUpload">
					<!-- 如果有上传的图片就显示 该图片地址 -->
					<img v-if="model.icon" :src="model.icon" class="avatar">
					<!-- 没有上传的图片就显示 上传的图片的图标 -->
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
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
				// 给上述model赋值属性 vue的添加属性的语法
				// this.model表示给谁设置属性
				// 'icon' 表示设置的属性是什么
				// res.url 表示设置的属性的值是什么
				this.$set(this.model, 'icon', res.url);
				// this.model.icon = res.url;
			},
			async save() {
				let res // 定义变量
				if (this.id) { // 如果有id参数
					res = await this.$http.put(`rest/items/${this.id}`, this.model);
				} else { // 如果没有id参数
					res = await this.$http.post('rest/items', this.model);
				}
				this.$router.push('/items/list');// 物品数据创建完成后，跳转到物品列表
				this.$message({ // 提示信息
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch() { // 请求数据 获取输入框中的数据
				const res = await this.$http.get(`rest/items/${this.id}`);
				this.model = res.data; // 把获取的数据给上述model
			}
		},
		created() { // 组件创建成功 就执行的代码
			// 获取输入框数据 即如果有id参数，才执行后面的方法
			this.id && this.fetch(); // 调用上述获取输入框中的数据
		}
	}
</script>
