// 插入排序
// 原理：第一个元素默认是已排序元素，取出下一个元素和当前元素比较，如果当前元素大就交换位置。那么此时第一个元素就是当前的最小数，所以下次取出操作从第三个元素开始，向前对比，重复之前的操作。
// ![img](https://github.com/Marszed/demo/blob/master/img/insertSort.gif)
function insertSort(arr) {
  if (Array.isArray(arr)) {
    for (var i = 1; i < arr.length; i++) {
      let preIndex = i - 1
      const current = arr[i]
      while (preIndex >= 0 && arr[preIndex] > current) {
        arr[preIndex + 1] = arr[preIndex];
        preIndex--
      }
      arr[preIndex + 1] = current
    }
    return arr
  }
}

const testData = [1,3,7,2,7,9]

console.log(insertSort(testData))
