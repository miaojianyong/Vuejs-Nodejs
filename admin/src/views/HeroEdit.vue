<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}英雄</h1>
		<el-form label-width="120px" 
				@submit.native.prevent="save">
			<!-- 新建物品 -->
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			<el-form-item label="称号">
				<el-input v-model="model.title"></el-input>
			</el-form-item>
			<el-form-item label="头像">
				<el-upload
					class="avatar-uploader"
					:action="$http.defaults.baseURL + '/upload'"
					:show-file-list="false"
					:on-success="afterUpload">
					<!-- 如果有上传的图片就显示 该图片地址 -->
					<img v-if="model.avatar" :src="model.avatar" class="avatar">
					<!-- 没有上传的图片就显示 上传的图片的图标 -->
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="类型">
				<!-- multiple 表示可多选下菜单中的功能 -->
				<el-select v-model="model.categories" multiple>
					<!-- 下拉菜单中的选项 要去关联的分类模型中查找 -->
					<el-option v-for="item in categories" 
					:label="item.name" :value="item._id" :key="item._id"></el-option>
				</el-select>
			</el-form-item>
			<!-- 评分 -->
			<el-form-item label="难度">
				<!-- :max="10" 表示会显示10个星
				show-score 在星的后面显示分数值
			  style 样式 即设置星在页面中显示的位置 -->
				<el-rate 
				:max="10" show-score style="margin-top: 0.6rem;"
				v-model="model.scores.difficult"></el-rate>
			</el-form-item>
			<el-form-item label="技能">
				<el-rate 
				:max="10" show-score style="margin-top: 0.6rem;"
				v-model="model.scores.skills"></el-rate>
			</el-form-item>
			<el-form-item label="攻击">
				<el-rate 
				:max="10" show-score style="margin-top: 0.6rem;"
				v-model="model.scores.attack"></el-rate>
			</el-form-item>
			<el-form-item label="生存">
				<el-rate 
				:max="10" show-score style="margin-top: 0.6rem;"
				v-model="model.scores.survive"></el-rate>
			</el-form-item>
			<el-form-item label="顺风出装">
				<el-select v-model="model.items1" multiple>
					<el-option v-for="item in items" 
					:label="item.name" :value="item._id" :key="item._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="逆风出装">
				<el-select v-model="model.items2" multiple>
					<el-option v-for="item in items" 
					:label="item.name" :value="item._id" :key="item._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="使用技巧">
				<el-input type="textarea" v-model="model.usageTips"></el-input>
			</el-form-item>
			<el-form-item label="对抗技巧">
				<el-input type="textarea" v-model="model.battleTips"></el-input>
			</el-form-item>
			<el-form-item label="团战思路">
				<el-input type="textarea" v-model="model.teamTips"></el-input>
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
				categories: [], // 存放英雄分类数据 下拉菜单中数据
				items: [], // 存放英雄出装数据 下拉菜单中数据
				model: { // 新建英雄是存放的数据
					name: '', // 名称
					avatar: '', // 头像
					scores: { // 英雄评分
						difficult: 0, // 难度默认是0分
						skills: 0, // 技能
						attack: 0, // 攻击
						survive: 0, // 生存
					}, 
				},
			}
		},
		methods: {
			afterUpload(res) { // res是服务器端响应的数据
				// this.$set(this.model, 'avatar', res.url);
				// 上述data中的model中定义了属性就可用下述方法赋值
				this.model.avatar = res.url;
			},
			async save() {
				let res // 定义变量
				if (this.id) { // 如果有id参数
					res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
				} else { // 如果没有id参数
					res = await this.$http.post('rest/heroes', this.model);
				}
				this.$router.push('/heroes/list');// 物品数据创建完成后，跳转到物品列表
				this.$message({ // 提示信息
					type: 'success',
					message: '保存成功'
				})
			},
			async fetch() { // 请求数据 获取输入框中的数据
				const res = await this.$http.get(`rest/heroes/${this.id}`);
				/* Object.assign 表示给上述model赋值的方式 这样保证不会找不到上述字段而报错
				1>数据可以是{} 2>可以是上述model的数据 3>可以是服务器返回的数据res.data */
				this.model = Object.assign({}, this.model, res.data);
			},
			async fetchCategories() { // 请求数据 获取下拉菜单中的英雄分类数据
				const res = await this.$http.get(`rest/categories`);
				this.categories = res.data; // 把获取的数据给上述model
			},
			async fetchItems() { // 请求数据 获取下拉菜单中的英雄装备数据
				const res = await this.$http.get(`rest/items`);
				this.items = res.data; // 把获取的数据给上述model
			}
		},
		created() { // 组件创建成功 就执行的代码
			// 获取输入框数据 即如果有id参数，才执行后面的方法
			this.id && this.fetch(); // 调用上述获取输入框中的数据
			this.fetchCategories(); // 执行上述获取英雄分类数据方法 
			this.fetchItems(); // 执行上述获取英雄装备数据方法
		}
	}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
