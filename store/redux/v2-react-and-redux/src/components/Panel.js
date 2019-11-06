import React, {Component} from 'react'
import store from '../store'
import actions from '../store/actions/theme'

window.store = store

export default class Panel extends Component {
  constructor() {
    super()
    this.state = {
      color: store.getState().theme
    }
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      this.setState({
        color: store.getState().theme
      })
    })
  }

  render() {
    return (
      <div className="panel-box">
        <div id="content" style={this.state.color}> Hello ~ Panel Color</div>
        <div className="btn-box">
          <button
            className="change-theme"
            id="to-blue"
            onClick={() => {
              store.dispatch(actions.changeColor('rgb(0, 51, 254)'))
            }}
          >
            Blue
          </button>
          <button
            className="change-theme"
            id="to-pink"
            onClick={() => {
              store.dispatch(actions.changeColor('rgb(247, 109, 132)'))
            }}
          >
            Pink
          </button>
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    this.unsub()
  }
}
