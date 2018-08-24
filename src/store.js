import { resolveAction } from './utils'
import { produce } from './state'

class Store {
  constructor() {
    this.subscribers = []
    this.state = {}
    this.reducers = {}
    this.effects = {}
  }
  init(models) {
    this.state = models.state || {}
    this.reducers = models.reducers || {}
    this.effects = models.effects || {}
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
    if (this.reducers[modelName][modelMethod]) {
      produce(this.state[modelName], state => {
        this.reducers[modelName][modelMethod].call(this, state[modelName], action.payload)
      }) 
      this.subscribers.forEach(listener => listener())
      return
    }
    produce(this.state[modelName], () => {
      this.effects[modelName][modelMethod].call(this, action.payload, rootState)
    })
    this.subscribers.forEach(listener => listener())
  }

  getState() {
    return this.state
  }
}

export default Store

