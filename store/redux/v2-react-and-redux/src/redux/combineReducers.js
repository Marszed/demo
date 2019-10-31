/**
 * 未避免单一reducer冗长，以及不变业务数据隔离区分，来个Higher-Order function做合并
 * @param reducers
 * @returns {function(*=, *=): *}
 */

export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let newState = {}
    let hasChanged = false
    for(let key in reducers) {
      const preStateByKey = state(key)
      const nextStateByKey = reducers[key](preState, action)
      newState[key] = nextStateByKey
      hasChanged = hasChanged || preStateByKey !== nextStateByKey
    }
    return hasChanged ? newState : state // 未避免冗余渲染，对数据做变更记录，数据没有变化时返回原state
  }
}

