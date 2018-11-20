// 运行检测命令的目录
const lintCMDPath = process.env.INIT_CWD;

module.exports = [
  `!${lintCMDPath}/**/node_modules/**/*.scss`,
  `!${lintCMDPath}/**/node_modules/**/*.vue`,
  `!${lintCMDPath}/**/vendor/**/*.scss`,
  `!${lintCMDPath}/**/*.min.scss`
]
