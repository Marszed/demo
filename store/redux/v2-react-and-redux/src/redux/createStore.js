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
    state = reducer(action, state) // 根据action.type派发数据变更行为
    listeners.forEach(fn => fn()) // 通知订阅
  }

  const subscribe = (fn) => {
    listeners.push(fn) // 添加订阅

    return () => { // 取消订阅
      listeners = listeners.filter(l => l !== fn)
    }
  }

  dispatch({ type: `@@redux/__INIT__${Math.random()}` }) // 触发一个几乎不可能的action, 得到初始state

  return {
    getState,
    dispatch,
    subscribe
  }
}
