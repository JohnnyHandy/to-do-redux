import * as actionTypes from '../actions/actionTypes'
import {updateObject} from './utility'

const initialState = {
    authForm:{
        email:'',
        password:''
    }
}

const changeEmail = (state,action)=>{
    const updateEmail = {email:action.payload}
    const updatedEmail = updateObject(state.authForm,updateEmail)
    return updateObject(state,{authForm:updatedEmail})
}
const changePassword = (state,action)=>{
    const updatePassword = {password:action.payload}
    const updatedPassword = updateObject(state.authForm,updatePassword)
    return updateObject(state,{authForm:updatedPassword})
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.EMAIL_CHANGE:return changeEmail(state,action);
        case actionTypes.PASSWORD_CHANGE: return changePassword(state,action)
        default:return state
    }
}

export default reducer