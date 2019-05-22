import * as actionTypes from './actionTypes'

export const toggleModal = (modalType)=>{
    if(modalType === undefined){
        modalType = ''
    }
    return{
        type:actionTypes.TOGGLE_MODAL,
        modalType:modalType
    }
}

export const changeEmail = (event)=>{
    return{
        type:actionTypes.EMAIL_CHANGE,
        payload:event.target.value
    }
}

export const changePassword = (event)=>{
    return{
        type:actionTypes.PASSWORD_CHANGE,
        payload:event.target.value
    }
}

export const authStart = ()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (authData)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail = (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    };
}

export const auth = (email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart())
    }
}