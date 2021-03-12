<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}英雄</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<!-- value="basic" 表示默认显示对应下的name中的参数 -->
			<el-tabs type="border-card" value="basic">
				<el-tab-pane label="基本信息" name="basic">
					<!-- 新建英雄 -->
					<el-form-item label="名称">
						<el-input v-model="model.name"></el-input>
					</el-form-item>
					<el-form-item label="称号">
						<el-input v-model="model.title"></el-input>
					</el-form-item>
					<el-form-item label="头像">
						<el-upload
							class="avatar-uploader"
							:action="uploadUrl"
							:headers="getAuthHeaders()"
							:show-file-list="false"
							:on-success="res => $set(model, 'avatar', res.url)">
							<!-- 如果有上传的图片就显示 该图片地址 -->
							<img v-if="model.avatar" :src="model.avatar" class="avatar">
							<!-- 没有上传的图片就显示 上传的图片的图标 -->
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<!-- 英雄图片 即英雄效果宣传图 -->
					<el-form-item label="Banner">
						<el-upload
							class="avatar-uploader"
							:action="uploadUrl"
							:headers="getAuthHeaders()"
							:show-file-list="false"
							:on-success="res => $set(model, 'banner', res.url)"> <!-- 把上传的图片显示在页面中 -->
							<img v-if="model.banner" :src="model.banner" class="avatar">
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
				</el-tab-pane>
				<el-tab-pane label="技能" name="skills">
					<!-- type="text" 表示按钮的样式是文字形式 即没有边框
						el-icon-plus 表示 + 号小图标 -->
					<el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
					<!-- 类型是flax布局 样式是换行 -->
					<el-row type="flex" style="flex-wrap: wrap;">
						<!-- :md="12"表示把一行分为两份
						model.skills 表示该英雄的所有技能 -->
						<el-col :md="12" v-for="(item, i) in model.skills"
							:key="i">
							<el-form-item label="名称">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="图标">
								<!-- :on-success即上传成功后做的事情 接收一个函数
								"res => $set(item, 'icon', res.url)" 把接收到的url赋值给icon -->
								<el-upload
									class="avatar-uploader"
									:action="uploadUrl"
									:headers="getAuthHeaders()"
									:show-file-list="false"
									:on-success="res => $set(item, 'icon', res.url)">
									<img v-if="item.icon" :src="item.icon" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="冷却值">
								<el-input v-model="item.delay"></el-input>
							</el-form-item>
							<el-form-item label="消耗">
								<el-input v-model="item.cost"></el-input>
							</el-form-item>
							<el-form-item label="描述">
								<el-input v-model="item.description" type="textarea"></el-input>
							</el-form-item>
							<el-form-item label="小提示">
								<el-input v-model="item.tips" type="textarea"></el-input>
							</el-form-item>
							<el-form-item>
								<!-- splice 删除数组中的元素 -->
								<el-button size="small" type="danger"
								@click="model.skills.splice(i, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<!-- 英雄关系 -->
				<el-tab-pane label="最佳搭档" name="partners">
					<el-button size="small" @click="model.partners.push({})"><i class="el-icon-plus"></i> 添加英雄</el-button>
					<el-row type="flex" style="flex-wrap: wrap;">
						<el-col :md="12" v-for="(item, i) in model.partners" :key="i">
							<el-form-item label="英雄">
								<!-- 选择英雄  filterable 表示可在下拉菜单搜索数据 -->
								<el-select filterable v-model="item.hero">
									<!-- 循环下拉菜单中的英雄选项 -->
									<el-option v-for="hero in heroes" :key="hero._id"
									:value="hero._id" :label="hero.name"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="描述">
								<el-input v-model="item.description" type="textarea"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="danger"
								@click="model.partners.splice(i, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<el-form-item style="margin-top: 1rem;">
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
					// 存放英雄的技能 否则在新建英雄的技能页面会报错 即找不到push
					skills: [], // 技能
					partners: [], // 搭档
					heroes: [], // 存放搭档的英雄
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
			/* afterUpload(res) { // res是服务器端响应的数据
				// this.$set(this.model, 'avatar', res.url);
				// 上述data中的model中定义了属性就可用下述方法赋值
				this.model.avatar = res.url;
			}, */
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
			},
			async fetchHeroes() { // 请求数据 获取下拉菜单中的搭档英雄数据
				const res = await this.$http.get(`rest/heroes`);
				this.heroes = res.data; // 把获取的数据给上述model
			}
		},
		created() { // 组件创建成功 就执行的代码
			// 获取输入框数据 即如果有id参数，才执行后面的方法
			this.id && this.fetch(); // 调用上述获取输入框中的数据
			this.fetchCategories(); // 执行上述获取英雄分类数据方法 
			this.fetchItems(); // 执行上述获取英雄装备数据方法
			this.fetchHeroes();
		}
	}
</script>
<style>
	.el-input--suffix .el-input__inner {
		padding-right: 0;
	}
</style>