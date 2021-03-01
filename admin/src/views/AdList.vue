<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
              @click="CategoryListEdit(scope.row)">编辑
          </el-button>
          <el-button type="text" size="small"
              @click="remove(scope.row)">删除
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
      async fetch() {
        const res = await this.$http.get('rest/ads');
        this.items = res.data;
      },
      // 点击编辑按钮 页面跳转
      CategoryListEdit(row) {
        this.$router.push(`/ads/edit/${row._id}`);
      },
      async remove(row) {
        this.$confirm(`是否确定要删除："${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => { // 网络请求
          const res = await this.$http.delete(`rest/ads/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch(); // 调用上述定义的方法 重新获取数据分类列表数据
        }).catch(e=>e);
        /* 上述.catch(e=>e); 解决前端页面报的Uncaught (in promise) cancel错误 */
      }
    },
    created() { // 生命周期函数，当组件创建后就会回调该函数
      this.fetch(); // 组件创建成功就调用上述的方法
    }
  }
</script>