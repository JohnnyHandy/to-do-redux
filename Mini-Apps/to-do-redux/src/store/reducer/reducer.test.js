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
    it('Adding item should add newItem content into the items object arrays(short term as an example)',()=>{
        expect(reducer({
            items:{
              shortTerm:[],
              mediumTerm:[],
              longTerm:[]
            },
            newItem:{
                itemName:'test',
                itemDesc:'test'
            },
            activeTab:'1'
        },{
            type:actionTypes.ADD_ITEM,
            
        })).toEqual({
            items:{
                shortTerm:[{
                    id:0,
                    itemName:'test',
                    itemDesc:'test',
                    created:new Date().toISOString().slice(0,10),
                    lastEdited:undefined
                }],
                mediumTerm:[],
                longTerm:[]
            },
            newItem:{},
            input:false,
            edit:false,
            itemIndex:0,
            nameInput:'',
            descInput:'',
            activeTab:'1',
            buttonText:'',
            error:null,
            loading:false
        })
    })
})