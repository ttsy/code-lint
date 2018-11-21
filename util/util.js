const path = require('path');
const shelljs = require('shelljs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const lintFileConfig = require('../config/lint.type.config');

module.exports = {
  /**
   * @desc 设置本地的变动文件列表
   */
  setLocalDiffFileList: function () {
    let adapter = new FileSync(path.join(__dirname, '..', 'lint.local.diff.json'));
    let db = low(adapter);
    let diffFiles = shelljs.exec(`git diff --name-only`, { silent: true }).stdout.trim();
    let untrackedFiles = shelljs.exec(`git ls-files --exclude-standard --others`, { silent: true }).stdout.trim();
    // console.log(`------ diff files ------\n${diffFiles}\n------ diff files ------`);
    // console.log(`------ untracked files ------\n${untrackedFiles}\n------ untracked files ------`);
    let fileList = [];
    let lintFiles = diffFiles + '\n' + untrackedFiles;
    lintFiles.split('\n').forEach(function (val) {
      let file = path.join(process.cwd(), val);
      fileList.push(file);
    });
    db.set('lintTargetFiles', fileList).write();
  },
  /**
   * @desc 获取检测文件
   * @param lintFiles 检测文件（对象数组格式）
   * @param lintType 类型，js、css、all
   * @return {Array} 检测文件（数组格式）
   */
  getLintFilesArr: function (lintFiles, lintType){
    let lintFilesArr = [];
    lintFileConfig[lintType].map(function(val){
      lintFilesArr = lintFilesArr.concat(lintFiles[val]);
    })
    return lintFilesArr;
  }
};
