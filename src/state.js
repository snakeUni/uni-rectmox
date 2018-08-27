const PROXY_TARGET = 'proxy_target'
class State {
  constructor(baseState) {
    this.baseState = baseState
  }

  get(key) {
    return this.baseState[key]
  }

  set(key, value) {
    const newState = { [key]: value }
    this.baseState = Object.assign({}, this.baseState, newState)
    return true
  }
}

const handler = {
  get(target, key) {
    if (key === 'proxy_target') return target
    return target.get(key)
  },
  set(target, key, value) {
    return target.set(key, value)
  }
}

export function produce(baseState, producer) {
  const state = new State(baseState)
  const proxy = new Proxy(state, handler)
  producer(proxy)
  const alternateState = proxy[PROXY_TARGET]
  return alternateState.baseState
}