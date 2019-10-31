import React from 'react';
import ReactDOM from 'react-dom'
import Counter from './components/Counter'
import Panel from './components/Panel'

//globe css
import './style/scss.scss'

ReactDOM.render(<div><Counter/><Panel/></div>, document.getElementById('app'))
