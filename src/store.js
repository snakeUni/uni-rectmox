import { resolveAction } from './utils'
import { produce } from './state'

class Store {
  constructor() {
    this.subscribers = []
    this.state = {}
    this.reducers = {}
    this.effects = {}
  }

  subscribe = listener => {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function')
    }
    const that = this
    this.subscribers.push(listener)
    return function unsubscribe() {
      that.subscribes.filter(sub => sub !== listener)
    }
  }

  // dispatch
  dispatch = (action = {}) => {
    const rootState = this.state
    const { modelName, modelMethod } = resolveAction(action)
    const currentReducer = this.reducers[modelName][modelMethod]
    if (currentReducer) {
      this.state[modelName] = produce(this.state[modelName], state => {
        currentReducer(state, action.payload)
      }) 
      this.subscribers.forEach(listener => listener())
      return
    }
    const currentEffect = this.effects[modelName][modelMethod]
    if (currentEffect) {
      this.state[modelName] = produce(this.state[modelName], state => {
        currentEffect(action.payload, this.dispatch, {rootState, state})
      })
      this.subscribers.forEach(listener => listener())
      return
    }
    throw new Error('function is not existed')  
  }

  getState() {
    return this.state
  }
}

export default Store

