import { COUNT_ADD, COUNT_MINUS } from '../action-types'

const counter = {
    add(number) {
        return {
            type: COUNT_ADD,
            number
        }
    },
    minus(number) {
        return {
            type: COUNT_MINUS,
            number
        }
    }
}

export default counter
