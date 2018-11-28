'use strict';

/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const shelljs = require('shelljs');
const gulpEslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');

const util = require('./util/util');
const pub = require('./util/pubMethod');
const finalLintConfigJson = require('./config/lint.config');
const lintTypeConfig = require('./config/lint.type.config');
const eslintIgnoreFiles = require('./lintIgnore/eslintignore');
const stylelintIgnoreFiles = require('./lintIgnore/stylelintignore');

// 运行检测命令的目录
const lintCMDPath = process.env.INIT_CWD;
// 当前工作目录（--gulpfile lint.js 会将 cwd 设置为 lint.js 所在目录）
// const cwd = process.cwd();

// eslint 占位文件，防止没人任何待检测文件时程序报错
const eslintBaseFile = [`${lintCMDPath}/lint-base.js`]; 
// stylelint 占位文件，防止没人任何待检测文件时程序报错
const stylelintBaseFile = [`${lintCMDPath}/lint-base.css`]; 

let lintFiles = {};
lintTypeConfig.all.map((val) => {
  lintFiles[val] = [];
})

if (!finalLintConfigJson.lintTargetFiles) throw new Error('lint.config.json haven\'t configured lintTargetFiles field');

finalLintConfigJson.lintTargetFiles.map((val) => {
  let fileType = val.substr(val.lastIndexOf('.') + 1);
  let filePath;
  if (process.env.isDiffLint) {
    // 如果是 diff 检测，被检测文件已经配置为绝对路径，无需再拼接
    filePath = val;
  } else {
    filePath = path.join(lintCMDPath, val);
    filePath.includes('!') && (filePath = '!' + filePath.replace('!', ''));
  }
  lintFiles[fileType] && lintFiles[fileType].push(filePath);
});

let typeObj = {
  js: process.env.fix ? 'eslintFix' : 'eslint',
  css: process.env.fix ? 'stylelintFix' : 'stylelint'
}
let lintType = finalLintConfigJson.lintType;
let lintTask = [];
for (let key in lintType){
  lintType[key] && lintTask.push(typeObj[key]);
}

let includeJsLintFiles = pub.getLintFilesArr(lintFiles, 'js')
let includeCssLintFiles = pub.getLintFilesArr(lintFiles, 'css')
let lintFilesArr = pub.getLintFilesArr(lintFiles, 'all')

console.log(`------ lint files ------`);
if (lintType['js'] && lintType['css']){
  console.log(lintFilesArr.join('\n'));
} else if (lintType['js']){
  console.log(includeJsLintFiles.join('\n'));
} else if (lintType['css']){
  console.log(includeCssLintFiles.join('\n'));
}
console.log(`------ lint files ------`);

// js 代码规范检测
gulp.task('eslint', () => {
  let files = includeJsLintFiles
    .concat(eslintIgnoreFiles)
    .concat(eslintBaseFile);
  return gulp.src(files)
    .pipe(gulpEslint({
      configFile: '.eslintrc.js'
    }))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());
});

// css 代码规范检测
gulp.task('stylelint', () => {
  let files = includeCssLintFiles
    .concat(stylelintIgnoreFiles)
    .concat(stylelintBaseFile);
  return gulp.src(files)
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

// js 代码规范修复
gulp.task('eslintFix', () => {
  let fixCmd;
  if (process.env.isDiffLint){
    fixCmd = `eslint --fix ${includeJsLintFiles.join(' ')}`;
  }else{
    let lintTypeConfigJs = lintTypeConfig.js.map((val) => ('.' + val))
    let includeJsLintFolder = includeJsLintFiles.map((val) => {
      if (val.indexOf('!') == -1) return val.slice(0, val.indexOf('*') - 1);
    })
    fixCmd = `eslint --ext ${lintTypeConfigJs.join(',')} --fix ${util.uniqueArr(includeJsLintFolder).join(' ')}`;
  }
  // console.log(fixCmd)
  shelljs.exec(fixCmd);
});

// css 代码规范修复
gulp.task('stylelintFix', () => {
  let fixCmd;
  if (process.env.isDiffLint) {
    fixCmd = `stylelint  ${includeCssLintFiles.join(' ')} --fix`;
  } else {
    let includeCssLintFilesArr = [];
    let includeCssLintFolder = includeCssLintFiles.map((val) => {
      if (val.indexOf('!') == -1) return val.slice(0, val.indexOf('*') - 1);
    })
    util.uniqueArr(includeCssLintFolder).map((val1) => {
      lintTypeConfig.css.map((val2) => {
        includeCssLintFilesArr.push(val1 + '/*.' + val2);
      })
    })
    fixCmd = `stylelint ${includeCssLintFilesArr.join(' ')} --fix`;
  }
  // console.log(fixCmd)
  shelljs.exec(fixCmd);
});

// default task
gulp.task('default', lintTask, () => {
  // 如果是 diff 检测，检测完后删除配置文件
  process.env.isDiffLint && fs.unlinkSync(path.join(__dirname, 'lint.local.diff.json'));
});
