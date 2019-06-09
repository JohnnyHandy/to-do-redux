import * as actionTypes from './actionTypes'
import axios from 'axios'
import {fetchItems, resetItemList} from './listControl';


export const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
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

export const toggleModal = ()=>{
    return{
        type:actionTypes.TOGGLE_MODAL,
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
    return (dispatch)=>{
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
            const expirationDate = new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationTime',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(fetchItems())
            dispatch(checkAuthTimeout(response.data.expiresIn))
            dispatch(toggleModal())
        })
        .catch(err=>{
            dispatch(authFail(err.response.data.error,method));
        })
    }
}

export const authCheckState = ()=>{
    return (dispatch,getState)=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
            dispatch(resetItemList())
        } else {
            const expirationTime = new Date (localStorage.getItem('expirationTime'))
            if(expirationTime <=new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((expirationTime.getTime()-new Date().getTime())/1000))
                dispatch(fetchItems())
            }
            
        }
    }
}

