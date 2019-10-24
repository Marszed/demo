const createStore = function (reducer) {
    const listeners = [] // 监听队列
    let state // 数据源

    const getState = () => state // 获取数据

    const dispatch = action => { // 数据变更
        state = reducer(action, state) // 根据action.type派发数据变更行为
        listeners.forEach(fn => fn()) // 通知订阅
    }

    const subscribe = (fn) => {
        listeners.push(fn) // 添加订阅

        const unSubscribe = () => listeners = listeners.filter(l => l !== fn) // 取消订阅

        return unSubscribe
    }

    dispatch({ type: `@@redux/__INIT__${Math.random()}` }) // 触发一个几乎不可能的action, 得到初始state

    return {
        getState,
        dispatch,
        subscribe
    }
}

const reducer = (action = {}, state = { count: 0 }) => { // 根据不同的type变更数据，并返回新的state
    switch (action.type) {
        case 'ADD': return {
            count: state.count + 1
        }
        case 'DELETE': return {
            count: state.count - 1
        }
        case 'UPDATE': return {
            count: state.count
        }
        default:
            return state
    }
}

/**
 * 业务逻辑
 */

(function () {
    const countDeleteBtn = document.querySelector('#countDelete')
    const countAddBtn = document.querySelector('#countAdd')
    const countContent = document.querySelector('#countContent')

    const initState = {
        count: 0
    }
    const store = createStore(reducer)

    function appRender(state) {
        contentRender(state)
    }

    function contentRender({ count }) {
        countContent.innerHTML = count
    }

    countAddBtn.onclick = function () {
        store.dispatch({ type: 'ADD' })
    }

    countDeleteBtn.onclick = function () {
        store.dispatch({ type: 'DELETE' })
    }

    appRender(store.getState())

    store.subscribe(() => appRender(store.getState()))
})()