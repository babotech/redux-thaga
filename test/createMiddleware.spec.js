import createMiddleware from '../src/createMiddleware'
import expect from 'expect'

describe(`redux-thunk-saga`, () => {

    describe(`createMiddleware`, () => {

        it(`should work like redux-thunk if action is a function`, () => {
            const middleware = createMiddleware()

            const store = {
                dispatch: () => null,
                getState: () => null
            }

            const action = expect.createSpy()
            const next = expect.createSpy()

            middleware(store)(next)(action)

            expect(next.calls.length).toEqual(0)
            expect(action.calls.length).toEqual(1)

            const {arguments: args} = action.calls[ 0 ]

            expect(args).toEqual([
                store.dispatch,
                store.getState
            ])
        })

        it(`should call next if action is an object`, () => {
            const action = {
                type: `ACTION_TYPE`
            }

            const middleware = createMiddleware()
            const next = expect.createSpy()

            middleware()(next)(action)

            expect(next.calls.length).toEqual(1)

            const {arguments: args} = next.calls[ 0 ]

            expect(args).toEqual([ action ])
        })

        it(`should call action creators`, () => {
            const sagas = {
                onBar: {
                    type: `BAR`,
                    actionCreator: expect.createSpy()
                },
                onBaz: {
                    type: `BAZ`,
                    actionCreator: expect.createSpy()
                }
            }

            const middleware = createMiddleware(sagas)
            const action = {
                type: `BAR`
            }
            const next = () => null
            const store = {
                dispatch: () => null,
                getState: () => null
            }

            middleware(store)(next)(action)

            expect(sagas.onBar.actionCreator.calls.length).toEqual(1)

            const {arguments: args} = sagas.onBar.actionCreator.calls[ 0 ]

            expect(args).toEqual([
                store.dispatch,
                store.getState,
                action
            ])

            expect(sagas.onBaz.actionCreator.calls.length).toEqual(0)
        })
    })
})