/* 业务相关公共函数 */

const path = require('path');
const shelljs = require('shelljs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const typeConfig = require('../config/type.config');

module.exports = {
  /**
   * @desc 设置本地的变动文件列表
   */
  setLocalDiffFileList() {
    let adapter = new FileSync(path.join(__dirname, '..', 'lint.local.diff.json'));
    let db = low(adapter);
    let diffFiles = shelljs.exec(`git diff --name-only`, { silent: true }).stdout.trim();
    let untrackedFiles = shelljs.exec(`git ls-files --exclude-standard --others`, { silent: true }).stdout.trim();
    // console.log(`------ diff files ------\n${diffFiles}\n------ diff files ------`);
    // console.log(`------ untracked files ------\n${untrackedFiles}\n------ untracked files ------`);
    let fileList = [];
    let lintFiles = diffFiles + '\n' + untrackedFiles;
    lintFiles.split('\n').forEach((val) => {
      let file = path.join(process.cwd(), val);
      fileList.push(file);
    });
    db.set('lintTargetFiles', fileList).write();
  },
  /**
   * @desc 获取文件数组
   * @param files 检测文件（对象数组格式）
   * @param type 类型，js、css、all
   * @return {Array} 检测文件（数组格式）
   */
  getFilesArr(files, type) {
    let filesArr = [];
    typeConfig[type].map((val) => {
      filesArr = filesArr.concat(files[val]);
    })
    return filesArr;
  },
  /**
  * @desc 打印检测文件
  */
  printLintFiles(lintType, myLintFiles, myEsLintFiles, myStyleLintFiles) {
    if ((lintType['js'] && lintType['css'] && myLintFiles.length <= 0) || 
        (lintType['js'] && !lintType['css'] && myEsLintFiles.length <= 0) || 
        (!lintType['js'] && lintType['css'] && myStyleLintFiles.length <= 0)) return;
    console.log(`------ lint files ------`);
    if (lintType['js'] && lintType['css']) {
      console.log(myLintFiles.join('\n'));
    } else if (lintType['js']) {
      console.log(myEsLintFiles.join('\n'));
    } else if (lintType['css']) {
      console.log(myStyleLintFiles.join('\n'));
    }
    console.log(`------ lint files ------`);
  },
  /**
  * @desc 打印检测忽略文件
  */
  printLintIgnoreFiles(lintType, myLintIgnoreFiles, myEsLintIgnoreFiles, myStyleLintIgnoreFiles) {
    if ((lintType['js'] && lintType['css'] && myLintIgnoreFiles.length <= 0) || 
        (lintType['js'] && !lintType['css'] && myEsLintIgnoreFiles.length <= 0) ||
        (!lintType['js'] && lintType['css'] && myStyleLintIgnoreFiles.length <= 0)) return;
    console.log(`------ ignore files ------`);
    if (lintType['js'] && lintType['css']) {
      console.log(myLintIgnoreFiles.join('\n').replace(/!/g, ''));
    } else if (lintType['js']) {
      console.log(myEsLintIgnoreFiles.join('\n').replace(/!/g, ''));
    } else if (lintType['css']) {
      console.log(myStyleLintIgnoreFiles.join('\n').replace(/!/g, ''));
    }
    console.log(`------ ignore files ------`);
  }
};
