const timeMiddleware = (store) => (next) => (action) => {
  /*eslint-disable*/
  console.log(`action.type ${action.type}`)
  console.log(`pre --> time ${new Date().getTime()}, state ${JSON.stringify(store.getState())}`)
  next(action)
  console.log(`current --> time ${new Date().getTime()}, state ${JSON.stringify(store.getState())}`)
  console.log('')
}

export default timeMiddleware
