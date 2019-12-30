// 冒泡排序
// 原理：从第一个元素开始，把当前元素和下一个索引元素进行比较。如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素
function bubbleSort(array) {
  if (!Array.isArray(array)) {
    return false
  }
  for (var i = 0, len = array.length; i < len; i++) {
    for (var j = i + 1; j < len - 1; j++) {
      if (array[i] > array[j]) {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }
  }
  return array
}


const testData = [1, 3, 7, 2, 7, 9]

console.log(bubbleSort(testData))
