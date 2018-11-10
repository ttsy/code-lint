# ttsy-lint

> js 代码规范检测

## 安装

``` bash
npm install git+https://github.com/ttsy/ttsy-lint.git --save-dev
```
## 使用

- 在根目录 package.json 文件中加入检测命令 

```
"scripts": {
  "lint": "ttsy-lint"
},
```

- 在根目录中加入配置文件，文件名为 lint.config.json，文件格式示例内容如下

```
{
  "lintTarget": [
    "**/*.js",
    "**/*.vue",
    "!node_modules/**/*.js"
  ],
  "globals":{
    "qq":false
  }
}
```

lintTarget 为检测目标文件，如上为检测项目中所有 .js .vue 后缀的文件，忽略 node_modules 文件夹中 .js 后缀的文件检测。

globals 为全局变量配置，配置后 eslint 不会检测配置的未声明的变量，如上 eslint 不会检测变量名为 qq 的变量，即使它并未声明。默认已经配置了 $ 和 jQuery 变量。

- 运行检测命令检测

``` bash
npm run lint
```

## 参考标准

eslint 检测规则由 eslint-config-standard 和自定义规则组成。

### eslint-config-standard
[https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)

### 自定义 Eslint 规则

[https://cn.eslint.org/docs/rules/](https://cn.eslint.org/docs/rules/)

目前自定义规则如下

```js
rules: {
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
}
```