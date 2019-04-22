const initialState ={
    items:[],
    newItem:{},
    input:undefined,
    itemIndex:0,
    edit:undefined,
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
            },
            nameInput:action.payload
        }) 
    }
    if(action.type==='CHANGED_DESC'){
        return({
            ...state,
            newItem:{
                ...state.newItem,
                itemDesc:action.payload
            },
            descInput:action.payload
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
                    created:new Date().toISOString().slice(0,10),
                    lastEdited:undefined
                }
            ],
            newItem:{},
            input:false,
            edit:false,
            itemIndex:newId,
            nameInput:'',
            descInput:'',
            buttonText:''
        }
    }
    if(action.type==='DELETE_ITEM'){
        let newIndex = action.index
        if(action.index > 0){
            newIndex = action.index-1
        } else {
            newIndex = 0
        }
        return{
            ...state,
            items:[
                ...state.items.slice(0,action.index),
                ...state.items.slice(action.index+1)
            ].map((item, index) => ({ ...item, id: index })),
            itemIndex:newIndex
        }
    }
    if(action.type==='EDIT_ITEM_HANDLER'){
        let itemName=''
        let itemDesc=''
        let edit=null
        if(state.edit===true){
            edit=undefined
        } else{
            edit=true
        }
        state.items.map((item,index)=>{
            if(index === action.index){
                itemName=item.itemName
                itemDesc=item.itemDesc
            }
            return null
        })
        return{
            ...state,
            nameInput:itemName,
            descInput:itemDesc,
            newItem:{
                ...state.newItem,
                itemName:itemName,
                itemDesc:itemDesc
            },
            edit:edit,
            input:false,
            buttonText:'Edit Item',
            editIndex:action.index
        }
    }
    if(action.type==='EDIT_ITEM'){
        return{
            ...state.items,
            items:[...state.items].map((item,index)=>{
                if(index===state.editIndex){
                    return ({
                        ...item,
                        itemName:state.newItem.itemName,
                        itemDesc:state.newItem.itemDesc,
                        lastEdited:new Date().toISOString().slice(0,10)
                    })
                } else{
                    return ({...item})
                }
            }),
            edit:false,
            nameInput:'',
            descInput:'',
            editIndex:undefined,
            newItem:{},
            input:false
        }
    }
    if(action.type==='CHANGE_ITEM_INDEX'){
        return{
            ...state,
            itemIndex:action.index
        }
    }
    if(action.type === 'INDEX_DOWN'){
        let newIndex = state.itemIndex
        if(newIndex > 0){
            newIndex = newIndex-1
        }
        return{
            ...state,
            itemIndex:newIndex
        }
    }
    if(action.type === 'INDEX_UP'){
        let newIndex = state.itemIndex
        if(newIndex < state.items.length-1){
            newIndex=newIndex+1
        }
        return{
            ...state,
            itemIndex:newIndex
        }
    }
    if(action.type==='TOGGLE_INPUT_HANDLER'){
        let input = undefined
        let buttonText = ''
        if(state.input === true){
             input=false
             buttonText = ''
        } else{
             input = true
             buttonText = 'Add Item'
        }
        return{
            ...state,
            input:input,
            buttonText:buttonText
        }
    }
    return state
}
export default reducer