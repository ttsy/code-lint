const path = require('path');
const shelljs = require('shelljs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = {
  // 设置本地的变动文件列表
  setGitLocalDiffFileList: function () {
    let adapter = new FileSync(path.join(__dirname, 'lint.local.diff.json'));
    let db = low(adapter);
    let diffFiles = shelljs.exec(`git diff --name-only`, { silent: true }).stdout.trim();
    let untrackedFiles = shelljs.exec(`git ls-files --exclude-standard --others`, { silent: true }).stdout.trim();
    // console.log(`------ diff files ------\n${diffFiles}\n------ diff files ------`);
    // console.log(`------ untracked files ------\n${untrackedFiles}\n------ untracked files ------`);
    let fileList = [];
    let lintFiles = diffFiles + '\n' + untrackedFiles;
    lintFiles.split('\n').forEach(function (v) {
      let file = path.join(process.cwd(), v);
      fileList.push(file);
    });
    db.set('lintTargetFiles', fileList).write();
  }
};
