### [] == '' and '' == []
```
if (两个操作数的类型是相同){
 // 同严格相等的比较规则一样（以下文会解释严格相等的比较规则）
} else if(两个操作数的类型不相同){
    if(null == undefined) {
        return true;
    } else if(a是数字，b是字符串){
        将字符串转换为数字，然后使用转换后的值进行比较。
    } else if(两个值中有一个是true的话){
        将其转换为1再进行比较
    } else if(两个值中有一个是false的话){
        将其转换为0再进行比较
    } else if(如果一个值是对象，另一个值是数字或字符串){
        将对象转换为原始值，转换规则在《Javascript权威指南第6版》书52页已经说明，下文具体说到对象转换为原始值的步骤
    }
}
    

```
### http缓存
### 深拷贝，拷贝fn
### webpack优化
### webpack生命周期
### dll vendor区别
### compose(fn1, fn2)
### event loop
