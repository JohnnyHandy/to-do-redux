import React from 'react'
import {Modal} from 'reactstrap'
import {connect} from 'react-redux'
import AuthForm from '../Auth/authForm'
import {AuthSpinner} from '../../../components/UI/Spinner/Spinner'
import Confirmation from '../Confirmation/Confirmation'
import * as actionTypes from '../../../store/actions/index'


const modal = (props)=>{

    let modalContent = props.confirmation ? <Confirmation/> : props.loading ? <AuthSpinner/> : props.modal ? <AuthForm/> :null
    return(
        <Modal size='lg' isOpen={props.modal} toggle={props.toggleModal}>
            {modalContent}
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
        loading:state.auth.loading,
        confirmation:state.reducer.confirmation
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(modal)