#### 块状元素 行内元素区别
- line：行内元素 (a span i b code img input textarea)
   1. 设置宽高无效
   2. 对margin仅设置左右方向有效，上下无效；padding设置上下左右都有效
   3. 不会自动进行换行
- block：块状元素 (div header footer ul li address)
    1. 能够设置宽高
    2. margin与padding上下左右均有效
    3. 自动换行
    4. 默认从上至下排列
- line-block：行内快转元素
    1. 能够设置宽高
    2. margin与padding上下左右均有效
    3. 自动换行
    4. 默认从左至右排列

#### BFC介绍
- 定义
  1. 块级格式化决定元素如何对其内容进行定位以及与其他元素的关系和相互作用(独立的作用域)。
  2. 块级格式化上下文包含创建它的元素内部的所有内容
- 如何创建
  1. 根元素(<html>)
  2. 浮动元素（元素的 float 不是 none）
  3. 绝对定位元素（元素的 position 为 absolute 或 fixed）
  4. 行内块元素（元素的 display 为 inline-block）
  5. 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
  6. 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
  7. 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
  8. overflow 值不为 visible 的块元素
  9. display 值为 flow-root 的元素
  10. contain 值为 layout、content或 paint 的元素
  11. 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
  12. 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
  13. 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
  14. column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）
- 作用
  1. 清除浮动
  2. 垂直外边距重叠问题
  3. 自适应两列布局 

#### js执行机制 (以下打印结果)
``` javascript
const task = function() {
  setTimeout(function() {
    console.log('setTimeout')
  }, 0)

  const p = new Promise(function(resolve) {
    console.log('promise')
    resolve()
  }).then(function() {
    console.log('then')
  })

  console.log('console')
```

#### 使用apply实现bind
``` javascript
Function.prototype.bind = function() {
    const that = this
    return function(arg) {
      return this.apply(that, arg)
    }
  }
}
```

#### 深度优先进行递归遍历
``` javascript
const tree = [
  {
    name: 'parent1',
    children: [
      {
        name: 'child1'
      },
      {
        name: 'child2'
      }
    ]
  },
  {
    name: 'parent2',
    children: [{
      name: 'child2'
    }]
  }
]
const treeFn = function(target = []) {
  target.map(({name, children = []}) => {
    console.log(name)
    if (children.length) {
      treeFn(children)
    }
  })
}
treeFn(tree)
```



