'use strict';

/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sassLint = require('gulp-sass-lint');
var extend = require('extend');

// eslint 默认忽略检测的文件
const eslintIgnoreFiles = require('./eslintignore');
// sasslint 默认忽略检测的文件
const sasslintIgnoreFiles = require('./sasslintignore');
// eslint 配置
const eslintConfig = '.eslintrc.js';
// sasslint 配置
const sasslintConfig = require('./.sasslintrc');

// 运行检测命令的目录
const lintCMDPath = process.env.INIT_CWD;
// 当前工作目录（--gulpfile lint.js 会将 cwd 设置为 lint.js 所在目录）
// const cwd = process.cwd();

// eslint 占位文件，防止没人任何待检测文件时程序报错
const eslintBaseFile = [`${lintCMDPath}/lint-base.js`]; 
// sasslint 占位文件，防止没人任何待检测文件时程序报错
const sasslintBaseFile = [`${lintCMDPath}/lint-base.scss`]; 

// eslint 配置文件 lint.config.json
let lintConfigJson = require(path.join(lintCMDPath, 'lint.config.json'));
if (process.env.isDiffLint) {
  let lintLocalDiffJson = require(path.join(__dirname, 'lint.local.diff.json'));
  extend(lintConfigJson, lintLocalDiffJson);
}

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

let typeObj = {
  'js': 'eslint',
  'sass': 'sasslint',
  'scss': 'sasslint'
}
let defaultLintType = {
  'js':true, 
  'sass':true
};
let lintType = lintConfigJson.lintType || defaultLintType;
let lintTask = [];
for (let key in lintType){
  if (lintType[key]){
    lintTask.push(typeObj[key]);
  }
}

if (lintType['js']){
  console.log(`------ lint files ------\n${lintFiles.js.concat(lintFiles.vue).join('\n')}\n------ lint files ------`);
} else if (lintType['sass'] || lintType['scss']){
  console.log(`------ lint files ------\n${lintFiles.scss.join('\n')}\n------ lint files ------`);
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
gulp.task('default', lintTask, function () {
  if (process.env.isDiffLint) { 
    // 如果是 diff 检测，检测完后删除配置文件
    fs.unlinkSync(path.join(__dirname, 'lint.local.diff.json'));
  }
});
