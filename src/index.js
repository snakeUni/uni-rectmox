import React, { Component } from 'react'

const { Provider, Consumer } = React.createContext(null)

export class Provider extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }
  render() {
    return (
      <Provider>
        {this.props.children}
      </Provider>
    )
  }
}