import compose from './compose'

// 日志记录中间件
const applyMiddleware = (...middleWares) => createStore => (...args) => {
  const store = createStore(...args)
  let dispatch
  const middlewareAPI = {
    getState: store.getState, // 最小开放原则 只提供getState给中间件
    // eslint-disable-next-line no-shadow
    dispatch: (...args) => dispatch(...args)
  }
  const middles = middleWares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...middles)(store.dispatch) // 返回重写后的dispatch
  return {
    ...store,
    dispatch
  }
}

export default applyMiddleware
