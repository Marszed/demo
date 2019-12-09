HelloWorld.vue -> vue-loader -> vue-template-compiler(script,style,template) -> AST -> generate
-> render (return VNode) -> update -> patch old VNode -> dif -> real Dom 

#### .vue文件到真实Dom整个流程

1. webpack构建时，匹配到.vue文件交由vue-loader进行代码转换预处理
``` json
const webpackConfig = {
  ....
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
    ],
  },
}
```

2. vue-loader@^15.7.2
-. parse方法将source code交由`vue-template-loader@^2.6.10`处理(通过lru-cache做缓存，优化编译性能), 返回template、script、 styles
-. 其中会处理webpack vue rules.option各种指定loader(譬如: sass-loader、less-loader等)
``` javascript
const {
    source,
    filename = '',
    compiler,
    compilerParseOptions = { pad: 'line' } as VueTemplateCompilerParseOptions,
    sourceRoot = '',
    needMap = true
  } = options
  const cacheKey = hash(filename + source)
  let output: SFCDescriptor = cache.get(cacheKey)
  if (output) return output
  output = compiler.parseComponent(source, compilerParseOptions)
```
![vue-loader](https://github.com/Marszed/demo/blob/master/img/WechatIMG1.png)

3. Vue.prototype.$mount Api
- 执行mount时，若`render`方法不存在会将`template`进行`compileToFunctions`运行时编译得到`render`与`staticRenderFns`。`render`返回的是VNode节点供渲染以及update的时候进行patch
``` javascript
// 将不带编译的$mount方法缓存起来
const mount = Vue.prototype.$mount
// 重写Vue.prototype.$mount，添加模板编译
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  // 处理模板templete，编译成render函数，render不存在的时编译template，否则优先使用render
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
    // 获取element的outerHTML
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

     // 将template编译成render函数，这里会有render以及staticRenderFns两个返回，staticRenderFns是编译优化，static静态不需要在VNode更新时进行patch，优化性能
     
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}
```

4. new Vue实例化this_init，初始化(props、data、lifeStyle、render等),$mount

``` javascript
Vue.prototype._init = function (options?: Object) {    const vm: Component = this
    // a uid
    vm._uid = uid++    let startTag, endTag    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-init:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }    // a flag to avoid this being observed
    /*一个防止vm实例自身被观察的标志位*/
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }    // expose real self
    vm._self = vm    /*初始化生命周期*/
    initLifecycle(vm)    /*初始化事件*/
    initEvents(vm)    /*初始化render*/
    initRender(vm)    /*调用beforeCreate钩子函数并且触发beforeCreate钩子事件*/
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    /*初始化props、methods、data、computed与watch*/
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    /*调用created钩子函数并且触发created钩子事件*/
    callHook(vm, 'created')    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {      /*格式化组件名*/
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`${vm._name} init`, startTag, endTag)
    }    if (vm.$options.el) {      /*挂载组件*/
      vm.$mount(vm.$options.el)
    }
  }
```

5. `compileToFunctions`

``` javascript
  /*带缓存的编译器，同时staticRenderFns以及render函数会被转换成Funtion对象*/
  function compileToFunctions (
    template: string,
    options?: CompilerOptions,
    vm?: Component
  ): CompiledFunctionResult {
    options = options || {}

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1')
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          )
        }
      }
    }
    /*Github:https://github.com/answershuto*/
    // check cache
    /*有缓存的时候直接取出缓存中的结果即可*/
    const key = options.delimiters
      ? String(options.delimiters) + template
      : template
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    /*编译*/
    const compiled = compile(template, options)

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn(
          `Error compiling template:\n\n${template}\n\n` +
          compiled.errors.map(e => `- ${e}`).join('\n') + '\n',
          vm
        )
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(msg => tip(msg, vm))
      }
    }

    // turn code into functions
    const res = {}
    const fnGenErrors = []
    /*将render转换成Funtion对象*/
    res.render = makeFunction(compiled.render, fnGenErrors)
    /*将staticRenderFns全部转化成Funtion对象 */
    const l = compiled.staticRenderFns.length
    res.staticRenderFns = new Array(l)
    for (let i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors)
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          `Failed to generate render function:\n\n` +
          fnGenErrors.map(({ err, code }) => `${err.toString()} in\n\n${code}\n`).join('\n'),
          vm
        )
      }
    }

    /*存放在缓存中，以免每次都重新编译*/
    return (functionCompileCache[key] = res) 
  }
```

6. `compile`
``` javascript
  /*编译，将模板template编译成AST、render函数以及staticRenderFns函数*/
  function compile (
    template: string,
    options?: CompilerOptions
  ): CompiledResult {
    const finalOptions = Object.create(baseOptions)
    const errors = []
    const tips = []
    finalOptions.warn = (msg, tip) => {
      (tip ? tips : errors).push(msg)
    }

    /*做下面这些merge的目的因为不同平台可以提供自己本身平台的一个baseOptions，内部封装了平台自己的实现，然后把共同的部分抽离开来放在这层compiler中，所以在这里需要merge一下*/
    if (options) {
      // merge custom modules
      /*合并modules*/
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules)
      }
      // merge custom directives
      if (options.directives) {
        /*合并directives*/
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        )
      }
      // copy other options
      for (const key in options) {
        /*合并其余的options，modules与directives已经在上面做了特殊处理了*/
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key]
        }
      }
    }

    /*基础模板编译，得到编译结果*/
    const compiled = baseCompile(template, finalOptions)
    if (process.env.NODE_ENV !== 'production') {
      errors.push.apply(errors, detectErrors(compiled.ast))
    }
    compiled.errors = errors
    compiled.tips = tips
    return compiled
  }
```

7. `baseCompile` 首先会将模板template进行parse得到一个AST，再通过optimize做一些优化，最后通过generate得到render以及staticRenderFns

8. `parse` 通过正则等方式解析template模板中的指令、class、style等数据，形成AST

9. `optimize`的主要作用是标记static静态节点，这是Vue在编译过程中的一处优化，后面当update更新界面时，会有一个patch的过程，diff算法会直接跳过静态节点，从而减少了比较的过程，优化了patch的性能

10. `generate`是将AST转化成render function字符串的过程，得到结果是render的字符串以及staticRenderFns字符串。

11. `render`函数最后会返回一个VNode节点，在_update的时候，经过patch与之前的VNode节点进行比较，得出差异后将这些差异渲染到真实的DOM上
```javascript
  /*处理v-once的渲染函数*/
  Vue.prototype._o = markOnce
  /*将字符串转化为数字，如果转换失败会返回原字符串*/
  Vue.prototype._n = toNumber
  /*将val转化成字符串*/
  Vue.prototype._s = toString
  /*处理v-for列表渲染*/
  Vue.prototype._l = renderList
  /*处理slot的渲染*/
  Vue.prototype._t = renderSlot
  /*检测两个变量是否相等*/
  Vue.prototype._q = looseEqual
  /*检测arr数组中是否包含与val变量相等的项*/
  Vue.prototype._i = looseIndexOf
  /*处理static树的渲染*/
  Vue.prototype._m = renderStatic
  /*处理filters*/
  Vue.prototype._f = resolveFilter
  /*从config配置中检查eventKeyCode是否存在*/
  Vue.prototype._k = checkKeyCodes
  /*合并v-bind指令到VNode中*/
  Vue.prototype._b = bindObjectProps
  /*创建一个文本节点*/
  Vue.prototype._v = createTextVNode
  /*创建一个空VNode节点*/
  Vue.prototype._e = createEmptyVNode
  /*处理ScopedSlots*/
  Vue.prototype._u = resolveScopedSlots

  /*创建VNode节点*/
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
```






