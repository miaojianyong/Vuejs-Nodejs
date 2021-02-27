<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="物品图标">
        <!-- 自定义显示的内容 -->
        <template slot-scope="scope">
          <!-- scope.row 表示该行数据  icon 表示物品图片 -->
          <img :src="scope.row.icon" style="height: 3rem;">
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
              @click="CategoryListEdit(scope.row)"><!-- $router.push(`/categories/edit/${scope.row._id}`) -->
            编辑
          </el-button>
          <!-- scope.row 表示对应一行的数据 -->
          <el-button type="text" size="small"
              @click="remove(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: [], // 保存列表数据
      }
    },
    methods: { // 定义方法，方便在其他位置调用
      async fetch() { // 获取物品列表数据
        const res = await this.$http.get('rest/items');
        this.items = res.data;
      },
      CategoryListEdit(row) { // 点击编辑按钮 页面跳转
        this.$router.push(`/items/edit/${row._id}`);
      },
      // 删除列表方法实现
      async remove(row) { // row 表示要删除行的数据
        this.$confirm(`是否确定要删除该分类："${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 网络请求
          const res = await this.$http.delete(`rest/items/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 重新获取数据分类列表数据
          this.fetch(); // 调用上述定义的方法
        })
      }
    },
    created() { // 生命周期函数，当组件创建后就会回调该函数
      // 即该组件/页面 默认进来要做的事情
      // 1. 获取数据
      this.fetch(); // 组件创建成功就调用上述的方法
    }
  }
</script>