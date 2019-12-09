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

#### BFC介绍 [转](http://www.iyunlu.com/view/css-xhtml/55.html)
- 定义
  1. 块级格式化决定元素如何对其内容进行定位以及与其他元素的关系和相互作用(独立的作用域)。
  2. 块级格式化上下文包含创建它的元素内部的所有内容
  3. 创建了 BFC的元素就是一个独立的盒子，里面的子元素不会在布局上影响外面的元素，反之亦然，同时BFC任然属于文档中的普通流
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
  1. 清除`（闭合）`浮动，解决高度塌陷
  2. 垂直外边距重叠问题
  3. 自适应两列布局 
- 特性
  1. 块级格式化上下文会阻止外边距叠加 (当两个相邻的块框在同一个块级格式化上下文中时，它们之间垂直方向的外边距会发生叠加。换句话说，如果这两个相邻的块框不属于同一个块级格式化上下文，那么它们的外边距就不会叠加。)
  1. 块级格式化上下文不会重叠浮动元素 (一个块级格式化上下文的边框不能和它里面的元素的外边距重叠。这就意味着浏览器将会给块级格式化上下文创建隐式的外边距来阻止它和浮动元素的外边距叠加。由于这个原因，当给一个挨着浮动的块级格式化上下文添加负的外边距时将会不起作用)
  1. 块级格式化上下文通常可以包含浮动 (创建了 BFC的元素就是一个独立的盒子，里面的子元素不会在布局上影响外面的元素，反之亦然，同时BFC任然属于文档中的普通流)
- 清除原理: BFC + hasLayout
  ```css 
  // http://nicolasgallagher.com/micro-clearfix-hack/
  .clearfix:before, .clearfix:before {
     content: '';
     display: table;
  }
  .clearfix:after { /* For IE 6/7 (trigger hasLayout)*/
    clear: both;
  }
  .clearfix { *zoom:1; }
  ```
  ```css 
  .cl:after {
     content: '.';
     display: block; /* 使生成的元素以块级元素显示,占满剩余空间 */
     height: 0; /* 避免生成内容破坏原有布局的高度 */
     visibility: hidden; /* 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互 */
     clear: both;
  }
  .cl { *zoom:1; } /* 由于IE6-7不支持:after，使用 zoom:1触发 hasLayout */
  ```
  
#### `【延伸】` hasLayout  
  1. 定义 IE6-7的显示引擎使用的是一个称为布局（layout）的内部概念，由于这个显示引擎自身存在很多的缺陷，直接导致了IE6-7的很多显示bug。当我们说一个元素“得到 layout”，或者说一个元素“拥有 layout” 的时候，我们的意思是指它的微软专有属性 hasLayout http://msdn.microsoft.com/worksh ... rties/haslayout.asp 为此被设为了 true 。IE6-7使用布局的概念来控制元素的尺寸和定位，那些拥有布局（have layout）的元素负责本身及其子元素的尺寸设置和定位。如果一个元素的 hasLayout 为false，那么它的尺寸和位置由最近拥有布局的祖先元素控制。
  2. 触发条件
     - position: absolute
     - float: left|right
     - display: inline-block
     - width: 除 `auto` 外的任意值
     - height: 除 `auto` 外的任意值
     - zoom: 除 `normal` 外的任意值 (MSDN)
     - writing-mode: tb-rl (MSDN) 
     - `IE7` overflow: hidden|scroll|auto （ 这个属性在IE之前版本中没有触发 layout 的功能。 ）
     - `IE7` overflow-x|-y: hidden|scroll|auto （CSS3 盒模型中的属性，尚未得到浏览器的广泛支持。他们在之前IE版本中同样没有触发 layout 的功能）

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



