import React, { Component } from 'react'
import { observe } from '../index'

@observe({
  namespace: 'count',
  state: ['number'],
  reducers: ['increment'],
  effects: ['asyncIncrement']
})
class Count extends Component {
  constructor(props){
    super(props)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.asyncIncrement = this.asyncIncrement.bind(this)
  }

  increment() {
    this.props.increment(1)
  }

  decrement() {
    this.props.decrement(1)
  }

  asyncIncrement() {
    this.props.asyncIncrement(1)
  }
  
  render() {
    const props = this.props
    return (
      <div>
        <button onClick={this.increment}>增加</button>
        <button onClick={this.decrement}>减少</button>
        <button onClick={this.asyncIncrement}>异步增加</button>
        {props.number}
      </div>
    )
  }
}

export default Count