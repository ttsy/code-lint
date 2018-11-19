
module.exports = {
  files: {
    include: '**/*.scss',
    ignore: [], 
  },
  options: {
    formatter: 'stylish',
    'merge-default-rules': false,
  },
  rules: {
    // 块间不能有空格
    'empty-line-between-blocks': [
      2,
      {
        'include':false,
        'ignore-single-line-rulesets': true
      },
    ],
    // 大括号不能换行
    'brace-style': [
      2,
      {
        'allow-single-line': true,
      },
    ],
    // 十六进制值长度必须为长值
    'hex-length': [
      2,
      {
        style: 'long',
      },
    ],
    // 十六进制值长度必须为小写
    'hex-notation': [
      0,
      {
        style: 'lowercase',
      },
    ],
    // mixin 名字不允许下划线开头且仅允许带有连字符号小写
    'mixin-name-format': [
      2,
      {
        'allow-leading-underscore': false,
        convention: 'hyphenatedlowercase',
      },
    ],
    // function 名字不允许下划线开头且仅允许带有连字符号小写
    'function-name-format': [
      0,
      {
        'allow-leading-underscore': false,
        convention: 'hyphenatedlowercase',
      },
    ],
    // 小于 1 小数的小数点前必须加上 0
    'leading-zero': [
      2,
      {
        include: true,
      },
    ],
    // 选择器最深可以嵌套 4 层
    'nesting-depth': [
      2,
      {
        'max-depth': 4,
      },
    ],
    // 颜色值只能用十六进制
    'no-color-keywords': 2,
    // 不允许使用 @debug
    'no-debug': 2,
    // 不允许空规则
    'no-empty-rulesets': 2,
    // 不允许使用 id 选择器
    'no-ids': 2,
    // 不允许非法的十六进制值
    'no-invalid-hex': 2,
    // 不允许非法的属性
    'no-misspelled-properties': [
      2,
      {
        'extra-properties': [],
      },
    ],
    // 小数不允许有多余的 0
    'no-trailing-zero': 2,
    // ! 号后不允许加空格
    'space-after-bang': [
      2,
      {
        include: false,
      },
    ],
    // , 后必须加空格
    'space-after-comma': [
      2,
      {
        include: true,
      },
    ],
    // ! 号前必须加空格
    'space-before-bang': [
      2,
      {
        include: true,
      },
    ],
    // 块最末尾的规则必须加上 ;
    'trailing-semicolon': 2,
    // url 必须用引号包起来
    'url-quotes': 2,
    // 
  },
};
