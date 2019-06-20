import React, {Component} from 'react'
import {Card,Button,ModalBody,ModalFooter} from 'reactstrap'
import {connect} from 'react-redux'
import * as actionTypes from '../../../store/actions/index'
import classes from './Confirmation.module.css'

export class Confirmation extends Component{
    constructor(props) {
        super(props);
      this.handlePositive = this.handlePositive.bind(this);
    }
    handlePositive (){
        this.props.toggleModal();
        this.props.deleteItem()
    }
    render(){
        return(
            <Card>
            <ModalBody className={classes.confirmation}>
                Are you sure you want to delete this Item?
            </ModalBody>
            <ModalFooter className={classes.confirmation}> 
                <Button type='button' color='success' onClick = {this.handlePositive}>Yes</Button>
                <Button type='button' color='danger' onClick = {this.props.toggleModal}>No</Button>
            </ModalFooter>
            </Card>
        )
    }
    
}

const mapDispatchToProps = (dispatch)=>{
    return {
        toggleModal:()=>dispatch(actionTypes.toggleModal()),
        deleteItem:()=>dispatch(actionTypes.deleteItem())
    }
}

export default connect(null,mapDispatchToProps)(Confirmation)