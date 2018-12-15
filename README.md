# [code-lint](https://github.com/ttsy/code-lint)

基于 eslint、stylelint 的代码规范检测

## :star: 特性

- 基于 eslint 进行 js 代码规范检测
- 基于 stylelint 进行 css 代码规范检测
- 集成单元测试环境（mocha）

## :rocket: 使用者指南

通过 npm 下载安装

``` bash
npm install git+https://github.com/ttsy/code-lint.git --save-dev
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

- 运行检测命令检测

``` bash
npm run lint
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

- 运行检测命令检测

``` bash
npm run lint-localdiff
```

## :bookmark_tabs: 文档

[API](./doc/API.md)

## :gear: 更新日志
[CHANGELOG.md](./doc/CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](./doc/TODO.md)