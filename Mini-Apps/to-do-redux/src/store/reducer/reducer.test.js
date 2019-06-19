import reducer, {initialState} from './reducer'
import * as actionTypes from '../actions/actionTypes'

describe('Reducer',()=>{
    it('Should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual(initialState)
    })

    it('Changing Name should add the value to newItem itemName property',()=>{
        expect(reducer({
            newItem:{},
            nameInput:''
        },{
            type:actionTypes.CHANGED_NAME,
            payload:'test'
        })).toEqual({
            newItem:{itemName:'test'},
            nameInput:'test'
        })
    })
    it('Changing Description input should add the value to newItem itemDesc property',()=>{
        expect(reducer({
            newItem:{},
            descInput:''
        },{
            type:actionTypes.CHANGED_DESC,
            payload:'test'
        })).toEqual({
            newItem:{itemDesc:'test'},
            descInput:'test'
        })
    })
})