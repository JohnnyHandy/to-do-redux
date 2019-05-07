/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes'
import {updateObject} from './utility'
const initialState ={
    items:[],
    newItem:{},
    input:undefined,
    itemIndex:0,
    edit:undefined,
    editIndex:undefined,
    nameInput:'',
    descInput:'',
    buttonText:''
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_STATE:
            return updateObject(state,{items:action.payload})
            // return{
            //     ...state,
            //     items:action.payload
            // }
        case actionTypes.CHANGED_NAME:
            const updateName = {itemName:action.payload}
            const updatedName = updateObject(state.newItem,updateName)
            const updateState = {
                newItem:updatedName,
                nameInput:action.payload
            }
            return updateObject(state,updateState)
            // return({
            //     ...state,
            //     newItem:{
            //         ...state.newItem,
            //         itemName:action.payload
            //     },
            //     nameInput:action.payload
            // })
        case actionTypes.CHANGED_DESC:
            const updateDesc = {itemDesc:action.payload};
            const updatedDesc = updateObject(state.newItem,updateDesc)
            const updateState2={
                newItem:updatedDesc,
                descInput:action.payload
            }
            return updateObject(state,updateState2)
            // return({
            //     ...state,
            //     newItem:{
            //         ...state.newItem,
            //         itemDesc:action.payload
            //     },
            //     descInput:action.payload
            // })
        case actionTypes.ADD_ITEM:
            let newId = state.items.length
            const updateItem = {
                id:newId,
                itemName:state.newItem.itemName,
                itemDesc:state.newItem.itemDesc,
                created:new Date().toISOString().slice(0,10),
                lastEdited:undefined,
            }
            const updatedItem = updateObject(state.items,updateItem)
            const updatedItems = state.items.concat(updatedItem)
            const updatedState = {
                items:updatedItems,
                newItem:{},
                input:false,
                edit:false,
                itemIndex:newId,
                nameInput:'',
                descInput:'',
                buttonText:''
            }
            return updateObject(state,updatedState)
            // return{
            //     ...state,
            //     items:[
            //         ...state.items,
            //         {
            //             id:newId,
            //             itemName:state.newItem.itemName,
            //             itemDesc:state.newItem.itemDesc,
            //             created:new Date().toISOString().slice(0,10),
            //             lastEdited:undefined,
            //         }
            //     ],
            //     newItem:{},
            //     input:false,
            //     edit:false,
            //     itemIndex:newId,
            //     nameInput:'',
            //     descInput:'',
            //     buttonText:''
            // }
        case actionTypes.DELETE_ITEM:
            let newIndex = action.index
            if(action.index > 0){
                newIndex = action.index-1
            } else {
                newIndex = 0
            }
            return{
                ...state,
                items:[
                    ...state.items.slice(0,action.index),
                    ...state.items.slice(action.index+1)
                ].map((item, index) => ({ ...item, id: index })),
                itemIndex:newIndex
            }
        case actionTypes.EDIT_ITEM_HANDLER:
            let itemName=''
            let itemDesc=''
            let edit=null
            if(state.edit===true){
                edit=undefined
            } else{
                edit=true
            }
            state.items.map((item,index)=>{
                if(index === action.index){
                    itemName=item.itemName
                    itemDesc=item.itemDesc
                }
                return null
            })
            const editItem = {
                itemName:itemName,
                itemDesc:itemDesc
            }
            const editedItem = updateObject(state.newItem,editItem)
            const updatedState3 = {
                nameInput:itemName,
                descInput:itemDesc,
                newItem:editedItem,
                edit:edit,
                input:false,
                buttonText:'Edit Item',
                editIndex:action.index
            }
            return updateObject(state,updatedState3)
            // return{
            //     ...state,
            //     nameInput:itemName,
            //     descInput:itemDesc,
            //     newItem:{
            //         ...state.newItem,
            //         itemName:itemName,
            //         itemDesc:itemDesc
            //     },
            //     edit:edit,
            //     input:false,
            //     buttonText:'Edit Item',
            //     editIndex:action.index
            // }
        case actionTypes.EDIT_ITEM:
            return{
                ...state.items,
                items:[...state.items].map((item,index)=>{
                    if(index===state.editIndex){
                        return ({
                            ...item,
                            itemName:state.newItem.itemName,
                            itemDesc:state.newItem.itemDesc,
                            lastEdited:new Date().toISOString().slice(0,10)
                        })
                    } else{
                        return ({...item})
                    }
                }),
                edit:false,
                nameInput:'',
                descInput:'',
                editIndex:undefined,
                newItem:{},
                input:false
            }
        case actionTypes.CHANGE_ITEM_INDEX:
            return updateObject(state,{itemIndex:action.index})
            // return{
            //     ...state,
            //     itemIndex:action.index
            // }
        case actionTypes.INDEX_DOWN:
            let newIndexDown = state.itemIndex
            if(newIndexDown > 0){
                newIndexDown = newIndexDown-1
            }
            return updateObject(state,{itemIndex:newIndexDown})
            // return{
            //     ...state,
            //     itemIndex:newIndexDown
            // }
        case actionTypes.INDEX_UP:
            let newIndexUp = state.itemIndex
            if(newIndexUp < state.items.length-1){
                newIndexUp=newIndexUp+1
            }
            return updateObject(state,{itemIndex:newIndexUp})
            // return{
            //     ...state,
            //     itemIndex:newIndexUp
            // }
        case actionTypes.TOGGLE_INPUT_HANDLER:
            let input = undefined
            let buttonText = ''
            if(state.input === true){
                input=false
                buttonText = ''
            } else{
                input = true
                buttonText = 'Add Item'
            }
            return updateObject(state,{
                input:input,
                buttonText:buttonText
            })
            // return{
            //     ...state,
            //     input:input,
            //     buttonText:buttonText
            // }
    }
    return state
}
export default reducer

