import React, {Component} from 'react'

import Input from '../../components/UI/input/input'
import Items from '../../components/Items/Items'
import classes from './List.css'
import axios from '../../axios';
// import firebase from "firebase";

// // Initialize Firebase
// // TODO: Replace with your project's customized code snippet
// var config = {
//   apiKey: "<API_KEY>",
//   authDomain: "<PROJECT_ID>.firebaseapp.com",
//   databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
//   storageBucket: "<BUCKET>.appspot.com",
// };
// firebase.initializeApp(config);

class List extends Component {
    
    
    state={
        items:[],
        newItem:{},
        input:false,
        editItem:false,
        editIndex:undefined,
        initItem:true,
        inputNameValue:'',
        inputDescValue:'',
        descIndex:0,
        buttonText:''
    }
    
    componentDidMount(){
        axios.get('https://to-do-list-299ec.firebaseio.com/list/-Lbo_KtGeg7HYU0OC4t3.json')
        .then(response=>{
            this.setState({
                items:response.data,
                descIndex:0
            })
        });
    }
    
    
    
    toggleInputHandler =()=>{ 
        if(this.state.input && !this.state.editItem){
            return this.setState({
                input:false,
                buttonText:'',
                inputNameValue:'',
                inputDescValue:'',
                editIndex:undefined,
                editItem:false
            })
        } else if(this.state.input && this.state.editItem) {
            return this.setState({
                input:true,
                buttonText:'Add Item',
                editItem:false,
                editIndex:undefined,
                inputNameValue:'',
                inputDescValue:''
                
            })
        } else if (!this.state.input && !this.state.editItem){
            return this.setState({
                input:true,
                buttonText:'Add Item',
                inputNameValue:'',
                inputDescValue:'',
                editIndex:undefined,
                editItem:false
            })
        }
    }
    

    
    inputNameHandle=(event)=>{
        const description = this.state.newItem.itemDesc
        this.setState({
            newItem:{
                itemName:event.target.value,
                itemDesc:description
            },
            inputNameValue:event.target.value
        })
    }
    
    inputDescHandle=(event)=>{
        const name = this.state.newItem.itemName
        this.setState({
            newItem:{
                itemName:name,
                itemDesc:event.target.value
            },
            inputDescValue:event.target.value
        })

    }
    
    addItemHandler= async ()=>{
        if(!this.state.editItem){
            const oldState={...this.state}
            let newId = oldState.items.length
            await oldState.items.push({id:newId, itemName:oldState.newItem.itemName, itemDesc:oldState.newItem.itemDesc, created:new Date().toISOString().slice(0,10)})
            await this.setState({
            items:oldState.items,
                newItem:{},
                input:false,
                initItem:false,
                editItem:false,
                inputNameValue:'',
                inputDescValue:'',
                descIndex:newId
             })
            this.passItemData()
        } else{
            const oldState={...this.state}
            let newId = oldState.editIndex
           await oldState.items.forEach((item,i)=>{
                if(i===newId){
                    item.itemName=oldState.newItem.itemName
                    item.itemDesc=oldState.newItem.itemDesc
                    item.lastEdited=new Date().toISOString().slice(0,10)
                }
            })
            await this.setState({
                items:oldState.items,
                input:false,
                initItem:false,
                editItem:false,
                inputNameValue:'',
                inputDescValue:'',
                descIndex:newId
            })
            this.passItemData()
        }
        
    }
    
    deleteItemHandler = async (itemIndex) =>{
        const oldState = {...this.state}
        await oldState.items.splice(itemIndex,1)
        oldState.items.forEach((item, index) => { 
         item.id = index 
        })
        let newDescIndex = null
        if(itemIndex>0){
            newDescIndex=itemIndex-1
        } else{
            newDescIndex=0
        }
        await this.setState({
            items:oldState.items,
            descIndex:newDescIndex,
            inputNameValue:'',
            inputDescValue:'',
            editItem:false,
            input:false
            
        })
        this.passItemData()
        // await axios.put('/list/-Lbo_KtGeg7HYU0OC4t3.json',oldState.items)
        // .then(response=>console.log(response))
        // .catch(error=>console.log(error))
        // await this.props.itemData(this.state.items)
        // await this.props.indexInfo(this.state.descIndex)
    }
    
 
    
    passItemData =async ()=>{
        const itemData = this.state.items
        await axios.put('/list/-Lbo_KtGeg7HYU0OC4t3.json',itemData)
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
        await this.props.itemData(itemData)
        this.props.indexInfo(this.state.descIndex)
    }
    
    descIndexHandle = async (index)=>{
        await this.setState({descIndex:index})
        this.props.indexInfo(this.state.descIndex)
        console.log(index)
    }
    
    editItemHandler= async (index) =>{
        if(this.state.editItem){
            this.setState({
                input:false,
                editItem:false,
                inputNameValue:'',
                inputDescValue:'',
                editIndex:undefined,
            })
        }else{
        let descValue=''
        let nameValue=''
        await this.state.items.forEach((item,i)=>{
            if(i===index){
                descValue=item.itemDesc
                nameValue=item.itemName
                this.setState({
                     input:true,
                     editItem:true,
                     inputNameValue:nameValue,
                     inputDescValue:descValue,
                     editIndex:index,
                     buttonText:'Edit Item'
                })
            }
        }) 
        }
        this.passItemData()
        
    }

    render(){
        


        let itemElement = null
        if(this.state.items.length !== 0){
            itemElement =(
                this.state.items.map((i,index)=>{
                    return <Items 
                            name={i.itemName}
                            key={index}
                            desc={i.desc}
                            deleteClicked={()=>this.deleteItemHandler(index)}
                            editClicked={()=>this.editItemHandler(index)}
                            itemClicked={()=>this.descIndexHandle(index)}
                            />
                })
            )
        } else{
            itemElement = (
                 <p >Please, add a new item.</p>
                )
        }
        
        let inputElement = null;
        if(this.state.input){
            inputElement = <Input
                            clicked={this.addItemHandler}
                            changedName={this.inputNameHandle}
                            changedDesc={this.inputDescHandle}
                            nameValue={this.state.inputNameValue}
                            descValue={this.state.inputDescValue}
                            buttonText={this.state.buttonText}></Input>
        }
        
        return(
            <div className={classes.listStyle}>
                {itemElement}
                <button onClick={this.toggleInputHandler} > Add new Item <i className="fas fa-plus"></i> </button>
                {inputElement}
            </div>
            )
    }
}

export default List
