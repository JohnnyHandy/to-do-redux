import * as actionTypes from './actionTypes'
import axios from 'axios'

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

export const authStart = (email,password)=>{
    console.log('email=> '+email)
    console.log('password=> '+password)
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

export const auth = (email,password)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAmkXLcXaz3MYlH2LaGMCmaAafyWDAQVbA',authData)
        .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail());
        })
    }
}