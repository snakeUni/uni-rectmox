// 受immerJs的启发
const PROXY_TARGET = 'proxy_target'
class State {
  constructor(baseState) {
    this.baseState = baseState
    this.copy = undefined
    // 用来判断是否被修改
    this.modified = false
    this.finalized = false
    this.parent = null
    this.proxies = {}
    //true: value was assigned to these props, false: was removed
    this.assigned = {}
  }

  get(prop) {
    const state = this.source()
    return state[prop]
  }

  set(prop, value) {
    this.assigned[prop] = true
    const newState = { [prop]: value }
    this.baseState = Object.assign({}, this.baseState, newState)
    return true
  }

  markChanged() {
    if (!this.modified) {
      this.modified = true
    }
  }

  source() {
    return this.modified === true ? this.copy : this.baseState
  }

}

const handler = {
  get(state, prop) {
    if (prop === PROXY_TARGET) return state
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
  const alternateState = proxy[PROXY_TARGET]
  return alternateState.baseState
}