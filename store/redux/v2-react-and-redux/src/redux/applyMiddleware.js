import compose from './compose'

const applyMiddleware = (...middleWares) => createStore => (...args) => {
  let store = createStore(...args)
  let dispatch
  const middlewareAPI = {
    getState: store.getstate,
    dispatch: (...args) => dispatch(...args)
  }
  let middles = middleWares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...middles)(store.dispatch)
  return {
    ...store,
    dispatch
  }
}

export default applyMiddleware
