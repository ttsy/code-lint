# ttsy-lint

> 代码规范检测

## 安装

``` bash
npm install git+https://github.com/ttsy/ttsy-lint.git --save-dev
```
## 使用

### 定向检测

检测配置文件中配置的文件

- 在根目录 package.json 文件中加入检测命令 

```
"scripts": {
  "lint": "ttsy-lint"
},
```

- 在根目录中加入配置文件，文件名为 lint.config.json，文件格式示例内容如下

```js
{
  "lintTargetFiles": [
    "**/*.js",
    "**/*.vue",
    "**/*.scss",
    "!**/ignore/*.js"
  ]
}
```

lintTargetFiles 为检测目标文件，在前面加上 ! 则表示忽略检测的文件。

- 运行检测命令检测

``` bash
npm run lint
```

### localdiff 检测

只检测本地 diff 的文件（包含 untracked 文件）。diff 检测允许没有配置文件 lint.config.json。

- 在根目录 package.json 文件中加入检测命令 

```
"scripts": {
  "lint-localdiff": "ttsy-lint --localdiff"
},
```

- 运行检测命令检测

``` bash
npm run lint-localdiff
```

## 规则

检测规则继承 eslint-config-standard 中的规则，并根据自身项目需要添加自定义规则。

### eslint-config-standard
[https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)

### 自定义 Eslint 规则

[https://cn.eslint.org/docs/rules/](https://cn.eslint.org/docs/rules/)

默认自定义规则
[.eslintrc.js](./.eslintrc.js)

## 配置文件

配置文件需放在根目录下，命名为 lint.config.json。仅在 localdiff 检测下不需要配置文件。

```js
{
  "lintTargetFiles": [], // 检测目标文件（定向检测 必选）
  "lintType":{}, // 检测类型（可选）。默认检测 js scss
  "globals":{}, // eslint 全局对象，规则同 eslint globals 属性（可选）。默认已经配置了 $ 和 jQuery 变量。
}
```

配置示例

```js
{
  "lintTargetFiles": [
    "**/*.js",
    "**/*.vue",
    "**/*.scss",
    "!**/ignore/*.js"
  ],
  "lintType":{
    "js":true,
    "scss":false
  },
  "globals":{
    "qq":false
  }
}
```

## 忽略文件

js 检测默认忽略文件

```
**/node_modules/**/*.js
**/node_modules/**/*.vue
**/dist/**/*.js
**/vendor/**/*.js
**/*.min.js
```

scss 检测默认忽略文件

```
**/node_modules/**/*.scss
**/node_modules/**/*.vue
**/vendor/**/*.scss
**/*.min.scss
```

## 命令

``` bash
# 定向检测
ttsy-lint
# localdiff 检测
ttsy-lint --localdiff
# 查看版本号
ttsy-lint -v
ttsy-lint --version
```