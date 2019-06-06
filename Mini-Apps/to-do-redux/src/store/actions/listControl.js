import * as actionTypes from './actionTypes'
// import axios from '../../axios'

export const addItem = ()=>{
    return async (dispatch,getState)=>{
        console.log(getState().items)
        await dispatch(addItemHandler());
        // await axios.put('/list/items.json',getState().reducer.items)
        // .then(response=>console.log(response)).catch(error=>console.log(error.message))
    }
}

const addItemHandler = ()=>{
    return{
        type:actionTypes.ADD_ITEM
    }
}

export const deleteItem = (index)=>{
    return async(dispatch,getState)=>{
        await dispatch(deleteItemHandler(index));
        // await axios.put('/list/items.json',getState().items)
        // .then(response=>console.log(response)).catch(error=>console.log(error.message))

    }
    
}

export const deleteItemHandler = (index)=>{
    return{
        type:actionTypes.DELETE_ITEM,
        index:index
    }
}

export const editItem = ()=>{
    return async(dispatch,getState)=>{
        await dispatch(editItemHandler());
        // await axios.put('/list/items.json',getState().items)
        // .then(response=>console.log(response)).catch(error=>console.log(error.message))

    }
}

export const editItemHandler = ()=>{
    return{
        type:actionTypes.EDIT_ITEM
    }
}

export const itemIndexChanger = (index)=>{
    return{
        type:actionTypes.CHANGE_ITEM_INDEX,
        index:index
    }
}

export const initialState = (value)=>{
    return{
        type:actionTypes.SET_STATE,
        payload:value
    }
}

export const setActiveTab = (index)=>{
    return{
        type:actionTypes.SET_ACTIVE_TAB,
        payload:index
    }
}