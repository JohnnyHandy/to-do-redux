import React, {Component} from 'react'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'

class Auth extends Component{
    submitHandler =(event)=>{
        event.preventDefault()
        this.props.onAuth(this.props.email,this.props.password,this.props.isSignup)
    }
    render(){

        return(
            <Form onSubmit = {this.submitHandler}>
                <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input onChange={this.props.emailChange} type='email' name='email' id='email' placeholder='Place your Email'/>
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input onChange={this.props.passwordChange} type='password' name='password' id='password' placeholder='Insert your password'/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        )
    }
}

const mapStateToProps = state =>{
    return{
        email:state.auth.authForm.email,
        password:state.auth.authForm.password,
        isSignup:state.reducer.modalType
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        emailChange:(event)=>dispatch(actions.changeEmail(event)),
        passwordChange:(event)=>dispatch(actions.changePassword(event)),
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)
