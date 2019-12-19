// 快速排序
// 原理：在数据集之中，找一个基准点，建立两个数组，分别存储左边和右边的数组，利用递归进行下次比较。
function quickSort(array) {
  if (!Array.isArray(array)) {
    return false
  }
  if (array.length <= 1) {
    return array
  }
  const midIndex = Math.floor(array.length / 2)
  const midValue = array.splice(midIndex, 1)[0]
  const left = []
  const right = []

  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] > midValue) {
      right.push(array[i])
    } else {
      left.push(array[i])
    }
  }

  return [...quickSort(left), midValue, ...quickSort(right)]
}

const testData = [1,3,7,2,7,9]

console.log(quickSort(testData))
