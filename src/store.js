import { produce } from './state'
import { resolveAction } from './utils'

class Store {
  constructor() {
    this.subscribers = []
    this.state = {}
    this.reducers = {}
    this.effects = {}
    this.subscribe = this.subscribe.bind(this)
    this.dispatch = this.dispatch.bind(this)
    this.getState = this.getState.bind(this)
  }

  subscribe(listener){
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
  dispatch(action = {}){
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
    const payload = action.payload, dispatch = this.dispatch
    if (currentEffect) {
      this.state[modelName] = produce(this.state[modelName], state => {
        currentEffect({payload, dispatch, state, rootState})
      })
      this.subscribers.forEach(listener => listener())
      return
    }
    throw new Error(`${modelMethod} function not exist in ${modelName}`)  
  }

  getState() {
    return this.state
  }
}

export default Store

