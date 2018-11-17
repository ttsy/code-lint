'use strict';

/* eslint-disable no-console */
const gulp = require('gulp');
const path = require('path');
const eslint = require('gulp-eslint');
const fs = require('fs');

// 运行检测命令的目录
const initCWD = process.env.INIT_CWD;
// 当前工作目录（--gulpfile lint.js 会将 cwd 设置为 lint.js 所在目录）
// const cwd = process.cwd();

// eslint 默认忽略检测的文件
const eslintIgnoreFiles = [
  `!${initCWD}/**/node_modules/**/*.js`,
  `!${initCWD}/**/node_modules/**/*.vue`,
  `!${initCWD}/**/dist/**/*.js`,
  `!${initCWD}/**/vendor/**/*.js`,
  `!${initCWD}/**/*.min.js`
];
// eslint 占位文件，防止没人任何待检测文件时程序报错
const eslintBaseFile = [`${initCWD}/lint-base.js`]; 

let lintConfigFilePath = initCWD;
if (process.env.isDiffLint) {
  // 如果是 diff 检测，lint 临时配置文件存于 ttsy-lint 根路径下，而非使用 ttsy-lint 的项目目录下
  lintConfigFilePath = __dirname;
}

// eslint 配置文件 lint.config.json
const lintConfigJson = require(path.join(lintConfigFilePath, process.env.lintConfigFile));

let lintFiles = {
  js: [],
  vue: []
};

if (lintConfigJson.lintTargetFiles){
  lintConfigJson.lintTargetFiles.map(function (val) {
    let fileType = val.substr(val.lastIndexOf('.') + 1);
    let filePath;
    if (process.env.isDiffLint) {
      // 如果是 diff 检测，被检测文件已经配置为绝对路径，无需再拼接
      filePath = val;
    } else {
      filePath = path.join(initCWD, val);
      if (filePath.indexOf('!') !== -1) {
        filePath = '!' + filePath.replace('!', '');
      }
    }
    lintFiles[fileType] && lintFiles[fileType].push(filePath);
  });
}else{
  throw new Error('lint.config.json 未配置 lintTargetFiles 字段');
}

if (process.env.isDiffLint) {
  console.log(`------ diff lint files ------\n${lintFiles.js.concat(lintFiles.vue).join('\n')}\n------ diff lint files ------`);
}

// js 代码规范检测
gulp.task('eslint', function () {
  let files = lintFiles.js
              .concat(lintFiles.vue)
              .concat(eslintIgnoreFiles)
              .concat(eslintBaseFile);
  // console.log(`------ eslint files ------\n${files.join('\n')}\n------ eslint files ------`);
  return gulp.src(files)
    .pipe(eslint({
      configFile: '.eslintrc.js'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// default task
gulp.task('default', ['eslint'], function () {
  if (process.env.isDiffLint) { 
    // 如果是 diff 检测，检测完后删除配置文件
    fs.unlinkSync(path.join('.', process.env.lintConfigFile));
  }
});
