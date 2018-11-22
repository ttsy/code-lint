
const finalLintConfigJson = require('./config/lint.config');

const stylelintConfig = {
  "extends": "stylelint-config-standard",
  "rules": finalLintConfigJson.stylelint.rules
}

module.exports = stylelintConfig;
