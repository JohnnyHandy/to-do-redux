import * as actionTypes from '../actions/actionTypes'
import {updateObject} from './utility'

export const initialState = {
    token: null,
    userId: null,
    error: {error:null,method:''},
    loading: false
};

const authLogout = (state,action)=>{
    return updateObject(state,{token:null,userId:null})
}

const authStart = ( state, action ) => {
    const updatedError = updateObject(state.error,{method:action.method})
    return updateObject( state, { error: updatedError, loading: true } );
};

const authSuccess = (state, action) => {
    const updatedError = updateObject(state.error,{error:null,method:''})
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: updatedError,
        loading: false
     } );
};

const authFail = (state, action) => {
    const updatedError = updateObject(state.error,{error:action.error,method:action.method})
    return updateObject( state, {
        error: updatedError,
        loading: false
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:return authLogout(state,action);
        default:
            return state;
    }
};

export default reducer;