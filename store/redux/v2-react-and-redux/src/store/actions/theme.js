import {CHANGE_COLOR} from '../action-types'

const theme = {
  changeColor(color) {
    return {
      type: CHANGE_COLOR,
      color
    }
  }
}

export default theme
