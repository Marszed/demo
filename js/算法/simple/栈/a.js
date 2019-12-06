/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var sArray = s.split('').reverse().join('');
  console.log(sArray)
  var valid = true;
  for(var i = 0, len = sArray.length; i < len; i++) {
    console.log(s[i], sArray[i])
    if (s[i] !== sArray[i]) {
      valid = false;
      break;
    }
  }
  return valid;
};

console.log(isValid('()[]'))
