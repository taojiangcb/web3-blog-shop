module.exports = {
  // 匹配测试文件的模式，支持以 .spec.ts, .test.ts, .spec.tsx, .test.tsx 结尾的文件
  testMatch: ['**/?(*.)(spec|test).ts?(x)'],

  // 测试环境准备时会执行的脚本文件，通常用于配置全局环境或引入 polyfills
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],

  // 项目根目录，Jest 会以此为基准解析路径
  rootDir: '',

  // 指定文件转换器，这里使用 @swc/jest 来处理 TypeScript 和 TSX 文件
  transform: {
    '.(ts|tsx)': '@swc/jest', // 使用 SWC 作为 TypeScript 转换工具
  },

  // 模块路径别名，用于简化模块引入
  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/utils$1', // 将 @utils 映射到 src/utils 目录
  },

  // 设置代码覆盖率的阈值，如果未达到阈值测试将失败
  coverageThreshold: {
    global: {
      branches: 50, // 分支覆盖率要求 50%
      functions: 95, // 函数覆盖率要求 95%
      lines: 95, // 行覆盖率要求 95%
      statements: 95, // 语句覆盖率要求 95%
    },
  },


  // 是否收集代码覆盖率
  collectCoverage: true,
  // 代码覆盖率输出的目录
  coverageDirectory: './docs/jest-coverage',
  // 指定忽略覆盖率统计的路径
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  // Jest 支持的文件扩展名
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
};
