import * as actionTypes from './actionTypes'

export const toggleInput = () =>{
    return{
        type:actionTypes.TOGGLE_INPUT_HANDLER
    }
}

export const changedName = (event)=>{
    return{
        type:actionTypes.CHANGED_NAME,
        payload:event.target.value
    }
}

export const changedDesc = (event)=>{
    return{
        type:actionTypes.CHANGED_DESC,
        payload:event.target.value
    }
}

export const editItemHandler = (index)=>{
    return{
        type:actionTypes.EDIT_ITEM_HANDLER,
        index:index
    }
}
