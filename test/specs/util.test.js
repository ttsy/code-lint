let util = require('../../util/util.js');
let expect = require('chai').expect;

describe('uniqueArr 数组去重函数测试', () => {
  it('传入 [1,1,2,3,4] 应该输出 [1,2,3,4]', () => {
    expect(util.uniqueArr([1, 1, 2, 3, 4])).to.deep.equal([1, 2, 3, 4]);
  });
});
