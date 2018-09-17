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

function mapProps(storeText, currentState, modelName) {
  if (typeof modelName !== 'string') {
    throw new Error('modelName must be string')
  }
  if (!Array.isArray(currentState)) {
    throw new Error('state must be a array')
  }
  const currentStoreState = storeText[modelName]
  const result = {}
  currentState.forEach(state => {
    result[state] = currentStoreState[state]
  })
  return result
}

function mapDispatch(storeDispatches, currentDispatch, modelName, dispatch) {
  if (typeof modelName !== 'string') {
    throw new Error('modelName must be string')
  }
  if (!Array.isArray(currentDispatch)) {
    throw new Error('state must be a array')
  }
  const dispatchs = {}
  const currentStoreDispatch = storeDispatches[modelName]
  currentDispatch.forEach(dispatchItem => {
    if (currentStoreDispatch.hasOwnProperty(dispatchItem)) {
      dispatchs[dispatchItem] = payload => {
        dispatch({ type: `${modelName}/${dispatchItem}`, payload: payload })
      }
    } else {
      throw new Error(`${dispatchItem} function is not defined`)
    }
  })
  return dispatchs
}

function shallowCopy(value) {
  if (Array.isArray(value)) return value.slice()
  const target = value.__proto__ === undefined ? Object.create(null) : {}
  return assign(target, value)
}

const assign =
  Object.assign ||
  function assign(target, value) {
    for (let key in value) {
      if (has(value, key)) {
        target[key] = value[key]
      }
    }
  return target
}

function has(thing, prop) {
  return Object.prototype.hasOwnProperty.call(thing, prop)
}

function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

export { resolveAction, mapProps, mapDispatch, shallowCopy, is }