import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Button,ListGroup} from 'reactstrap'
import Input from '../UI/Input/Input'
import Items from './items/items'

class List extends Component{
    state={
        items:[],
        newItem:{},
        input:false
    }

    toggleInputHandler =()=>{
        if(this.state.input){
            this.setState({input:false})
        } else if(!this.state.input){
            this.setState({input:true})
        }
    }

    inputNameHandler = (event)=>{
        this.setState({
            newItem:{itemName:event.target.value}
        })
    }

    addItemHandler = ()=>{
        const oldState = {...this.state}
        let newId = oldState.items.length
        oldState.items.push({
            id:newId, 
            itemName:oldState.newItem.itemName,
            created:new Date().toISOString().slice(0,10)
        })
        this.setState({
            items:oldState.items,
            input:false,
            newItem:{}
        })
    }

    render(){
        let inputElement = null
         if(this.state.input){
             inputElement=(
                <Input 
                changedName={this.inputNameHandler}
                addItem={this.addItemHandler}/>
             )
         }

         let itemElement = null
         if(this.state.items.length !== 0 ){
             itemElement = this.state.items.map((i,index)=>{
                 return <Items
                        name={i.itemName}
                        key={index}/>
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