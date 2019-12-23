#### js继承实现方式优劣
##### 利用构造函数实现继承
1. 构造函数绑定<借用构造函数继承>
```javascript
function Parent() {
  this.species = 'Parent'
  this.data = { skin: 'yellow' }
}
function Child (name){
  // 使用apply、call将父类的构造函数绑定至子类上
  Parent.apply(this, arguments)
  this.name = name
}
var child = new Child('张三')
// 弊端：若目标对象拥有引用类型的值，会存在污染目标对象的问题，Paren每次都需要执行
```
2. prototype模式<原型链继承>
```javascript
function Parent() {
  this.species = 'Parent'
      this.data = { skin: 'yellow' }
}
function Child (name){
    this.name = name
}
Child.prototype = new Parent() // 此时Child.prototype.constructor指向了Parent
Child.prototype.constructor = Child // 修正child.prototype.constructor的指向
var child = new Child('张三')
// 弊端: 若目标对象拥有引用类型的值，会存在污染目标对象的问题，效率低，需要修正子类prototype.constructor指向和建立Parent实例
```
3. 直接继承prototype
```javascript
function Parent() {
    this.data = { skin: 'yellow' }
}
Parent.prototype.species = 'Parent'
function Child (name){
    this.name = name
}
Child.prototype = Parent.prototype
Child.prototype.constructor = Child // 修正child.prototype.constructor的指向
var child = new Child('张三')
// 优势：相对于prototype模式
// 弊端: 若目标对象拥有引用类型的值，会存在污染目标对象的问题，效率低，需要修正子类prototype.constructor指向和建立Parent实例
```

1. 组合继承(构造函数+原型链)
```javascript
function Parent(value) {
  this.value = value
}
Parent.prototype.getValue = function() {
  console.log(this.value)
}

// 弊端：若目标对象拥有引用类型的值，会存在污染目标对象的问题
```

##### 非构造构造函数方式实现继承
1. Object
```javascript
function objCopy(target) {
  function Child() {
    
  }
  Child.prototype = target
  return new Child()
}
// 弊端：若目标对象拥有引用类型的值，会存在污染目标对象的问题
```
2. 浅拷贝实现继承
```javascript
function shadowCopy(target) {
  var obj = {}
  for (var key in target) {
    obj[key] = target[key]
  }
  return obj
}
// 弊端：若目标对象拥有引用类型的值，会存在污染目标对象的问题
```
3. 深拷贝实现继承
```javascript
function deepCopy(target) {
  var obj = {}
    for (var key in target) {
      if (Array.isArray(target[key]) || typeof target[key] === 'object') {
        deepCopy(target[key])
      } else {
        obj[key] = target[key]
      }
    }
    return obj
}
// 弊端：性能开销大
```
#### 介绍UMD、CMD、AMD、ES6-module
#### 介绍http 1.0 2.0
#### 介绍https
#### 介绍输入url至页面呈现过程
#### 介绍this
#### 说说rem 优劣
#### 说说1px实现方式
#### 介绍xss csrf
#### 介绍同源策略、跨域
#### 介绍函数式编程(oop、面向过程)
#### 介绍重绘、重排
#### 介绍事件机制

```javascript
```

