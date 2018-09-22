# Rectmox

[![Build Status](https://travis-ci.org/snakeUni/rectmox.svg?branch=master)](https://travis-ci.org/snakeUni/rectmox)
[![NPM version](https://img.shields.io/npm/v/rectmox.svg?style=flat-square)](https://www.npmjs.com/package/rectmox)
[![node version](https://img.shields.io/badge/node.js-%3E=_8.0-green.svg?style=flat-square)](http://nodejs.org/download/)
[![npm download](https://img.shields.io/npm/dm/rectmox.svg?style=flat-square)](https://www.npmjs.com/package/rectmox)

## 安装
```
npm install rectmox or yarn add rectmox
```
## 特征
- [x] 使用react最新的createContext Api
- [x] 不依赖于任何其他库
- [x] 和rematch具有相似的api
- [x] 使用es6的proxy，使用起来更为简单

## 使用
### 在顶层用provide包裹，初始化store
```
import { init, Provide } from reactmox
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.js

const count = {
  state: {number: 1},
  reducers: {
    increase:(state, payload) => {
      state.number += payload
    }
  },
  effects: {
    asyncIncrease: ({payload, dispatch}) => {
      new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
      }).then(() => {
          dispatch({type: 'count/increment', payload });
      });
    }
  }
}

const store = init({count})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
```
### app.js
```
import React, { Component } from 'react';
import { observe } from 'rectmox';

@observe({
    modelName: 'count',
    state: ['number'],
    reducers: ['increment', 'decrement'],
    effects: ['aysncIncrement']
})
class Demo extends Component {
    constructor(props) {
        super(props);
    }

    //两种方法都可以
    increment = () => {
        // this.store.dispatch({ type: 'count/increment', payload: 1 });
        const props = this.props;
        props.increment(1);
    }

    decrement = () => {
        const props = this.props;
        props.decrement(1);
        // this.store.dispatch({ type: 'count/decrement', payload: 1 });
    }

    asyncIncrease = () => {
        this.store.dispatch({ type: 'count/aysncIncrement', payload: 1 });
    }
    render() {
        const props = this.props;
        return (
            <div>
                <button onClick={this.increment}>点击增加</button>
                <button onClick={this.decrement}>点击减少</button>
                <button onClick={this.asyncIncrease}>异步增加</button>
                {props.number}
            </div>
        );
    }
}

export default Demo;
```
## Api
#### init
```
init用来初始化model，每个model都是一个文件。多个model的话就可以写成
init({ model1, model2, model3, ...model})
```
#### store.dispatch()
```
store.dispath({type: 'modelName/function', payload: 1})
通过dispatch来更新state
modelName 为此模块的名称，比如模块名称叫count
function 即为reducers or effects的函数
可参照@observe的用法
```
#### observe
```
@observe({
  modelName: 'count',
  state: ['number'],
  reducers: ['increment', 'decrement'],
  effects: ['aysncIncrement']
})
observe()
参数为一个对象
{
  modelName: string
  state?: array
  reducers?: array
  effects?: array
}
```
#### store.getState
```
store.getState() 获取全部的state
```
## model写法
```
const modelName = {
  state: { number1 },
  reducers: {
    function1: (state, payload) => {},
    function2: (state, payload) => {}
  },
  effects: {
    asyncFunction1: ({payload, dispatch, rootState }) => {},
    asyncFunction2: ({payload, dispatch, rootState }) => {}
  }
}

reducers中的state即为上下的state
effects里有一个对象参数,有payload, dispatch, rootState
```

## 开源协议 

MIT
