import * as actionTypes from '../actions'

const initialState={
    results:[]
}

//Redux-Reducer
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.STORE_RESULT:
            return{
                ...state,
                results:state.results.concat({id:new Date().getTime(),value:action.result})
            }//IF you are in a reducer and you need to get a value from the global state, you have to pass it to the reducer as an action
        case actionTypes.DELETE_RESULT:
            // const id=2;
            // const newArray = [...state.results]
            // newArray.results.splice(id, 1)
            const updatedArray = state.results.filter(result=>result.id!==action.resultElId)
            return{
                ...state,
                results:updatedArray
            }
    }
    
   
    return state
}

export default reducer