import React, { Component } from 'react'

const Context = React.createContext(null)

export class Provider extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }
  render() {
    return (
      <Context.Provider>
        {this.props.children}
      </Context.Provider>
    )
  }
}