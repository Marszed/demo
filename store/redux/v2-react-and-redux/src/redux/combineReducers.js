/**
 * 未避免单一reducer冗长，以及不变业务数据隔离区分，来个Higher-Order function做合并
 * 入参多个reducer组成的对象, 返回合并后的reducer
 * 每个reducer只处理全局state中自己负责的部分
 * @returns {function(*=, *=): *}
 */

export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    const newState = {}
    let hasChanged = false
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in reducers) {
      const preStateByKey = state[key]
      const nextStateByKey = reducers[key](preStateByKey, action)
      newState[key] = nextStateByKey
      hasChanged = hasChanged || preStateByKey !== nextStateByKey
    }
    return hasChanged ? newState : state // 为避免冗余渲染，对数据做变更记录，数据没有变化时返回原state
  }
}

