### Vue常用开发实践 (for-java开发童鞋)

#### 代码复用
- 组件抽离 (单一原则)
- 业务公共逻辑Mixin抽离 
- 通用公共逻辑lib库 

#### Vue 常用最佳实践
- *template中* v-for 需要定义key，利于dom diff
- *template中* 根据枚举值进行逻辑判断时，优先考虑 v-if v-else-if
- *template中* 避免v-for v-if同时使用，优先考虑 computed
- *script* 开启的定时器、事件监听，在适当的时期进行清除（通常是组件销毁生命周期 destroyed）
- *style* 设置了scoped作用域的只会作用域当前组件，未设置作用域为全局可能存在样式污染

#### JS 常用最佳实践
- 循环遍历时，注意业务场景是否达到某条件时循环不再需要继续，优先考虑some, every，或者 for + break。forEach map 使用return break，
- 临时变量的重要性。访问路径越短访问次数越少，性能越好
- 解构赋值大法好！很大程度能解决数据解析异常造成的报错
```javascript
// 对象解构赋值
const REPONSE_BODY_OBJECT = {
    homer: {
        images: ['1.png', '2.png'], // 服务端异常（没返回|返回null），前端遍历解析报错
    },
}
const { homer: { images = [] } = {} } = REPONSE_BODY_OBJECT

// 数组解构赋值
const REPONSE_BODY_ARRAY = [1, 2, 3]
const [a, b, c] = REPONSE_BODY_ARRAY

// 混合解构赋值
const REPONSE_BODY_MIXIN = {
    status: 'SUCCESS',
    results: [{
        nick_name: '彭䶮',
    }],
}
const { results: [{ nick_name: nickName = '我在家用户' }] = [{}] } = REPONSE_BODY_MIXIN
```
- 类数组聚合优先考虑reduce，减少临时变量的开辟
- 尽量避免循环遍历中做触发视图变更的赋值操作

### 参考资料:

- Vue文档： [Vue](https://cn.vuejs.org/v2/api/)
- Vue-router文档: [Vue-router](https://router.vuejs.org/zh-cn/)
- Vuex文档: [Vuex](https://vuex.vuejs.org/zh/guide/)
- Js标准文档: [js](http://javascript.ruanyifeng.com/)
- Es6文档: [es6](http://es6.ruanyifeng.com/#docs/intro)
- ElementUI: [ElementUI](https://element.faas.ele.me/#/zh-CN/component/installation)
- Vue规范: [Vue](https://shimo.im/docs/gUz9S0GZU9oeLDIQ/)
- Scss规范: [Scss](https://shimo.im/docs/C3j8TGGXWvk7wIkn/)
- esLint规范: [esLint规范](https://shimo.im/docs/jjbGuvhvaWsUUZCD/)
- Css规范: [css](https://shimo.im/docs/D4ALcMiJjKoBNolK/)
- Js规范: [js规范](https://shimo.im/docs/iA49gMWzWRMGatbW/)
