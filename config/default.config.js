// 默认配置
module.exports = {
  "lintTargetFiles": [ // 检测目标文件（可选）
    // "**/*.html",
    // "**/*.vue",
    // "**/*.js",
    // "**/*.css",
    // "**/*.scss",
    // "**/*.less",
    // "!**/ignore/*.js"
  ],
  "ignoreFiles":[], // 检测忽略文件（可选）
  "lintType": { // 检测类型（可选）
    "js": true,
    "css": true
  },
  "eslint": { // eslint 配置规则（可选）
    "globals": { // 同 eslint globals 字段
      '$': false,
      'jQuery': false
    },
    "rules": { // 同 eslint rules 字段
      // // 不强制使用一致的缩进
      // 'indent': 'off',
      // // 不强制使用一致的反勾号、双引号或单引号
      // 'quotes': 'off',
      // // 不要求在语句末尾是否需要添加分号
      // 'semi': 'off',
      // // 不要求一定要使用 === 和 !==
      // 'eqeqeq': 'off',
      // // 不要求函数圆括号之前是否需要一个空格
      // 'space-before-function-paren': 'off',
      // // 不要求语句块之前是否需要空格
      // 'space-before-blocks': 'off',
      // // 不强制在关键字前后使用一致的空格
      // 'keyword-spacing': 'off',
      // // 不强制在对象字面量的键和值之间使用一致的空格
      // 'key-spacing': 'off',
      // // 允许行尾空格
      // 'no-trailing-spaces': 'off',
      // // 允许 arguments.caller 或 arguments.callee
      // 'no-caller': 'off',
      // // 允许 new 创建对象实例后不赋值给变量
      // 'no-new': 'off',
      // // 允许不必要的转义
      // 'no-useless-escape': 'off'
    }
  },
  "stylelint": { // stylelint 配置规则（可选）
    "rules": { // 同 stylelint rules 字段
      // // at-rule 名后面必须有一个空格
      // "at-rule-name-space-after": "always",
      // // 开始大括号前不限制是否需要空格
      // "block-opening-brace-space-before": null,
      // // 不限制颜色十六进制值长短模式
      // "color-hex-length": null,
      // // 不限制冒号后是否需要空格
      // "declaration-colon-space-after": null,
      // // 不限制 function 逗号后的新行格式
      // "function-comma-newline-after": null,
      // // 不限制缩进
      // "indentation": null,
      // // 规则块间不允许空行
      // "rule-empty-line-before": ["never"]
    }
  }
}
