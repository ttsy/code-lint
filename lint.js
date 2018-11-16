'use strict';

/* eslint-disable no-console */
const gulp = require('gulp');
const path = require('path');
const eslint = require('gulp-eslint');
const fs = require('fs');

// 运行检测命令的目录
const initCWD = process.env.INIT_CWD;
// 当前工作目录（--gulpfile lint.js 会将 cwd 设置为 lint.js 所在目录）
const cwd = process.cwd();

let lintConfigFilePath = initCWD;
if (process.env.isDiffLint) {
  // 如果是 diff 检测，lint 临时配置文件存于 ttsy-lint 根路径下，而非使用 ttsy-lint 的项目目录下
  lintConfigFilePath = __dirname;
}

const lintConfigFiles = ['.eslintrc.js', '.eslintignore'];

// 拷贝检测配置文件至运行检测命令的目录
if (cwd !== initCWD) {
  lintConfigFiles.map((val) => {
    fs.createReadStream(val).pipe(fs.createWriteStream(path.join(initCWD, val)));
  });
}

// 项目代码检测配置
const lintConfigJson = require(path.join(lintConfigFilePath, process.env.lintConfigFile));
const lintTargetFiles = lintConfigJson.lintTargetFiles;

let lintFiles = {
  js: [],
  vue: []
};

lintTargetFiles.map(function (val) {
  let fileType = val.substr(val.lastIndexOf('.') + 1);
  let filePath;
  if (process.env.isDiffLint) { 
    // 如果是 diff 检测，被检测文件已经配置为绝对路径，无需再拼接
    filePath = val;
  }else{
    filePath = path.join(initCWD, val);
    if (filePath.indexOf('!') !== -1) {
      filePath = '!' + filePath.replace('!', '');
    }
  }
  lintFiles[fileType] && lintFiles[fileType].push(filePath);
});

// js 代码规范检测
gulp.task('eslint', function () {
  return gulp.src(lintFiles.js.concat(lintFiles.vue))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// default task
gulp.task('default', ['eslint'], function () {
  if (cwd !== initCWD) {
    // 移除检测配置文件
    lintConfigFiles.map((val) => {
      fs.unlinkSync(path.join(initCWD, val));
    });
  }
  if (process.env.isDiffLint) { 
    // 如果是 diff 检测，检测完后删除配置文件
    fs.unlinkSync(path.join(cwd, process.env.lintConfigFile));
  }
});
