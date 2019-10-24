const createStore = function (reducer) {
    let listeners = [] // 监听队列
    let state // 数据源

    const getState = () => state // 获取数据

    const dispatch = action => { // 数据变更
        state = reducer(action, state) // 根据action.type派发数据变更行为
        listeners.forEach(fn => fn()) // 通知订阅
    }

    const subscribe = (fn) => {
        listeners.push(fn) // 添加订阅

        const unSubscribe = () => { // 取消订阅
            listeners = listeners.filter(l => l !== fn)
        }

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
    const disable = document.querySelector('#disable')

    const initState = {
        count: 0
    }
    const store = createStore(reducer)

    appRender(store.getState())

    const unSub = store.subscribe(() => appRender(store.getState()))

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

    disable.onclick = function () {
        unSub()
    }
})()

/**
 * Note
 * Redux: 一个状态容器(维护在js内存中-store)，提供可预测化的转改管理
 * 通过 dispatch 不同的 action 动作触发状态修改
 * reducer 接收旧的 state 与 action 返回新的 state
 * 通过 subscribe，当触发 dispatch 时触发所有订阅者
 */