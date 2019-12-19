// 快速排序
// 原理：在数据集之中，找一个基准点，建立两个数组，分别存储左边和右边的数组，利用递归进行下次比较。
function bubbleSort(array) {
  if (!Array.isArray(array)) {
    return false
  }
  const midIndex = Math.floor(array.length / 2)
  const midValue = array[midIndex]
  const left = []
  const right = []

  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] > midValue) {
      right.push(array[i])
    } else {
      left.push(array[i])
    }
  }
  return left
}


const testData = [1,3,7,2,7,9]

console.log(bubbleSort(testData))
