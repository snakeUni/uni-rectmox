import React, { Component } from 'react'
import { mapProps, mapDispatch } from './utils'

const Context = React.createContext(null)

export class Provider extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }
  render() {
    return (
      <Context.Provider value={this.store}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const observe = ({ modelName, state = [], reducers = [], effects = [] }) => Component => {
  return class wrapComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        mapProps: {}
      }
      this.modelName = modelName
    }

    componentDidMount() {
      this.unsubscribe = this.store.subscribe(this.setProps)
      this.setProps()
    }
    ComponentWillUnMount() {
      this.unsubscribe()
    }
    mapStateToProps() {
      const stateToProps = mapProps(this.store.state, state, this.modelName)
      return stateToProps
    }

    mapReducersToProps() {
      const reducersToProps = mapDispatch(this.store.reducers, reducers, this.modelName, this.store.dispatch)
      return reducersToProps
    }

    mapEffectsToProps() {
      const effectsToProps = mapDispatch(this.store.effects, effects, this.modelName, this.store.dispatch)
      return effectsToProps
    }

    setProps() {
      const stateToProps = this.mapStateToProps()
      const reducersToProps = this.mapReducersToProps()
      const effectsToProps = this.mapEffectsToProps()
      this.setState({
        mapProps: {
          ...this.state.mapProps,
          ...stateToProps,
          ...reducersToProps,
          ...effectsToProps
        }
      })
    }
    
    render() {
      return (
        <Context.Consumer>
          {store => {
            this.store = store
            return <Component {...this.state.mapProps} store={store}/>
          }}
        </Context.Consumer>
      )
    }
  }
}