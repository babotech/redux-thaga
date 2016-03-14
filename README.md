# redux-thaga [![Build Status](https://travis-ci.org/babotech/redux-thaga.svg?branch=master)](https://travis-ci.org/babotech/redux-thaga)

To not choose between [redux-thunk](https://github.com/gaearon/redux-thunk) and [redux-saga](https://github.com/yelouafi/redux-saga)

## Installation

```
npm install --save redux-thaga
```

## Integration 

```javascript
...
import * as sagas from './sagas'
import createThagaMiddleware from 'redux-thaga'

const thaga = createThagaMiddleware(sagas)

const createStoreWithMiddlewares = applyMiddleware(thaga)(createStore)

...
```

## Usage

Like thunk for async actions

```javascript
export const asyncActionCreator = () => (dispatch, getState) => {
    dispatch({
        type: `REQUEST`
    })
    
    request()
        .then(() => 
            dispatch({
                type: `SUCCESS`
            })
        )
}

```

Like saga

```javascript
import {on} from 'redux-thaga'

export const onSomeAction = on(`SOME_ACTION_TYPE`, (dispatch, getState, action) => {
    request()
        .then(() => {
            dispatch({
                    type: `ANOTHER_ACTION_TYPE`
                })
        })
})

```

## License

**MIT**




