'use strict';

/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const shelljs = require('shelljs');
const gulpEslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');

// const util = require('./util/util');
const pub = require('./util/pubMethod');
const typeConfig = require('./config/type.config');
const lintConfig = require('./config/lint.config');
const eslintDefaultIgnoreFiles = require('./lintIgnore/eslint.default.ignore');
const stylelintDefaultIgnoreFiles = require('./lintIgnore/stylelint.default.ignore');

// 运行检测命令的目录
const lintCMDPath = process.env.INIT_CWD;
// 当前工作目录（--gulpfile lint.js 会将 cwd 设置为 lint.js 所在目录）
// const cwd = process.cwd();

// eslint 占位文件，防止没任何待检测文件时程序报错
const eslintBaseFile = [`${lintCMDPath}/lint-base.js`]; 
// stylelint 占位文件，防止没任何待检测文件时程序报错
const stylelintBaseFile = [`${lintCMDPath}/lint-base.css`]; 

let lintFiles = {};
let lintIgnoreFiles = {};
typeConfig.all.map((val) => {
  lintFiles[val] = [];
  lintIgnoreFiles[val] = [];
})

lintConfig.lintTargetFiles.map((val) => {
  if (val.includes('!')) { // 兼容 lintTargetFiles 配置 ！ 忽略检测文件的情况
    lintConfig.ignoreFiles.push(val.slice(1))
  }else{
    let fileType = val.substr(val.lastIndexOf('.') + 1);
    let filePath;
    if (process.env.isDiffLint) { // 如果是 diff 检测，被检测文件已经配置为绝对路径，无需再拼接
      filePath = val;
    } else {
      filePath = path.join(lintCMDPath, val);
      filePath.includes('!') && (filePath = '!' + filePath.replace('!', ''));
    }
    lintFiles[fileType] && lintFiles[fileType].push(filePath);
  }
});

lintConfig.ignoreFiles.map((val) => {
  let fileType = val.substr(val.lastIndexOf('.') + 1);
  let filePath;
  filePath = '!' + path.join(lintCMDPath, val);
  lintIgnoreFiles[fileType] && lintIgnoreFiles[fileType].push(filePath);
})

let typeObj = {
  js: process.env.fix ? 'eslintFix' : 'eslint',
  css: process.env.fix ? 'stylelintFix' : 'stylelint'
}
let lintType = lintConfig.lintType;
let lintTask = [];
for (let key in lintType){
  lintType[key] && lintTask.push(typeObj[key]);
}

// 检测文件
let myEsLintFiles = pub.getFilesArr(lintFiles, 'js')
let myStyleLintFiles = pub.getFilesArr(lintFiles, 'css')
// let myLintFiles = pub.getFilesArr(lintFiles, 'all')
// 检测忽略文件
let myEsLintIgnoreFiles = pub.getFilesArr(lintIgnoreFiles, 'js')
let myStyleLintIgnoreFiles = pub.getFilesArr(lintIgnoreFiles, 'css')
// let myLintIgnoreFiles = pub.getFilesArr(lintIgnoreFiles, 'all')

// pub.printLintFiles(lintType, myLintFiles, myEsLintFiles, myStyleLintFiles);
// pub.printLintIgnoreFiles(lintType, myLintIgnoreFiles, myEsLintIgnoreFiles, myStyleLintIgnoreFiles);

// js 代码规范检测
gulp.task('eslint', () => {
  let files = myEsLintFiles
    .concat(myEsLintIgnoreFiles)
    .concat(eslintDefaultIgnoreFiles)
    .concat(eslintBaseFile);
  return gulp.src(files, { allowEmpty: true })
    .pipe(gulpEslint({
      configFile: '.eslintrc.js'
    }))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());
});

// css 代码规范检测
gulp.task('stylelint', () => {
  let files = myStyleLintFiles
    .concat(myStyleLintIgnoreFiles)
    .concat(stylelintDefaultIgnoreFiles)
    .concat(stylelintBaseFile);
  return gulp.src(files, { allowEmpty: true })
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

// 全局 js 代码规范修复
gulp.task('eslintFix', () => {
  let fixCmd = `eslint --fix ${lintCMDPath}`;
  // console.log(fixCmd)
  shelljs.exec(fixCmd);
});

// 全局 css 代码规范修复
gulp.task('stylelintFix', () => {
  let fixCmd = `stylelint ${lintCMDPath} --fix`;
  // console.log(fixCmd)
  shelljs.exec(fixCmd);
});

// default task
gulp.task('default', gulp.series(lintTask, (done) => {
  // 如果是 diff 检测，检测完后删除配置文件
  process.env.isDiffLint && fs.unlinkSync(path.join(__dirname, 'lint.local.diff.json'));
  done()
}));
