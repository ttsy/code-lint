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

const lintConfigFiles = ['.eslintrc', '.eslintignore', '.sass-lint.yml', '.htmllintrc'];

// 拷贝检测配置文件
if (cwd !== initCWD) {
    lintConfigFiles.map((v) => {
        fs.createReadStream(v).pipe(fs.createWriteStream(path.join(initCWD, v)));
    });
}

// 项目代码检测配置
const lintConfig = require(initCWD + '/lint.config.json');

let argv = require('yargs')
    .alias('p', 'projects')
    .argv;

let lintFiles = {
    js: [],
    vue: [],
    scss: [],
    html: [],
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

// sass 代码规范检测，不想被检测的代码命名为 *.min.scss 即可
gulp.task('sasslint', function () {
    // return gulp.src(lintFiles.scss.concat(lintFiles.vue))
    //     .pipe(sassLint())
    //     .pipe(sassLint.format())
    //     .pipe(sassLint.failOnError());
});

// html 代码规范检测，不想被检测的代码放入忽略目录即可
gulp.task('htmllint', function () {
    // return gulp.src(lintFiles.html)
    //     .pipe(htmlLint())
    //     .on('error', function (err) {
    //         console.log(err + '')
    //     })
    //     .pipe(htmlLint.format())
    //     .pipe(htmlLint.failOnError());
});

// lint task
gulp.task('lint', ['eslint', 'htmllint', 'sasslint'], function () {
    if (cwd !== initCWD) {
        // 移除检测配置文件
        lintConfigFiles.map((v) => {
            fs.unlinkSync(path.join(initCWD, v));
        });
    }
});