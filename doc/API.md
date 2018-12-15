# API

## 规则

### js 检测规则

eslint rules：
[https://cn.eslint.org/docs/rules/](https://cn.eslint.org/docs/rules/)

检测规则继承 eslint-config-standard 中的规则，并根据自身项目需要添加自定义规则。

eslint-config-standard：[https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)

自定义 eslint 规则：
[.eslintrc.js](./.eslintrc.js)

### css 检测规则

css 检测包含了 css、scss、less 的检测

stylelint rules：
[https://stylelint.io/user-guide/rules/](https://stylelint.io/user-guide/rules/)

检测规则继承 stylelint-config-standard 中的规则，并根据自身项目需要添加自定义规则。

stylelint-config-standard：[https://github.com/stylelint/stylelint-config-standard/blob/master/index.js](https://github.com/stylelint/stylelint-config-standard/blob/master/index.js)

自定义 stylelint 规则：
[.stylelintrc.js](./.stylelintrc.js)

## 配置文件

配置文件需放在根目录下，命名为 lint.config.json。仅在 localdiff 检测下允许不需要配置文件。

默认配置及配置字段说明
[default.lint.config.js](./config/default.lint.config.js)

## 忽略文件

js 检测默认忽略文件
[eslintignore.js](./lintIgnore/eslintignore.js)

css 检测默认忽略文件
[stylelintignore.js](./lintIgnore/stylelintignore.js)

## 命令

``` bash
# 定向检测
code-lint
# localdiff 检测
code-lint --localdiff
# 定向修复
code-lint --fix
# localdiff 修复
code-lint --localdiff --fix
# 查看版本号
code-lint -v
code-lint --version
```