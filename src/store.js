/**
 * 暂无无法对dispatch的函数进行区分是reducers里面还是effects里面
 * 所以用commit来触发reducers，而用dispatch来触发effects
 */
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

  dispatch() {

  }

  commit() {

  }

}