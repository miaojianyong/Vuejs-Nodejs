module.exports = {
  //把打包的文件存放到server目录下的admin目录下
  outputDir: __dirname + '/../../server/admin',  
  // assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  // 配置访问该项目时要添加的路径
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}