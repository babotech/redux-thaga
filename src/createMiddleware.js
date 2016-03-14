/* eslint-disable callback-return */

const createThunkSagaMiddleware = (sagas = []) => {
    const combinedSagas = Array.isArray(sagas) ? sagas : Object
        .keys(sagas)
        .map(key => sagas[ key ])

    return ({dispatch, getState} = {}) => {
        return next => action => {
            if (typeof action === `function`) {
                return action(dispatch, getState)
            }
            next(action)
            combinedSagas
                .forEach(saga => saga.type === action.type && saga.actionCreator(dispatch, getState, action))
        }
    }
}

export default createThunkSagaMiddleware