
module.exports = {
  // "lintTargetFiles": [ // 检测目标文件（定向检测 必选）
  //   "**/*.html",
  //   "**/*.vue",
  //   "**/*.js",
  //   "**/*.css",
  //   "**/*.scss",
  //   "**/*.less",
  //   "!**/ignore/*.js"
  // ],
  "lintType": { // 检测类型（可选）
    "js": true,
    "css": true
  },
  "eslint": { // eslint 配置规则（可选）
    "globals": {
      '$': false,
      'jQuery': false
    },
    "rules":{}
  },
  "stylelint": { // stylelint 配置规则（可选）
    "rules": {}
  }
}
