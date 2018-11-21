// 运行检测命令的目录
const lintCMDPath = process.env.INIT_CWD;

module.exports = [
  `!${lintCMDPath}/**/node_modules/**/*.html`,
  `!${lintCMDPath}/**/node_modules/**/*.vue`,
  `!${lintCMDPath}/**/node_modules/**/*.css`,
  `!${lintCMDPath}/**/node_modules/**/*.scss`,
  `!${lintCMDPath}/**/node_modules/**/*.less`,
  `!${lintCMDPath}/**/dist/**/*.html`,
  `!${lintCMDPath}/**/dist/**/*.css`,
  `!${lintCMDPath}/**/dist/**/*.scss`,
  `!${lintCMDPath}/**/dist/**/*.less`,
  `!${lintCMDPath}/**/vendor/**/*.html`,
  `!${lintCMDPath}/**/vendor/**/*.css`,
  `!${lintCMDPath}/**/vendor/**/*.scss`,
  `!${lintCMDPath}/**/vendor/**/*.less`,
  `!${lintCMDPath}/**/*.min.css`,
  `!${lintCMDPath}/**/*.min.scss`,
  `!${lintCMDPath}/**/*.min.less`
]
