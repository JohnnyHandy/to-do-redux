import React from 'react'
import {Modal,ModalHeader,ModalBody,Col,Row,Button,CardHeader} from 'reactstrap'
import {connect} from 'react-redux'
import ModalForm from '../Auth/modalForm'

import * as actionTypes from '../../../store/actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Modal.module.css'

const modal = (props)=>{
    return(
        
        <Modal size='lg' isOpen={props.modal} toggle={props.toggleModal}>
            <Row>
                <Col sm={12}>
                    <CardHeader className={classes.cardHeader} >Authentication Page
                        <Button close onClick={props.toggleModal}><FontAwesomeIcon icon='times'/></Button> 
                    </CardHeader>
                </Col>
            </Row>            
            <Row>
                <Col className={classes.colRight} lg={6} md={6} sm={6}> 
                    <ModalHeader className={classes.header}>Sign-In</ModalHeader>
                    <ModalBody className={classes.modalBody}>
                        <ModalForm type='Sign-In'/>
                    </ModalBody>
                </Col>
                <Col className={classes.colLeft} lg={6} md={6} sm={6}> 
                    <ModalHeader className={classes.header}>Sign-Up</ModalHeader>
                    <ModalBody>
                        <ModalForm type='Sign-Up'/>
                    </ModalBody>
                </Col>
            </Row>
        </Modal>
        
    )
}

const mapDispatchToProps = dispatch => {
    return{
        toggleModal:()=>dispatch(actionTypes.toggleModal())
    }
}

const mapStatetoProps= (state) =>{
    return{
        modal:state.reducer.modal,
        title:state.reducer.modalType
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(modal)