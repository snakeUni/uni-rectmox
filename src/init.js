import Store from './store'

function init(models = {}) {
  const store = new Store();
  const keys = Object.keys(models);
  const newKeys = [...new Set(keys)]
  if (newKeys.length !== keys.length) {
    throw new Error('repeated model name')
  }
  keys.forEach(key => {
      store.state[key] = models[key].state || {};
      store.reducers[key] = models[key].reducers || {};
      store.effects[key] = models[key].effects || {};
  });
  return store;
}

export { init }