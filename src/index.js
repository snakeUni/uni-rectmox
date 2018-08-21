import React, { Component } from 'react'

const { Provider, Consumer } = React.createContext(null)

export class Provider extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }
  render() {
    return (
      <Provider value={this.store}>
        {this.props.children}
      </Provider>
    )
  }
}

export const map = (state = {}, reducers = {}, effects = {}) => Component => {
  return class wrapComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        mapProps: {}
      }
    }
  }
}