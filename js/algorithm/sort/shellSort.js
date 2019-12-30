// 希尔排序
// 原理: 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
// 按增量序列个数 k，对序列进行 k 趟排序；
// 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度
// ![img](https://github.com/Marszed/demo/blob/master/img/shellSort.jpg)
function shellSort(arr) {
  var len = arr.length,
    temp,
    gap = 1
  // 动态定义间隔序列，也可以手动定义，如 gap = 5；
  while (gap < len / 5) {
    gap = gap * 5 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}

const testData = [1, 3, 7, 2, 7, 9]

console.log(shellSort(testData))
