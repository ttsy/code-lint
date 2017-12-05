/**
 * @author paco
 * @description 前端代码规范检测
 */
'use strict';

/* eslint-disable no-console */

const gulp = require('gulp');
const path = require('path');
const eslint = require('gulp-eslint');
// const sassLint = require('gulp-sass-lint');
// const htmlLint = require('gulp-html-lint');
const fs = require('fs');

// 运行检测命令的目录
const initCWD = process.env.INIT_CWD;
const cwd = process.cwd();

const lintConfigFiles = ['.eslintrc.js', '.eslintignore'];

// 拷贝检测配置文件
if (cwd !== initCWD) {
    lintConfigFiles.map((v) => {
        fs.createReadStream(v).pipe(fs.createWriteStream(path.join(initCWD, v)));
    });
}

console.log(initCWD)
console.log(cwd)
// 项目代码检测配置

const lintConfig = require(initCWD + '/lint.config.json');

let argv = require('yargs')
    .alias('p', 'projects')
    .argv;

let lintFiles = {
    js: [],
    vue: [],
};

let projects = argv.p + '';

const tasks = projects.replace(/\s/gi, '').split(',');

for (let k in lintConfig) {
    if (lintConfig.hasOwnProperty(k) && (tasks.indexOf(k) !== -1 || !argv.p)) {
        lintConfig[k].map(function (v) {
            let fileType = v.substr(v.lastIndexOf('.') + 1);
            let filesPath = path.join(initCWD, v);
            if (filesPath.indexOf('!') !== -1) {
                filesPath = '!' + filesPath.replace('!', '');
            }
            lintFiles[fileType] && lintFiles[fileType].push(filesPath);
        });
    }
}

// js 代码规范检测，不想被检测的代码命名为 *.min.js 即可
gulp.task('eslint', function () {
    return gulp.src(lintFiles.js.concat(lintFiles.vue))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


// lint task
gulp.task('lint', ['eslint'], function () {
    if (cwd !== initCWD) {
        // 移除检测配置文件
        lintConfigFiles.map((v) => {
            fs.unlinkSync(path.join(initCWD, v));
        });
    }
});