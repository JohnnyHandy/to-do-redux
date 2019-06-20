
import * as actionTypes from '../actions/actionTypes'
import {updateObject} from './utility'
export const initialState ={
    items:{
        shortTerm:[],
        mediumTerm:[],
        longTerm:[]
    },
    newItem:{},
    input:undefined,
    itemIndex:0,
    edit:undefined,
    editIndex:undefined,
    nameInput:'',
    descInput:'',
    buttonText:'',
    activeTab:'1',
    modal:false,
    confirmation:false
}


const changedName = (state,action)=>{
    const updatedName = updateObject(state.newItem,{itemName:action.payload})
    const updateState = {
        newItem:updatedName,
        nameInput:action.payload
    }
    return updateObject(state,updateState)
}

const changedDesc = (state,action)=>{
    const updatedDesc = updateObject(state.newItem,{itemDesc:action.payload})
    const updateState={
        newItem:updatedDesc,
        descInput:action.payload
    }
    return updateObject(state,updateState)
}

const addItem = (state,action)=>{
    let items = undefined
    let newId=undefined;
        if(state.activeTab==='1'){
            newId = state.items.shortTerm.length
            items = state.items.shortTerm 
        } else if(state.activeTab==='2'){
            newId = state.items.mediumTerm.length
            items = state.items.mediumTerm
        } else if(state.activeTab==='3'){
            newId = state.items.longTerm.length
            items = state.items.longTerm
        }
    
    const updateItem = {
        id:newId,
        itemName:state.newItem.itemName,
        itemDesc:state.newItem.itemDesc,
        created:new Date().toISOString().slice(0,10),
        lastEdited:undefined,
    }

    const updatedArray = items.concat(updateItem)
    console.log(updatedArray)
    let updatedContent = undefined
    if(state.activeTab==='1'){
        updatedContent = updateObject(state.items,{shortTerm:updatedArray})
    } else if(state.activeTab==='2'){
        updatedContent = updateObject(state.items,{mediumTerm:updatedArray})
    } else if(state.activeTab==='3'){
        updatedContent = updateObject(state.items,{longTerm:updatedArray})
    }
    console.log(updatedContent)
    const updatedState = {
        items:updatedContent,
        newItem:{},
        input:false,
        edit:false,
        itemIndex:newId,
        nameInput:'',
        descInput:'',
        buttonText:'',
        error:null,
        loading:false
    }
    return updateObject(state,updatedState)
}

const deleteItem = (state,action)=>{
    let items = undefined
    if(state.activeTab==='1'){
        items = state.items.shortTerm 
    } else if(state.activeTab==='2'){
        items = state.items.mediumTerm
    } else if(state.activeTab==='3'){
        items = state.items.longTerm
    }
    let newIndex = action.index
    if(action.index > 0){
        newIndex = action.index-1
    } else {
        newIndex = 0
    }
   
    const deleteItems = [ 
        ...items.slice(0,action.index),
        ...items.slice(action.index+1)
    ].map((item, index) => ( updateObject(item,{id:index})))
    let updatedContent = undefined
    if(state.activeTab==='1'){
        updatedContent = updateObject(state.items,{shortTerm:deleteItems})
    } else if(state.activeTab==='2'){
        updatedContent = updateObject(state.items,{mediumTerm:deleteItems})
    } else if(state.activeTab==='3'){
        updatedContent = updateObject(state.items,{longTerm:deleteItems})
    }
    return updateObject(state,{items:updatedContent,itemIndex:newIndex})


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
    let items = undefined
    if(state.activeTab==='1'){
        items = state.items.shortTerm 
    } else if(state.activeTab==='2'){
        items = state.items.mediumTerm
    } else if(state.activeTab==='3'){
        items = state.items.longTerm
    }
    items.map((item,index)=>{
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
    let items = undefined
    if(state.activeTab==='1'){
        items = state.items.shortTerm 
    } else if(state.activeTab==='2'){
        items = state.items.mediumTerm
    } else if(state.activeTab==='3'){
        items = state.items.longTerm
    }
    
    const editedItem = [...items].map((item,index)=>{
        if(index===state.editIndex){
            newIndex = index
            return updateObject(item,{
                itemName:state.newItem.itemName,
                itemDesc:state.newItem.itemDesc,
                lastEdited:new Date().toISOString().slice(0,10)
            })
        } else {
            return updateObject(item)
        }
    })
    let updatedContent = undefined
    if(state.activeTab==='1'){
        updatedContent = updateObject(state.items,{shortTerm:editedItem})
    } else if(state.activeTab==='2'){
        updatedContent = updateObject(state.items,{mediumTerm:editedItem})
    } else if(state.activeTab==='3'){
        updatedContent = updateObject(state.items,{longTerm:editedItem})
    }

    return updateObject(state,{
        items:updatedContent,
        edit:false,
        nameInput:'',
        descInput:'',
        editIndex:undefined,
        newItem:{},
        input:false,
        itemIndex:newIndex
    })
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
    let items
    if(state.activeTab==='1'){
        items=state.items.shortTerm
    }else if(state.activeTab==='2'){
        items=state.items.mediumTerm
    }else if(state.activeTab==='3'){
        items=state.items.longTerm
    }
    let newIndexUp = state.itemIndex
    if(newIndexUp < items.length-1){
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

const setActiveTab =(state,action)=>{
     return updateObject(state,{activeTab:action.payload,itemIndex:0})
}

const toggleModal = (state,action)=>{
    const updateModal = !state.modal
    return updateObject(state,{modal:updateModal})
}

const fetchItemsSuccess = (state,action)=>{
    let items= initialState.items
    if(action.items.shortTerm){
        items.shortTerm = action.items.shortTerm
    }
    if(action.items.mediumTerm){
        items.mediumTerm=action.items.mediumTerm
    }
    if(action.items.longTerm){
        items.longTerm=action.items.longTerm
    }
    return updateObject(state,{items:items,loading:false,error:null})
}

const fetchItemsStart = (state,action)=>{
    return updateObject(state,{loading:true})
}

const fetchItemsFail = (state,action)=>{
    return updateObject(state,{error:action.error})
}

const resetItemList=(state,action)=>{
    return updateObject(state,{items:{
        shortTerm:[],
        mediumTerm:[],
        longTerm:[]
    },error:null})
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
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
        case actionTypes.SET_ACTIVE_TAB:return setActiveTab(state,action);
        case actionTypes.TOGGLE_MODAL:return toggleModal(state,action);
        case actionTypes.FETCH_ITEMS_START:return fetchItemsStart(state,action);
        case actionTypes.RESET_ITEM_LIST:return resetItemList(state,action);
        case actionTypes.FETCH_ITEMS_FAIL:return fetchItemsFail(state,action);
        case actionTypes.FETCH_ITEMS_SUCCESS:return fetchItemsSuccess(state,action);
        default: return state
    }
}
export default reducer