const initialState ={
    items:[],
    newItem:{},
    input:false,
    itemIndex:0,
    edit:false,
    editIndex:undefined,
    nameInput:'',
    descInput:'',
    buttonText:''
}

const reducer = (state=initialState,action)=>{
    if(action.type === 'changedName'){
        return console.log(action.payload)
    }
    
    return state
}

export default reducer