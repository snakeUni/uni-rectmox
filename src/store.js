class Store {
  constructor() {
    this.subscribers = []
    this.state = {}
    this.reducers = {}
    this.effects = {}
    this.dispatch  = this.dispatch.bind(this)
  }
  init(models) {
    this.state = models.state || {}
    this.reducers = models.reducers || {}
    this.effects = models.effects || {}
  }

}