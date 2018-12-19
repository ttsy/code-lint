
// const extend = require('extend');
const finalLintConfigJson = require('./config/lint.config');

const eslintConfig = {
  root: true,
  parser: "babel-eslint",
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
  rules: finalLintConfigJson.eslint.rules
}

module.exports = eslintConfig;
