import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux'
import axios from '../../axios'
import * as actionCreators from '../../store/actions/index'

import classes from './List.module.css'
import {Button,ListGroup} from 'reactstrap'
import Input from '../UI/Input/Input'
import Items from './Items/Items'


class List extends Component{

    // componentWillMount() {
    //     axios.get('/list/items.json')
    //     .then(response=>{
    //        console.log("response.data")
    //        console.log(response.data)
    //        if(response.data){
    //         this.props.initialState(response.data)
    //        }
           
    //     }).catch(error=>console.log(error))
    //   }

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
         let items = undefined
         if(this.props.state.activeTab === '1'){
             items = this.props.shortTerm
         } else if (this.props.state.activeTab ==='2'){
             items = this.props.mediumTerm
         } else if (this.props.activeTab ==='3'){
             items = this.props.longTerm
         }
         if(items && items.length !== 0 ){
             itemElement = items.map((i,index)=>{
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

const mapStateToProps = (state) =>{
    return{
        shortTerm:state.items.shortTerm,
        mediumTerm:state.items.mediumTerm,
        longTerm:state.items.longTerm,
        input:state.input,
        state:state,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        toggleInputHandler:()=>dispatch(actionCreators.toggleInput()),
        changedName:(event)=>dispatch(actionCreators.changedName(event)),
        changedDesc:(event)=>dispatch(actionCreators.changedDesc(event)),
        addItem:()=>dispatch(actionCreators.addItem()),
        deleteItem:(index)=>dispatch(actionCreators.deleteItem(index)),
        editItemHandler:(index)=>dispatch(actionCreators.editItemHandler(index)),
        editItem:()=>dispatch(actionCreators.editItem()),
        itemIndexChanger:(index)=>dispatch(actionCreators.itemIndexChanger(index)),
        initialState:(value)=>dispatch(actionCreators.initialState(value))
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(List)