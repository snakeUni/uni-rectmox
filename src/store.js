import { resolveAction } from './utils'
import { produce } from './state'

class Store {
  constructor() {
    this.subscribers = []
    this.state = {}
    this.reducers = {}
    this.effects = {}
  }

  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function')
    }
    const that = this
    this.subscribers.push(listener)
    return function unsubscribe() {
      that.subscribes.filter(sub => sub !== listener)
    }
  }

  dispatch(action = {}) {
    const rootState = this.state
    const { modelName, modelMethod } = resolveAction(action)
    const currentReducer = this.reducers[modelName][modelMethod]
    if (currentReducer) {
      this.state = produce(this.state[modelName], state => {
        currentReducer(state[modelName], action.payload)
      }) 
      this.subscribers.forEach(listener => listener())
      return
    }
    const currentEffect = this.effects[modelName][modelMethod]
    this.state = produce(this.state[modelName], state => {
      currentEffect(action.payload, rootState, state[modelName])
    })
    this.subscribers.forEach(listener => listener())
  }

  getState() {
    return this.state
  }
}

export default Store

