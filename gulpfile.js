'use strict';

/* eslint-disable no-console */

const gulp = require('gulp');
const path = require('path');
const eslint = require('gulp-eslint');
const fs = require('fs');

// 运行检测命令的目录
const initCWD = process.env.INIT_CWD;
const cwd = process.cwd();

const lintConfigFiles = ['.eslintrc.js', '.eslintignore'];

// 拷贝检测配置文件
if (cwd !== initCWD) {
    lintConfigFiles.map((value) => {
        fs.createReadStream(value).pipe(fs.createWriteStream(path.join(initCWD, value)));
    });
}

// 项目代码检测配置
const lintConfig = require(initCWD + '/lint.config.json');

let lintFiles = {
    js: [],
    vue: [],
};

for (let obj in lintConfig) {
    if (lintConfig.hasOwnProperty(obj) ) {
        lintConfig[obj].map(function (value) {
            let fileType = value.substr(value.lastIndexOf('.') + 1);
            let filesPath = path.join(initCWD, value);
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