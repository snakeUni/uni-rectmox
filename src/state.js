import { shallowCopy, is } from './utils'

const PROXY_STATE = typeof Symbol !== 'undefined' ? Symbol('remox-proxy-state') : '_$remox_state'
class State {
  constructor(baseState) {
    this.baseState = baseState
    this.copy = null
    // this tree is modified
    this.modified = false
  }

  get(prop) {
    const state = this.source()
    return state[prop]
  }

  set(prop, value) {
    if (!this.modified) {
      if (prop in this.baseState && is(this.baseState[prop], value)) 
        return true
      this.markChanged()
    }
    this.copy[prop] = value
    return true
  }

  markChanged() {
    if (!this.modified) {
      this.modified = true 
      this.copy = shallowCopy(this.baseState)
    }
  }

  source() {
    return this.modified === true ? this.copy : this.baseState
  }

}

const handler = {
  get(state, prop) {
    if (prop === PROXY_STATE) return state
    return state.get(prop)
  },
  set(state, prop, value) {
    return state.set(prop, value)
  }
}

export function produce(baseState, producer) {
  const state = new State(baseState)
  const proxy = new Proxy(state, handler)
  producer(proxy)
  const alternateState = proxy[PROXY_STATE]
  if (alternateState.modified) {
    return alternateState.copy
  }
  return alternateState.baseState
}