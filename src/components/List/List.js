import React, {Component,Fragment} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import classes from './List.module.css'
import {Button,ListGroup} from 'reactstrap'
import Input from '../UI/Input/Input'
import Items from './Items/Items'
import {ShortItemsSpinner,MediumItemsSpinner,LongItemsSpinner} from '../UI/Spinner/Spinner'


export class List extends Component{

    render(){
        let inputElement = null
         if(this.props.input){
             inputElement=(
                <Input 
                changedName={this.props.changedName}
                changedDesc={this.props.changedDesc}
                addOrEdit={this.props.addItem}
                nameInput={this.props.nameInput}
                descInput={this.props.descInput}
                buttonText={this.props.buttonText}/>
             )
         } 

         let editElement = null
         if(this.props.edit){
            editElement=(
                <Input 
                changedName={this.props.changedName}
                changedDesc={this.props.changedDesc}
                addOrEdit={this.props.editItem}
                nameInput={this.props.nameInput}
                descInput={this.props.descInput}
                buttonText={this.props.buttonText}/>
             )
         }
         let itemElement = null
         let items = null
         let buttonElement = null
         let backgroundStyle = classes.shortBack
         let Spinner = null
         if(this.props.activeTab === '1'){
             Spinner = <ShortItemsSpinner/>
             items = this.props.shortTerm
             backgroundStyle = classes.shortBack
             buttonElement =(
                <Button 
                    className={classes.button}
                    onClick={this.props.toggleInputHandler} 
                    size="sm"
                    outline color='warning'>
                        Add Items 
                        <FontAwesomeIcon icon='plus'/>
                </Button>)
         } else if (this.props.activeTab ==='2'){
             Spinner = <MediumItemsSpinner/>
             items = this.props.mediumTerm
             backgroundStyle = classes.mediumBack
             buttonElement =(
                <Button 
                    className={classes.button}
                    onClick={this.props.toggleInputHandler} 
                    size="sm"
                    outline color='primary'>
                        Add Items 
                        <FontAwesomeIcon icon='plus'/>
                </Button>)
         } else if (this.props.activeTab ==='3'){
             Spinner = <LongItemsSpinner/>
             items = this.props.longTerm
             backgroundStyle=classes.longBack
             buttonElement =(
                <Button 
                    className={classes.button}
                    onClick={this.props.toggleInputHandler} 
                    size="sm"
                    outline color='danger'>
                        Add Items 
                        <FontAwesomeIcon icon='plus'/>
                </Button>)
         }
         if(items && items.length !== 0 ){
             itemElement = items.map((i,index)=>{
                 return <Items
                        id={index}
                        name={i.itemName}
                        key={index}
                        deleteClicked={()=>this.props.deleteItem(index)}
                        itemIndex={()=>this.props.itemIndexChanger(index)}
                        editInput={()=>this.props.editItemHandler(index)}
                        editIndex={this.props.editIndex}
                        editElement={editElement}/>
             })
         }else{
             itemElement = <h4 className={classes.items}>Please add an Item</h4>
         }

         let content = this.props.loading ? Spinner : (
             <Fragment>
                <ListGroup> 
                    {itemElement}
                </ListGroup>
                <hr className={classes.hr}/>
                {buttonElement}
                {inputElement}
             </Fragment>  
        )
        return(
            <div className={[classes.items,backgroundStyle].join(' ')}>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        shortTerm:state.reducer.items.shortTerm,
        mediumTerm:state.reducer.items.mediumTerm,
        longTerm:state.reducer.items.longTerm,
        input:state.reducer.input,
        edit:state.reducer.edit,
        editIndex:state.reducer.editIndex,
        nameInput:state.reducer.nameInput,
        descInput:state.reducer.descInput,
        buttonText:state.reducer.buttonText,
        activeTab:state.reducer.activeTab,
        userId:state.auth.userId,
        loading:state.reducer.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        toggleInputHandler:()=>dispatch(actionCreators.toggleInput()),
        changedName:(event)=>dispatch(actionCreators.changedName(event)),
        changedDesc:(event)=>dispatch(actionCreators.changedDesc(event)),
        addItem:()=>dispatch(actionCreators.addItem()),
        deleteItem:(index)=>dispatch(actionCreators.confirmation(index)),
        // deleteItem:(index)=>dispatch(actionCreators.deleteItem(index)),
        editItemHandler:(index)=>dispatch(actionCreators.editItemHandler(index)),
        editItem:()=>dispatch(actionCreators.editItem()),
        itemIndexChanger:(index)=>dispatch(actionCreators.itemIndexChanger(index)),
        initialState:(value)=>dispatch(actionCreators.initialState(value)),
        fetchItems:()=>dispatch(actionCreators.fetchItems())
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(List)