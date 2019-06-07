import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const addItem = ()=>{
    return async (dispatch,getState)=>{
        await dispatch(addItemHandler());
        if(getState().auth.userId){
            await axios.put('users/'+getState().auth.userId+'/list/items.json',getState().reducer.items)
            .then(response=>console.log(response)).catch(error=>console.log(error.message))
        }
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
        if(getState().auth.userId){
            await axios.put('users/'+getState().auth.userId+'/list/items.json',getState().reducer.items)
            .then(response=>console.log(response)).catch(error=>console.log(error.message))
        }
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
        if(getState().auth.userId){
            await axios.put('users/'+getState().auth.userId+'/list/items.json',getState().reducer.items)
            .then(response=>console.log(response)).catch(error=>console.log(error.message))
        }
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

export const fetchStart = (items)=>{
    return{
        type:actionTypes.FETCH_ITEMS_START,
        items:items
    }
}

export const fetchItemsFail =(error)=>{
    return (resetItemList())
}

export const fetchItems = ()=>{
    return (dispatch,getState)=>{
        if(getState().auth.userId)
        {   
            axios.get('users/'+getState().auth.userId+'/list/items.json')
            .then(res=>{
            dispatch(fetchStart(res.data))
            }).catch(err=>{
            console.log(err)
            dispatch(fetchItemsFail())
            })
        }
    }
}

export const resetItemList=()=>{
    return{
        type:actionTypes.RESET_ITEM_LIST,
    }
}
