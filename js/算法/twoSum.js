/**
 * 暴力解法
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var targetIndex = [];
  var len = nums.length
  loop:
  for(var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j ++) {
      if (target - nums[i] === nums[j]) {
        targetIndex = [i, j];
        break loop;
      }
    }
  }
  return targetIndex;
};

console.log(twoSum([1,2,3,7], 9))


/**
 * 利用数组(功能类似HashMap)实现
 * @param nums
 * @param target
 * @returns {*[]}
 */
var twoSum2 = function(nums, target) {
  var temp = [];
  for (var i = 0, len = nums.length; i < len; i++) {
    var diff = target - nums[i];
    if (temp[diff] !== undefined) {
      return [temp[diff], i];
    }
    temp[nums[i]] = i;
  }
};

console.log(twoSum2([1,2,3,7], 9))
