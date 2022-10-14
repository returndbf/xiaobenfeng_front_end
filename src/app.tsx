import {Component} from 'react'
import {Provider} from  "react-redux"
import 'taro-ui/dist/style/index.scss'
import './app.css'
import {store} from "./store/store";

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return(
      <Provider store={store}>
      {this.props.children}
      </Provider>
  )
  }
}

export default App
