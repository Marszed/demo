import {COUNT_ADD, COUNT_MINUS} from '../action-types'

export default function counter(state = { number: 0 }, action) {
  switch (action.type) {
    case COUNT_ADD:
      return {
        ...state,
        number: state.number + action.number
      }
    case COUNT_MINUS:
      return {
        ...state,
        number: state.number - action.number
      }
    default:
      return state
  }
}
