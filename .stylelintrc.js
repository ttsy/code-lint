
const extend = require('extend');
const finalLintConfigJson = require('./config/lint.config');

const stylelintConfig = {
  "extends": "stylelint-config-standard",
  "rules": extend({
    // at-rule 名后面必须有一个空格
    "at-rule-name-space-after": "always",
    // 开始大括号前不限制是否需要空格
    "block-opening-brace-space-before": null,
    // 不限制颜色十六进制值长短模式
    "color-hex-length": null,
    // 不限制冒号后是否需要空格
    "declaration-colon-space-after": null,
    // 不限制 function 逗号后的新行格式
    "function-comma-newline-after": null,
    // 不限制缩进
    "indentation": null,
    // 规则块间不允许空行
    "rule-empty-line-before": ["never"],
  }, finalLintConfigJson.stylelint.rules),
}

module.exports = stylelintConfig;
