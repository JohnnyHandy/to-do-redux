import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux'
import axios from '../../axios'

import classes from './List.module.css'
import {Button,ListGroup} from 'reactstrap'
import Input from '../UI/Input/Input'
import Items from './Items/Items'


class List extends Component{

    componentDidMount() {
        axios.get('https://to-do-list-299ec.firebaseio.com/list/items.json')
        .then(response=>{
           console.log("response.data")
           console.log(response.data)
           this.props.initialState()
        }).catch(error=>console.log(error))
      }

    render(){
        let inputElement = null
         if(this.props.input){
             inputElement=(
                <Input 
                changedName={this.props.changedName}
                changedDesc={this.props.changedDesc}
                addOrEdit={this.props.addItem}
                nameInput={this.props.state.nameInput}
                descInput={this.props.state.descInput}
                buttonText={this.props.state.buttonText}/>
             )
         } 

         let editElement = null
         if(this.props.state.edit){
            editElement=(
                <Input 
                changedName={this.props.changedName}
                changedDesc={this.props.changedDesc}
                addOrEdit={this.props.editItem}
                nameInput={this.props.state.nameInput}
                descInput={this.props.state.descInput}
                buttonText={this.props.state.buttonText}/>
             )
         }

         let itemElement = null

         if(this.props.items && this.props.items.length !== 0 ){
             itemElement = this.props.items.map((i,index)=>{
                 return <Items
                        className={classes.items}
                        id={index}
                        name={i.itemName}
                        key={index}
                        deleteClicked={()=>this.props.deleteItem(index)}
                        itemIndex={()=>this.props.itemIndexChanger(index)}
                        editInput={()=>this.props.editItemHandler(index)}
                        editIndex={this.props.state.editIndex}
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
                onClick={this.props.toggleInputHandler} 
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
        items:state.items,
        input:state.input,
        state:state
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        toggleInputHandler:()=>dispatch({type:'TOGGLE_INPUT_HANDLER'}),
        changedName:(event)=>dispatch({type:'CHANGED_NAME', payload:event.target.value}),
        changedDesc:(event)=>dispatch({type:'CHANGED_DESC',payload:event.target.value}),
        addItem:()=>dispatch({type:'ADD_ITEM'}),
        deleteItem:(index)=>dispatch({type:'DELETE_ITEM',index:index}),
        editItemHandler:(index)=>dispatch({type:'EDIT_ITEM_HANDLER',index:index}),
        editItem:()=>dispatch({type:'EDIT_ITEM'}),
        itemIndexChanger:(index)=>dispatch({type:'CHANGE_ITEM_INDEX',index:index}),
        initialState:(value)=>dispatch({type:'SET_STATE',payload:value})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List)