
/* 业务无关工具函数 */

module.exports = {
  /**
   * @desc 数组去重
   * @desc Array.prototype.includes
   * @param arr 原始数组
   * @return {Array} 去重后的新数组
   */
  uniqueArr(arr) {
    var newArr = [];
    arr.map((val) => {
      !newArr.includes(val) && newArr.push(val);
    })
    return newArr;
  }
};
