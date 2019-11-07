import timeMiddleware from './timeMiddleware'
import {createStore, applyMiddleware} from '../redux'
import reducer from './reducers'


export default applyMiddleware(timeMiddleware)(createStore)(reducer)
