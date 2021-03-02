<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
            @click="CategoryListEdit(scope.row)"> 编辑 </el-button>
          <el-button type="text" size="small"
            @click="remove(scope.row)"> 删除 </el-button>
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
        const res = await this.$http.get('rest/admin_users');
        this.items = res.data;
      },
      CategoryListEdit(row) { // 点击编辑按钮 页面跳转
        this.$router.push(`/admin_users/edit/${row._id}`);
      },
      async remove(row) { // row 表示要删除行的数据
        this.$confirm(`是否确定要删除："${row.username}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {// 网络请求
          const res = await this.$http.delete(`rest/admin_users/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          
          this.fetch(); // 调用上述方法 重新获取数据分类列表数据
        })
      }
    },
    created() { // 生命周期函数，当组件创建后就会回调该函数
      this.fetch();
    }
  }
</script>