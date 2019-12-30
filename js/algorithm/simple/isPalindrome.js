/**
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * @param {number} x
 * @return {boolean}
 */

// 字符串翻转
var isPalindrome = function(x) {
  var str = String(x);
  return str === str.split('').reverse().join('');
};


// 中心扩展法
var isPalindrome2 = function(x) {
  if (x < 0) {
    return false;
  }
  var str = String(x);
  var len = str.length
  var mid = ~~(len / 2);
  var left = mid - 1;
  var right = len % 2 ? mid + 1 : mid;
  while (left >= 0 && right < len) {
    if (str[left] !== str[right]) {
      return false;
    }
    left--;
    right++;
  }
  return true;
};


//    if(x<0 || (x%10 == 0 && x!=0)){
//         return false;
//     }
//     var reverseNumber = 0;
//     while(x>reverseNumber){
//         reverseNumber = reverseNumber*10 + x%10;
//         x = parseInt(x/10);
//     }
//     return x == reverseNumber || x == parseInt(reverseNumber/10)
//

// 二分法
// 将原整数分成前后两部分
// 从最后一位数字开始取出直到一半
// 原数字不断/10抛弃最后一位，新数字不断乘以10 直到反转后的数大于原数 即可判断到了一半
// 奇数数字/10 == 反转数字 || 偶数数字 == 反装数字 => 是回文数
var isPalindrome3 = function(x) {

};
