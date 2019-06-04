import * as actionTypes from './actionTypes'
import axios from 'axios'


export const logout = ()=>{
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime)=>{
    return dispatch =>{
       setTimeout(()=>{
            dispatch(logout())
       },expirationTime*1000) 
    }
}

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

export const authSuccess = (token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail = (error,method)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error,
        method:method
    };
}

export const auth = (email,password,method)=>{
    console.log(method)
    return dispatch=>{
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+process.env.REACT_APP_G_KEY
        if(method==='Sign-Up'){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+process.env.REACT_APP_G_KEY
        }else if(method==='Sign-In'){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+process.env.REACT_APP_G_KEY
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err=>{
            dispatch(authFail(err.response.data.error,method));
        })
    }
}