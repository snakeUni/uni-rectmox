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

function resolveAction(action = {}) {
  if(!action.type) {
    throw new Error('type is must for action')
  }
  const newAction = action.type.split('/')
  return {
    modelName: newAction[0],
    modelMethod: newAction[1]
  }
}

export {combineModels, resolveAction}