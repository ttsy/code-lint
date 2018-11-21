'use strict';

/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const gulpEslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');

const finalLintConfigJson = require('./lint.config.js');

// eslint 默认忽略检测的文件
const eslintIgnoreFiles = require('./eslintignore');
// stylelint 默认忽略检测的文件
const stylelintIgnoreFiles = require('./stylelintignore');

// 运行检测命令的目录
const lintCMDPath = process.env.INIT_CWD;
// 当前工作目录（--gulpfile lint.js 会将 cwd 设置为 lint.js 所在目录）
// const cwd = process.cwd();

// eslint 占位文件，防止没人任何待检测文件时程序报错
const eslintBaseFile = [`${lintCMDPath}/lint-base.js`]; 
// stylelint 占位文件，防止没人任何待检测文件时程序报错
const stylelintBaseFile = [`${lintCMDPath}/lint-base.css`]; 

let lintFiles = {
  html: [],
  vue: [],
  js: [],
  css: [],
  scss: [],
  less: []
};

if (finalLintConfigJson.lintTargetFiles){
  finalLintConfigJson.lintTargetFiles.map(function (val) {
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
  'css':'stylelint'
}
let lintType = finalLintConfigJson.lintType;
let lintTask = [];
for (let key in lintType){
  if (lintType[key]){
    lintTask.push(typeObj[key]);
  }
}

let includeJsLintFiles = lintFiles.html
      .concat(lintFiles.vue)
      .concat(lintFiles.js);
let includeCssLintFiles = lintFiles.html
      .concat(lintFiles.vue)
      .concat(lintFiles.css)
      .concat(lintFiles.scss)
      .concat(lintFiles.less);
let allLintFiles = lintFiles.html
      .concat(lintFiles.vue)
      .concat(lintFiles.js)
      .concat(lintFiles.css)
      .concat(lintFiles.vue)
      .concat(lintFiles.scss)
      .concat(lintFiles.less);

console.log(`------ lint files ------`);
if (lintType['js'] && lintType['css']){
  console.log(allLintFiles.join('\n'));
} else if (lintType['js']){
  console.log(includeJsLintFiles.join('\n'));
} else if (lintType['css']){
  console.log(includeCssLintFiles.join('\n'));
}
console.log(`------ lint files ------`);

// js 代码规范检测
gulp.task('eslint', function () {
  let files = includeJsLintFiles
    .concat(eslintIgnoreFiles)
    .concat(eslintBaseFile);
  // console.log(`------ eslint files ------\n${files.join('\n')}\n------ eslint files ------`);
  return gulp.src(files)
    .pipe(gulpEslint({
      configFile: '.eslintrc.js'
    }))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());
});

// css 代码规范检测
gulp.task('stylelint', function() {
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

// default task
gulp.task('default', lintTask, function () {
  if (process.env.isDiffLint) { 
    // 如果是 diff 检测，检测完后删除配置文件
    fs.unlinkSync(path.join(__dirname, 'lint.local.diff.json'));
  }
});
