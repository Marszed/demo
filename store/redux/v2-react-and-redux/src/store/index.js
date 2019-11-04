import reduxLogger from 'redux-logger'
import {createStore, applyMiddleware} from '../redux'
import reducer from './reducers'

export default applyMiddleware(reduxLogger)(createStore)(reducer)
