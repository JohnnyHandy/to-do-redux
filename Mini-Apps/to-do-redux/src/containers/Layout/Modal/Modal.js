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
                    <CardHeader>Authentication Page
                        <Button close onClick={props.toggleModal}><FontAwesomeIcon icon='times'/></Button> 
                    </CardHeader>
                </Col>
            </Row>            
            <Row>
                <Col className={classes.col} lg={6} md={6} sm={6} style={{paddingRight: 0}}> 
                    <ModalHeader className={classes.header}>Sign-In</ModalHeader>
                    <ModalBody>
                        <ModalForm type='Sign-In'/>
                    </ModalBody>
                </Col>
                <Col lg={6} md={6} sm={6} style={{paddingLeft: 0}}> 
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