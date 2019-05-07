
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

const setState = (state,action)=>{
    return updateObject(state,{items:action.payload})
}
const changedName = (state,action)=>{
    const updateName = {itemName:action.payload}
    const updatedName = updateObject(state.newItem,updateName)
    const updateState = {
        newItem:updatedName,
        nameInput:action.payload
    }
    return updateObject(state,updateState)
}

const changedDesc = (state,action)=>{
    const updateDesc = {itemDesc:action.payload};
    const updatedDesc = updateObject(state.newItem,updateDesc)
    const updateState2={
        newItem:updatedDesc,
        descInput:action.payload
    }
    return updateObject(state,updateState2)
}

const addItem = (state,action)=>{
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
}

const deleteItem = (state,action)=>{
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
        ].map((item, index) => ( updateObject(item,{id:index}))),
        itemIndex:newIndex
    }

}

const editItemHandler = (state,action)=>{
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
    const updatedState = {
        nameInput:itemName,
        descInput:itemDesc,
        newItem:editedItem,
        edit:edit,
        input:false,
        buttonText:'Edit Item',
        editIndex:action.index
    }
    return updateObject(state,updatedState)
}
const editItem =(state,action)=>{
    let newIndex = undefined
    return{
        ...state.items,
        items:[...state.items].map((item,index)=>{
            if(index===state.editIndex){
                newIndex = index
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
        input:false,
        itemIndex:newIndex
    }
}

const changeItemIndex =(state,action)=>{
    return updateObject(state,{itemIndex:action.index})

}

const indexDown = (state,action)=>{
    let newIndexDown = state.itemIndex
    if(newIndexDown > 0){
        newIndexDown = newIndexDown-1
    }
    return updateObject(state,{itemIndex:newIndexDown})
}

const indexUp = (state,action)=>{
    let newIndexUp = state.itemIndex
    if(newIndexUp < state.items.length-1){
        newIndexUp=newIndexUp+1
    }
    return updateObject(state,{itemIndex:newIndexUp})
}

const toggleInputHandler = (state,action)=>{
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
}
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_STATE:return setState(state,action);
        case actionTypes.CHANGED_NAME:return changedName(state,action);
        case actionTypes.CHANGED_DESC:return changedDesc(state,action);
        case actionTypes.ADD_ITEM:return addItem(state,action);
        case actionTypes.DELETE_ITEM:return deleteItem(state,action);
        case actionTypes.EDIT_ITEM_HANDLER:return editItemHandler(state,action);
        case actionTypes.EDIT_ITEM:return editItem(state,action);
        case actionTypes.CHANGE_ITEM_INDEX:return changeItemIndex(state,action);
        case actionTypes.INDEX_DOWN:return indexDown(state,action);
        case actionTypes.INDEX_UP:return indexUp(state,action);
        case actionTypes.TOGGLE_INPUT_HANDLER:return toggleInputHandler(state,action);
        default: return state
    }
}
export default reducer