import React from 'react'
import {Modal} from 'reactstrap'
import {connect} from 'react-redux'
import AuthForm from '../Auth/authForm'
import {AuthSpinner} from '../../../components/UI/Spinner/Spinner'
import * as actionTypes from '../../../store/actions/index'


const modal = (props)=>{

    let modalContent = props.loading ? <AuthSpinner/> : <AuthForm/>
    
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
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(modal)