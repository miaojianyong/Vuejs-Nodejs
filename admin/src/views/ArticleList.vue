<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
              @click="CategoryListEdit(scope.row)"><!-- $router.push(`/categories/edit/${scope.row._id}`) -->
            编辑
          </el-button>
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
      async fetch() { // 获取接口传递来的数据
        const res = await this.$http.get('rest/articles');
        this.items = res.data;
      },
      CategoryListEdit(row) { // 点击编辑按钮 页面跳转
        this.$router.push(`/articles/edit/${row._id}`);
      },
      async remove(row) { // 删除列表方法实现
        this.$confirm(`是否确定要删除文章："${row.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => { // 网络请求
          const res = await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch(); // 调用上述定义的方法 重新获取数据
        })
      }
    },
    created() { // 生命周期函数，当组件创建后就会回调该函数
      this.fetch(); // 获取数据 组件创建成功就调用上述的方法
    }
  }
</script>