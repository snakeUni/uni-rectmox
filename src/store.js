class Store {
  constructor() {
    this.subscribers = []
    this.state = {}
    this.reducers = {}
    this.effects = {}
    // 通过dispatch来改变值,用法dispatch.count.increase
    this.dispatch  = {}
  }
  init(models) {
    this.state = models.state || {}
    this.reducers = models.reducers || {}
    this.effects = models.effects || {}
    this.dispatch = new Store() || {}
  }

  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function')
    }
    const that = this
    this.subscribers.push(callback)
    return function() {
      that.subscribes.filter(sub => sub !== callback)
    }
  }

  
}