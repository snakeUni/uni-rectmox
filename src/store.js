import { resolveAction } from './utils'

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
      this.reducers[modelName][modelMethod].call(this, this.state[modelName], action.payload)
      return
    }
    return this.effects[modelName][modelMethod].call(this, action.payload, rootState)
  }

  getState() {
    return this.state
  }
}

