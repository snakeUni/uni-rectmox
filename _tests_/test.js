import React from 'react'
import { resolveAction, shallowCopy, is } from '../utils'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { init, Provider } from '../index'
import Store from '../store'
import Count from './count'

describe('test for remox', () => {
  test('resolveAction', () => {
    expect(resolveAction({ type: 'count/number' })).toEqual({
      modelName: 'count',
      modelMethod: 'number'
    })
  })
  test('shallowCopy', () => {
    const target = {
      a: 1,
      b: 2
    }
    expect(shallowCopy(target)).toEqual({
      a: 1,
      b: 2
    })
  })
  test('is', () => {
    expect(is(1, 1)).toBe(true)
    expect(is(0, 0)).toBe(true)
    expect(is(+0, -0)).toBe(false)
    expect(is(0, false)).toBe(false)
    expect(is(false, null)).toBe(false)
    expect(is(false, undefined)).toBe(false)
    expect(is(undefined, undefined)).toBe(true)
    expect(is(null, null)).toBe(true)
    expect(is(NaN, NaN)).toBe(true)
  })
})

describe('count', () => {
  describe('count renders', () => {
    it('renders correctly', () => {
      const wrapper = renderer.create(<Count />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('init', () => {
    it('init correctly', () => {
      const count = {
        state: {
          number: 1
        },
        reducers: {
          increment: (state, payload) => { state.number += payload}
        },
        effects: {
          asyncIncrement: ({payload, dispatch}) => {
            new Promise(resolve => {
              setTimeout(resolve, 2000);
          }).then(() => {
              dispatch({type: 'count/increment', payload });
          })
          }
        }
      }
      const store = init({count})
      const storeCopy = new Store()
      storeCopy.state = { count: { number: 1 }}
      storeCopy.reducers = { count: { increment: count.reducers.increment}}
      storeCopy.effects = { 
        count: { 
          asyncIncrement: count.effects.asyncIncrement
        }
      }
      expect(store.state).toEqual(storeCopy.state)
      expect(store.reducers).toEqual(storeCopy.reducers)
      expect(store.effects).toEqual(storeCopy.effects)
    })
  })
  describe('dom test', () => {
    const count = {
      state: {
        number: 1
      },
      reducers: {
        increment: (state, payload) => { state.number += payload}
      },
      effects: {
        asyncIncrement: ({payload, dispatch}) => {
          new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).then(() => {
            dispatch({type: 'count/increment', payload });
        })
        }
      }
    }
    const store = init({count})
    const provide = (
      <Provider store={store}>
        <Count />
      </Provider>
    )
    const countProvide = shallow(provide)
    expect(countProvide.text()).toEqual(1)
  })
})

