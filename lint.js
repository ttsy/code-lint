'use strict';

/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sassLint = require('gulp-sass-lint');

// eslint 配置
const eslintConfig = '.eslintrc.js';
// sasslint 配置
const sasslintConfig = require('./.sasslintrc');

// 运行检测命令的目录
const lintCMDPath = process.env.INIT_CWD;
// 当前工作目录（--gulpfile lint.js 会将 cwd 设置为 lint.js 所在目录）
// const cwd = process.cwd();

// eslint 默认忽略检测的文件
const eslintIgnoreFiles = [
  `!${lintCMDPath}/**/node_modules/**/*.js`,
  `!${lintCMDPath}/**/node_modules/**/*.vue`,
  `!${lintCMDPath}/**/dist/**/*.js`,
  `!${lintCMDPath}/**/vendor/**/*.js`,
  `!${lintCMDPath}/**/*.min.js`
];
// eslint 占位文件，防止没人任何待检测文件时程序报错
const eslintBaseFile = [`${lintCMDPath}/lint-base.js`]; 
// sasslint 默认忽略检测的文件
const sasslintIgnoreFiles = [
  `!${lintCMDPath}/**/node_modules/**/*.scss`,
  `!${lintCMDPath}/**/node_modules/**/*.vue`,
  `!${lintCMDPath}/**/vendor/**/*.scss`,
  `!${lintCMDPath}/**/*.min.scss`
];
// sasslint 占位文件，防止没人任何待检测文件时程序报错
const sasslintBaseFile = [`${lintCMDPath}/lint-base.scss`]; 

let lintConfigFilePath = lintCMDPath;
if (process.env.isDiffLint) {
  // 如果是 diff 检测，lint 临时配置文件存于 ttsy-lint 根路径下，而非使用 ttsy-lint 的项目目录下
  lintConfigFilePath = __dirname;
}

// eslint 配置文件 lint.config.json
const lintConfigJson = require(path.join(lintConfigFilePath, process.env.lintConfigFile));

let lintFiles = {
  js: [],
  vue: [],
  scss: []
};

if (lintConfigJson.lintTargetFiles){
  lintConfigJson.lintTargetFiles.map(function (val) {
    let fileType = val.substr(val.lastIndexOf('.') + 1);
    let filePath;
    if (process.env.isDiffLint) {
      // 如果是 diff 检测，被检测文件已经配置为绝对路径，无需再拼接
      filePath = val;
    } else {
      filePath = path.join(lintCMDPath, val);
      if (filePath.indexOf('!') !== -1) {
        filePath = '!' + filePath.replace('!', '');
      }
    }
    lintFiles[fileType] && lintFiles[fileType].push(filePath);
  });
}else{
  throw new Error('lint.config.json haven\'t configured lintTargetFiles field');
}

console.log(`------ lint files ------\n${lintFiles.js.concat(lintFiles.vue).concat(lintFiles.scss).join('\n')}\n------ lint files ------`);

// js 代码规范检测
gulp.task('eslint', function () {
  let files = lintFiles.js
    .concat(lintFiles.vue)
    .concat(eslintIgnoreFiles)
    .concat(eslintBaseFile);
  // console.log(`------ eslint files ------\n${files.join('\n')}\n------ eslint files ------`);
  return gulp.src(files)
    .pipe(eslint({
      configFile: eslintConfig
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// sass 代码规范检测
gulp.task('sasslint', function () {
  let files = lintFiles.scss
    .concat(lintFiles.vue)
    .concat(sasslintIgnoreFiles)
    .concat(sasslintBaseFile);
  // console.log(`------ sasslint files ------\n${files.join('\n')}\n------ sasslint files ------`);
  return gulp
    .src(files)
    .pipe(sassLint(sasslintConfig))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// default task
gulp.task('default', ['eslint', 'sasslint'], function () {
  if (process.env.isDiffLint) { 
    // 如果是 diff 检测，检测完后删除配置文件
    fs.unlinkSync(path.join('.', process.env.lintConfigFile));
  }
});
