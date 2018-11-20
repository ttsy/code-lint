// 运行检测命令的目录
const lintCMDPath = process.env.INIT_CWD;

module.exports = [
  `!${lintCMDPath}/**/node_modules/**/*.js`,
  `!${lintCMDPath}/**/node_modules/**/*.vue`,
  `!${lintCMDPath}/**/dist/**/*.js`,
  `!${lintCMDPath}/**/vendor/**/*.js`,
  `!${lintCMDPath}/**/*.min.js`
]
