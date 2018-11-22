const extend = require('extend');
const finalLintConfigJson = require('./config/lint.config');

const eslintConfig = {
  root: true,
  env: {
    browser: true,
  },
  globals: finalLintConfigJson.eslint.globals,
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
    'standard'
  ],
  plugins: [
    'html'
  ],
  rules: extend({
    // 不强制使用一致的缩进
    'indent': 'off',
    // 不强制使用一致的反勾号、双引号或单引号
    'quotes': 'off',
    // 不要求在语句末尾是否需要添加分号
    'semi': 'off',
    // 不要求一定要使用 === 和 !==
    'eqeqeq': 'off',
    // 不要求函数圆括号之前是否需要一个空格
    'space-before-function-paren': 'off',
    // 不要求语句块之前是否需要空格
    'space-before-blocks': 'off',
    // 不强制在关键字前后使用一致的空格
    'keyword-spacing': 'off',
    // 不强制在对象字面量的键和值之间使用一致的空格
    'key-spacing': 'off',
    // 允许行尾空格
    'no-trailing-spaces': 'off',
    // 允许 arguments.caller 或 arguments.callee
    'no-caller': 'off',
    // 允许 new 创建对象实例后不赋值给变量
    'no-new': 'off',
    // 允许不必要的转义
    'no-useless-escape': 'off'
  }, finalLintConfigJson.eslint.rules)
}

module.exports = eslintConfig;
