/**
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  var char = x >= 0 ? '' : '-';
  var str = String(x).split('').reverse().join('').replace(/^(-)?0/, '');
  var num = parseInt(char + str);
  return num < -Math.pow(2, 31) || num > Math.pow(2, 31) -1 ? 0 : num;
};
