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

function mapProps(storeText, currentState, namespace) {
  if (typeof namespace !== 'string') {
    throw new Error('namespace must be string')
  }
  if (Object.toString.call(currentState) !== '[object Array]') {
    throw new Error('state must be a array')
  }
  const currentStoreState = storeText[namespace]
  const result = {}
  currentState.forEach(state => {
    result[state] = currentState[state]
  })
  return result
}

function mapDispatch(storeDispatches, currentDispatch, namespace) {
  
}

export { resolveAction }