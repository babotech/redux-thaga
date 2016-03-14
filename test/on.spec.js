import expect from 'expect'
import on from '../src/on'

describe(`redux-thunk-saga`, () => {
    describe(`on`, () => {

        it(`should create object with type and actionCreator`, () => {
            const type = `ACTION_TYPE`
            const actionCreator = () => null

            expect(on(type, actionCreator))
                .toEqual({
                    type,
                    actionCreator
                })
        })
    })
})
