

const extend = require('extend');
const finalLintConfigJson = require('./config/lint.config');

const stylelintConfig = {
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-scss"
  ],
  "rules": extend({
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true
  },finalLintConfigJson.stylelint.rules)
}

module.exports = stylelintConfig;
