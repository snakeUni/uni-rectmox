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

export const map = (namespace, state = [], reducers = [], effects = []) => Component => {
  return class wrapComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        mapProps: {}
      }
      this.namespace = namespace
    }
    mapStateToProps = () => {
      const stateToProps = mapProps(this.store.state, state, this.namespace)
      return stateToProps
    }

    mapReducersToProps = () => {
      const reducersToProps = mapDispatch(this.store.reducers, reducers, this.namespace)
      return reducersToProps
    }

    mapEffectsToProps = () => {
      const effectsToProps = mapDispatch(this.store.effects, effects, this.namespace)
      return effectsToProps
    }
    
    render() {
      return (
        <Consumer>
          {store => {
            this.store = store
            return <Component {...this.state.mapProps} />
          }}
        </Consumer>
      )
    }
  }
}