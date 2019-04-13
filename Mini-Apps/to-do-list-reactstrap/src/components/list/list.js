import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Button,ListGroup} from 'reactstrap'
import Input from '../UI/Input/Input'
import Items from './items/items'

class List extends Component{
    state={
        items:[],
        newItem:{},
        input:false,
        itemIndex:0
    }

    toggleInputHandler =()=>{
        if(this.state.input){
            this.setState({input:false})
        } else if(!this.state.input){
            this.setState({input:true})
        }
    }

    inputNameHandler = (event)=>{
        const description = this.state.newItem.itemDesc
        this.setState({
            newItem:{
                itemName:event.target.value,
                itemDesc:description
            }
        })
    }

    itemIndexHandler= async (index)=>{
        await this.setState({itemIndex:index})
        await this.props.indexInfo(this.state.itemIndex)
    }

    inputDescHandler = (event)=>{
        const name = this.state.newItem.itemName
        this.setState({
            newItem:{
                itemName:name,
                itemDesc:event.target.value
            }
        })
    }

    addItemHandler = ()=>{
        const oldState = {...this.state}
        let newId = oldState.items.length
        oldState.items.push({
            id:newId, 
            itemName:oldState.newItem.itemName,
            itemDesc:oldState.newItem.itemDesc,
            created:new Date().toISOString().slice(0,10)
        })
        this.setState({
            items:oldState.items,
            input:false,
            newItem:{},
            itemIndex:newId
        })
        this.passItemData()
    }

    deleteItemHandler = async (itemIndex)=>{
        const oldState={...this.state}
        await oldState.items.splice(itemIndex,1)
        await oldState.items.forEach((item, index) => { 
            item.id = index 
        })
        await this.setState({
            items:oldState.items
        })
        this.passItemData()
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
                changedName={this.inputNameHandler}
                changedDesc={this.inputDescHandler}
                addItem={this.addItemHandler}/>
             )
         }

         let itemElement = null
         if(this.state.items.length !== 0 ){
             itemElement = this.state.items.map((i,index)=>{
                 return <Items
                        id={i.id}
                        name={i.itemName}
                        key={index}
                        deleteClicked={()=>this.deleteItemHandler(index)}
                        itemIndex={()=>this.itemIndexHandler(index)}/>
             })
         }

        return(
            <div>
                <ListGroup>
                    {itemElement}
                </ListGroup>
               
                <Button onClick={this.toggleInputHandler} size="sm">Add Items <FontAwesomeIcon icon='plus'/></Button>
                {inputElement}
            </div>
        )
    }
}

export default List