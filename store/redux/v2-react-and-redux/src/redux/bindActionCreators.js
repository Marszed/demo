function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}

function bindActionCreators(actionCreator, dispatch) {
  if (typeof actionCreator === 'function') {
    bindActionCreator(actionCreator, dispatch) // 调用时，dispatch 这个函数的返回值
  } else if (typeof actionCreator === 'object') {
    const boundActionCreators = {}
    for (let key in actionCreator) {
      boundActionCreators[key] = bindActionCreator(actionCreator[key], dispatch)
    }
    return boundActionCreators
  }
}

export default bindActionCreators
