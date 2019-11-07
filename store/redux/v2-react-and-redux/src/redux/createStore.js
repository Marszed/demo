/**
 * Note
 * Redux: 一个状态容器(维护在js内存中-store)，提供可预测化的转改管理
 * 通过 dispatch 不同的 action 动作触发状态修改
 * reducer 接收旧的 state 与 action 返回新的 state
 * 通过 subscribe，当触发 dispatch 时触发所有订阅者
 */

export default function createStore(reducer) {
  let listeners = [] // 监听队列
  let state // 数据源

  const getState = () => state // 获取数据

  const dispatch = action => { // 数据变更
    state = reducer(state, action) // 根据action.type派发数据变更行为
    listeners.forEach(fn => fn()) // 通知订阅
  }

  const subscribe = (fn) => {
    listeners.push(fn) // 添加订阅

    return () => { // 取消订阅
      listeners = listeners.filter(l => l !== fn)
    }
  }

  dispatch({type: `@@redux/__INIT__${Math.random()}`}) // 触发一个几乎不可能的action, 得到初始state

  return {
    getState,
    dispatch,
    subscribe
  }
}

// creatStore 包含的四个部分
// getState 获取最新的state
// dispatch 派发action至reducer，计算最新的state
// subscribe 实现订阅功能，每次触发 dispatch 的时候，会执行订阅函数
// replaceReducer 替换 reducer 函数, 按需加载的时候，reducer也可以跟着组件在必要的时候再加载，然后用新的 reducer 替换老的 reducer。
