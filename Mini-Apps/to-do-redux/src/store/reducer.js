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
    if(action.type === 'CHANGED_NAME'){
        return({
            ...state,
            newItem:{
                ...state.newItem,
                itemName:action.payload
            }
        }) 
    }
    if(action.type==='CHANGED_DESC'){
        return({
            ...state,
            newItem:{
                ...state.newItem,
                itemDesc:action.payload
            }
        })
    }
    if(action.type==='ADD_ITEM'){
        let newId = state.items.length
        return{
            ...state,
            items:[
                ...state.items,
                {
                    id:newId,
                    itemName:state.newItem.itemName,
                    itemDesc:state.newItem.itemDesc,
                    created:new Date().toISOString().slice(0,10)
                }
            ],
            newItem:{},
            input:false,
            itemIndex:newId,
            nameInput:'',
            descInput:'',
        }
    }
    if(action.type==='DELETE_ITEM'){
        return{
            ...state,
            items:[
                ...state.items.slice(0,action.index),
                ...state.items.slice(action.index+1)
            ].map((item, index) => ({ ...item, id: index }))

        }
    }

    return state
    
}

export default reducer