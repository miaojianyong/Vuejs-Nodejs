<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <!-- prop 表示获取数据库中的数据
      prop="_id" 表示数据创建后在数据库默认生成的id 
      prop="name" 表示数据的name字段，name是创建分类模型时编写的-->
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <!-- type="text"表示普通文本链接 type="primary" 表示按钮
          @click 监听点击 后面内容是页面的跳转
          scope.row表示每一行对应的数据的id-->
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
      async fetch() {
        // 获取接口传递来的数据
        // get请求(categories)接口的地址
        const res = await this.$http.get('rest/categories');
        // 把数据给上述data中保存的列表数据
        this.items = res.data;
      },
      // 点击编辑按钮 页面跳转
      CategoryListEdit(row) {
        // 页面跳转到 编辑分类 页面
        // `/categories/edit/${row._id}`表示地址栏中的地址
        this.$router.push(`/categories/edit/${row._id}`);
      },
      // 删除列表方法实现
      // row 表示要删除行的数据
      async remove(row) {
        // 在
        this.$confirm(`是否确定要删除该分类："${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 网络请求
          const res = await this.$http.delete(`rest/categories/${row._id}`)
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