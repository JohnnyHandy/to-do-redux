import React from 'react'
import {Modal,ModalHeader,ModalBody} from 'reactstrap'
import {connect} from 'react-redux'

import Auth from '../Auth/Auth'
import BasicExample from '../Auth/newAuth'

import * as actionTypes from '../../../store/actions/index'


const modal = (props)=>{
    return(
        <Modal isOpen={props.modal} toggle={props.toggleModal}>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalBody>
                {/* <Auth/> */}
                <BasicExample/>
            </ModalBody>
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