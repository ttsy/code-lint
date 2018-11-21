// 运行检测命令的目录
const lintCMDPath = process.env.INIT_CWD;

module.exports = [
  `!${lintCMDPath}/**/node_modules/**/*.html`,
  `!${lintCMDPath}/**/node_modules/**/*.vue`,
  `!${lintCMDPath}/**/node_modules/**/*.js`,
  `!${lintCMDPath}/**/dist/**/*.html`,
  `!${lintCMDPath}/**/dist/**/*.js`,
  `!${lintCMDPath}/**/vendor/**/*.html`,
  `!${lintCMDPath}/**/vendor/**/*.js`,
  `!${lintCMDPath}/**/*.min.js`
]
