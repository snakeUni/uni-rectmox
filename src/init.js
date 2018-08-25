import Store from './store'

function init(models = {}) {
  const store = new Store();
  const keys = Object.keys(models);
  keys.forEach(key => {
      store.state[key] = models[key].state || {};
      store.reducers[key] = models[key].reducers || {};
      store.effects[key] = models[key].effects || {};
  });
  return store;
}

export { init }