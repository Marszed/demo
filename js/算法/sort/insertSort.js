// 选择排序
// 原理：遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，遍历完成后，将第一个元素和最小值索引上的值交换。如上操作后，第一个元素就是数组中的最小值，下次遍历就可以从索引 1 开始重复上述操作。
// ![img](https://github.com/Marszed/demo/blob/master/img/selectSort.gif)
function selectSort(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0; i < arr.length - 1; i++) {
      let midIndex = i
      for (var j = i + 1; j < arr.length; j++) {
        midIndex = arr[j] < arr[midIndex] ? j : midIndex
      }
      [arr[i], arr[midIndex]] = [arr[midIndex], arr[i]]
    }
    return arr
  }
}

const testData = [1,3,7,2,7,9]

console.log(selectSort(testData))
