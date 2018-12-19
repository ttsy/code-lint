# [code-lint](https://github.com/ttsy/code-lint)

基于 eslint、stylelint 的代码规范检测

## :star: 特性

- 基于 eslint 进行 js 代码规范检测
- 基于 stylelint 进行 css（含 css、scss、less） 代码规范检测
- 基于 stylelint-scss 对 scss 代码更加友好的规范检测
- 集成单元测试环境（mocha）

## :rocket: 使用者指南

通过 npm 下载安装

``` bash
npm install code-lint --save-dev
```

### 定向检测/修复

检测配置文件中配置的文件

- 在根目录 package.json 文件中加入检测命令 

```
"scripts": {
  "lint": "code-lint",
  "lint-fix": "code-lint --fix",
},
```

- 在根目录中加入配置文件，文件名为 lint.config.json，文件格式示例内容如下

```js
{
  "lintTargetFiles": [
    "**/*.html",
    "**/*.vue",
    "**/*.js",
    "**/*.css",
    "**/*.scss",
    "**/*.less",
    "!**/ignore/*.js"
  ]
}
```

lintTargetFiles 为检测目标文件，在前面加上 ! 则表示忽略检测的文件。

- 运行检测命令检测或修复

``` bash
npm run lint
或
npm run lint-fix
```

### localdiff 检测/修复

只检测本地 diff 的文件（包含 untracked 文件）。diff 检测允许没有配置文件 lint.config.json。

- 在根目录 package.json 文件中加入检测命令 

```
"scripts": {
  "lint-localdiff": "code-lint --localdiff",
  "lint-localdiff-fix":"code-lint --localdiff --fix"
},
```

- 运行检测命令检测或修复

``` bash
npm run lint-localdiff
或
npm run lint-localdiff-fix
```

### 检测规则

js 检测规则继承 eslint-config-standard 中的规则，并可根据配置文件中 eslint.rules 参数添加自定义规则。

eslint-config-standard：[https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)

css 检测规则继承 stylelint-config-standard 中的规则，可根据配置文件中 stylelint.rules 参数添加自定义规则。

stylelint-config-standard：[https://github.com/stylelint/stylelint-config-standard/blob/master/index.js](https://github.com/stylelint/stylelint-config-standard/blob/master/index.js)

### 其它说明

lint.config.json 配置文件中，除了 lintTargetFiles 参数外，还可以通过配置其它参数决定仅检测 js 或者 css等，详见下述默认配置文档（default.config.js）。

## :bookmark_tabs: 文档

默认配置：[default.config.js](./config/default.config.js)

js 检测默认忽略文件：[eslintignore.js](./lintIgnore/eslintignore.js)

css 检测默认忽略文件：[stylelintignore.js](./lintIgnore/stylelintignore.js)

## :gear: 更新日志
[CHANGELOG.md](./doc/CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](./doc/TODO.md)