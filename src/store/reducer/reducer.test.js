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
    it('Deleting should delete item from the items object respective array',()=>{
        expect(reducer({
            items:{
                shortTerm:[{
                    id:0,
                    itemName:'test',
                    itemDesc:'test',
                    created:new Date().toISOString().slice(0,10),
                    lastEdited:undefined
                },{
                    id:1,
                    itemName:'test',
                    itemDesc:'test',
                    created:new Date().toISOString().slice(0,10),
                    lastEdited:undefined 
                }],
                mediumTerm:[],
                longTerm:[]
            },
            activeTab:'1'
        },{
            type:actionTypes.DELETE_ITEM,
            index:1
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
            activeTab:'1',
            itemIndex:0
        })
    })
    it('Editing should input newItem name and description into items editing element, besides altering the "lastEdited" property',()=>{
        expect(reducer({
            items:{
                shortTerm:[{
                    id:0,
                    itemName:'test',
                    itemDesc:'test',
                    created:'date',
                    lastEdited:undefined
                }],
                mediumTerm:[],
                longTerm:[]
            },
            newItem:{
                itemName:'test2',
                itemDesc:'test2'
            },
            activeTab:'1',
            editIndex:0,
            edit:true,
            nameInput:'test2',
            descInput:'test2'
        },{
            type:actionTypes.EDIT_ITEM,
        })).toEqual({
            items:{
                shortTerm:[{
                    id:0,
                    itemName:'test2',
                    itemDesc:'test2',
                    created:'date',
                    lastEdited:new Date().toISOString().slice(0,10)
                }],
                mediumTerm:[],
                longTerm:[]

            },
            activeTab:'1',
            edit:false,
            nameInput:'',
            descInput:'',
            editIndex:undefined,
            newItem:{},
            input:false,
            itemIndex:0 
        })
    })
})