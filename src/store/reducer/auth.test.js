import reducer,{initialState} from './auth'

import * as actionTypes from '../actions/actionTypes'

describe('auth reducer',()=>{
    it('Should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual(initialState)
    })

    it('Auth Start should change loading and error method',()=>{
        expect(reducer(initialState,{
            type:actionTypes.AUTH_START,
            method:'test'
        })).toEqual({
            token: null,
            userId: null,
            error: {error:null,method:'test'},
            loading: true
        })
    })

    it('Auth Success should store the token upon login',()=>{
        expect(reducer(initialState,{
            type:actionTypes.AUTH_SUCCESS,
            idToken:'some-token',
            userId:'some-user-id'

        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: {error:null,method:''},
            loading: false
        
        })
    })

    it('Auth Logout should reset auth state content',()=>{
        expect(reducer({
            token: 'some-token',
            userId: 'some-user-id',
            error: {error:null,method:''},
            loading: false
        },{
            type:actionTypes.AUTH_LOGOUT,
            token:null,
            userId:null
        })).toEqual(initialState)
    })

    it('Auth Fail should register the error and the method used',()=>{
        expect(reducer({
            error:{error:null,method:''},
            loading:undefined
        },{
           type:actionTypes.AUTH_FAIL,
           error:'error test',
           method:'test method' 
        })).toEqual({
            error:{error:'error test',method:'test method'},
            loading:false
        })
    })
})