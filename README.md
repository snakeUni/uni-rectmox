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
```
import { init, Provide } from reactmox
const model = {
  state: {number: 1},
  renducers: {
    increase:(state, payload) => {
      state.number += payload
    }
  },
  effects: {
    assncIncrease: ({payload, dispatch}) => {
      new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
      }).then(() => {
          dispatch({type: 'model/increment', payload });
      });
    }
  }
}
const store = init{{model}}
ReactDOM.render(
  <Provider store={store}><App /></Provider>, 
  document.getElementById('root'));
```
