function combineModels(models = {}) {
  const state = {}
  const reducers = {}
  const effects = {}
  Object.keys(models).forEach(key => {
    if (models[key]) {
      state[key] = models[key].state
      reducers[key] = models[key].reducers
      effects[key] = models[key].effects
    }
  })
  return {
    state,
    reducers,
    effects
  }
}

export { combineModels }