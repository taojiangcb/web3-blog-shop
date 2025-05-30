const packJosn = require('./package.json');

module.exports = {
  apps: [
    {
      // 应用名称
      name: packJosn.name,
      // 使用 ts-node 执行 TypeScript 文件
      script: 'node_modules/ts-node/dist/bin.js',  // 修改这里
      // 指定运行的文件和 ts-node 参数
      args: '-P tsconfig.json src/app.ts',  // 修改这里，使用相对路径
      // 应用程序所在的目录
      cwd: './',
      // 内存超限重启
      max_memory_restart: '1G',
      // 自动重启
      autorestart: true,
      // 开启监听模式（默认关闭，开发时可以设为 true）
      watch: true,
      // 忽略监听的文件夹
      ignore_watch: ['node_modules', 'logs', '.git'],
      // 日志配置
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,

      // 环境变量配置
      env_dev: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080
      }
    }
  ]
}