import React, {Fragment} from 'react'
import {ModalHeader,ModalBody,Col,Row,Button,CardHeader} from 'reactstrap'
import {connect} from 'react-redux'
import FormData from './formData'
import * as actionTypes from '../../../store/actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './authForm.module.css'

const AuthForm =(props)=>(
    <Fragment>
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
                        <FormData type='Sign-In'/>
                    </ModalBody>
                </Col>
                <Col className={classes.colLeft} lg={6} md={6} sm={6}> 
                    <ModalHeader className={classes.header}>Sign-Up</ModalHeader>
                    <ModalBody>
                        <FormData type='Sign-Up'/>
                    </ModalBody>
                </Col>
            </Row>
        </Fragment>
)

const mapDispatchToProps = dispatch => {
    return{
        toggleModal:()=>dispatch(actionTypes.toggleModal())
    }
}

const mapStatetoProps= (state) =>{
    return{
        modal:state.reducer.modal,
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(AuthForm)

