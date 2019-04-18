import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux'

import classes from './List.module.css'
import {Button,ListGroup} from 'reactstrap'
import Input from '../UI/Input/Input'
import Items from './Items/Items'


class List extends Component{
    state={
        items:[],
        newItem:{},
        input:false,
        itemIndex:0,
        edit:false,
        editIndex:undefined,
        // nameInput:'',
        // descInput:'',
        buttonText:''
    }

    toggleInputHandler =()=>{
        if(this.state.input){
            this.setState({
                input:false,
                buttonText:'',
                edit:false,
                nameInput:'',
                descInput:''
            })
        } else if(!this.state.input&&this.state.edit){
            this.setState({
                input:true,
                buttonText:'Add Item',
                edit:false,
                nameInput:'',
                descInput:''
            })
        } else if(!this.state.input){
            this.setState({
                input:true,
                buttonText:'Add Item',
                edit:false
            })
        }
    }

    inputNameHandler = async (event)=>{
        const description = this.state.newItem.itemDesc
       await this.setState({
            newItem:{
                itemName:event.target.value,
                itemDesc:description,
            },
            nameInput:event.target.value
        })
    }

    inputDescHandler = async (event)=>{
        const name = this.state.newItem.itemName
        await this.setState({
            newItem:{
                itemName:name,
                itemDesc:event.target.value,
            },
            descInput:event.target.value
        })
    }

    itemIndexHandler= async (index)=>{
        await this.setState({itemIndex:index})
        await this.props.indexInfo(this.state.itemIndex)
    }

    

    addItemHandler = async ()=>{
        if(!this.state.edit){
            const oldState = {...this.state}
            let newId = oldState.items.length
            await oldState.items.push({
                id:newId, 
                itemName:oldState.newItem.itemName,
                itemDesc:oldState.newItem.itemDesc,
                created:new Date().toISOString().slice(0,10)
            })
            await this.setState({
                items:oldState.items,
                input:false,
                newItem:{},
                itemIndex:newId,
                nameInput:'',
                descInput:''
            })
            await this.passItemData()
        } else {
            const oldState = {...this.state}
            
            oldState.items.forEach((item,i)=>{
            let newId= oldState.editIndex
                if(i === newId){
                    item.itemName=oldState.newItem.itemName
                    item.itemDesc=oldState.newItem.itemDesc
                    item.lastEdited=new Date().toISOString().slice(0,10)
                }
                this.setState({
                    items:oldState.items,
                    input:false,
                    newItem:{},
                    edit:false,
                    editIndex:undefined,
                    itemIndex:newId,
                    nameInput:'',
                    descInput:''
                })
            })
            this.passItemData()
        }
    }

    deleteItemHandler = async (itemIndex)=>{
        const oldState={...this.state}
        await oldState.items.splice(itemIndex,1)
        await oldState.items.forEach((item, index) => { 
            item.id = index 
        })
        let newIndex=undefined
        if(itemIndex-1>=0){
            newIndex=itemIndex-1
        } else if(oldState.items.length ===1){
            newIndex=0
        }
        await this.setState({
            items:oldState.items,
            itemIndex:newIndex
        })
        this.passItemData()
    }

    editItemHandler= async (itemIndex)=>{
        if(this.state.edit){
           await this.setState({
                edit:false,
                editIndex:undefined,
                nameInput:'',
                descInput:'',
                buttonText:''
            })
        } else if(!this.state.edit){
            let descInput='';
            let nameInput='';
            await this.state.items.forEach((item,i)=>{
                if(i===itemIndex){
                    descInput=item.itemDesc;
                    nameInput=item.itemName;
                    this.setState({
                        input:false,
                        edit:true,
                        editIndex:itemIndex,
                        nameInput:nameInput,
                        descInput:descInput,
                        itemIndex:itemIndex,
                        buttonText:'Edit Item'
                    })
                }
            })
            
        }
    }

    passItemData = async ()=>{
        const itemData=(this.state.items)
        await this.props.itemData(itemData);
        await this.props.indexInfo(this.state.itemIndex)
    }

    render(){
        let inputElement = null
         if(this.state.input){
             inputElement=(
                <Input 
                changedName={this.props.changedName}
                changedDesc={this.props.changedDesc}
                addItem={this.props.addItem}
                // changedName={this.inputNameHandler}
                // changedDesc={this.inputDescHandler}
                // addItem={this.addItemHandler}
                nameInput={this.state.nameInput}
                descInput={this.state.descInput}
                buttonText={this.state.buttonText}/>
             )
         } 

         let editElement = null
         if(this.state.edit){
            editElement=(
                <Input 
                changedName={this.inputNameHandler}
                changedDesc={this.inputDescHandler}
                addItem={this.addItemHandler}
                nameInput={this.state.nameInput}
                descInput={this.state.descInput}
                buttonText={this.state.buttonText}/>
             )
         }

         let itemElement = null
         if(this.props.items.length !== 0 ){
             console.log(this.props.items)
             itemElement = this.props.items.map((i,index)=>{
                 return <Items
                        className={classes.items}
                        id={i.id}
                        name={i.itemName}
                        key={index}
                        deleteClicked={()=>this.props.deleteItem(index)}
                        // deleteClicked={()=>this.deleteItemHandler(index)}
                        itemIndex={()=>this.itemIndexHandler(index)}
                        editInput={()=>this.editItemHandler(index)}
                        editIndex={this.state.editIndex}
                        editElement={editElement}/>
             })
         }else{
             itemElement = <h4 className={classes.items}>Please add an Item</h4>
         }

        return(
            <div className={classes.items}>
                <ListGroup> 
                    {itemElement}
                </ListGroup>
               <hr className={classes.hr}/>
                <Button 
                className={classes.button}
                onClick={this.toggleInputHandler} 
                size="sm"
                outline color='info'>
                    Add Items 
                    <FontAwesomeIcon icon='plus'/>
                </Button>
                {inputElement}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        items:state.items
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        changedName:(event)=>dispatch({type:'CHANGED_NAME', payload:event.target.value}),
        changedDesc:(event)=>dispatch({type:'CHANGED_DESC',payload:event.target.value}),
        addItem:()=>dispatch({type:'ADD_ITEM'}),
        deleteItem:(index)=>dispatch({type:'DELETE_ITEM',index:index})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List)