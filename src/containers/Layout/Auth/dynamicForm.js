import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../../store/actions/index'
import {Formik,Field,ErrorMessage} from 'formik'
import {FormGroup,Col,Alert,Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './dynamicForm.module.css'


class DynamicForm extends Component{

    renderFields(inputs){
        // eslint-disable-next-line array-callback-return
        return inputs.map(input=>{
            if(input.type==='email'){
                return this.renderEmail(input)
            } else if(input.type==='password'){
                return this.renderPassword(input)
            }
        })
    }

    renderPassword(input){
        return(
        <FormGroup row key={input.name} >
            <Col sm={12}>
                <Field
                name={input.name}
                render={(props)=>{
                    const {field}=props;
                    return (
                        <div className='input-group'>
                            <div className="input-group-prepend">
                                <div className="input-group-text"><FontAwesomeIcon icon='lock' /></div>
                            </div>
                            <input 
                                placeholder='Password'
                                className='form-control'
                                {...field}
                                type='password'
                            />
                        </div>
                        
                        )
                    }}
                />
                <ErrorMessage
                    name='password'
                    render={msg => <Alert color='danger' className={classes.error}>{msg}</Alert> }
                    className={classes.error}
                />
            </Col>
        </FormGroup>
        )
    }

    renderEmail(input){
        return(
            <FormGroup row key={input.name}>
                <Col sm={12}>
                    <Field
                        name={input.name}
                        render={(props)=>{
                            const {field} = props;
                            return(
                                <div className='input-group'>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><FontAwesomeIcon icon='at'/></div>
                                    </div>
                                     <input
                                        placeholder='Email'
                                        {...field}
                                        className='form-control'
                                        type='email' 
                                    /> 
                                </div>
                               
                            )
                        }}
                    />
                    <ErrorMessage
                        name='email'
                        render={msg => <Alert color='danger' className={classes.error}>{msg}</Alert> }
                    />
                </Col>   
            </FormGroup>
        )
    }

    getInitialValues(inputs){
        //declare an empty initialValues object
        const initialValues={};
        //loop over fields array
        //if prop does not exist in the initial values object,
        //pluck off the name and value props and add it to the initialValues object
        inputs.forEach(field=>{
            if(!initialValues[field.name]){
                initialValues[field.name]=field.value;
            }
        });

        //return initialValues object
        return initialValues
    }

    render(){

        const initialValues = this.getInitialValues(this.props.fields);
        let errorMessage = null
        if(this.props.error.error && (this.props.error.method === this.props.type)){
            errorMessage = (
                <Alert color='danger'>{this.props.error.error.message}</Alert>
            )
        }
        return(
                
                <Formik
                    onSubmit={(values)=>{this.props.onSubmit(values.email,values.password,this.props.type)}}
                    validationSchema={this.props.validation}
                    initialValues={initialValues}
                    render={(form)=>{
                        return (
                                <form onSubmit = {form.handleSubmit} className={classes.form}>
                                    {this.renderFields(this.props.fields)}
                                    <Button color='primary' type='submit'>Submit</Button>
                                    {errorMessage}
                                </form>
                        )
                    }}
                />
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        error:state.auth.error
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        onSubmit:(email,password,method)=>{dispatch(actions.auth(email,password,method))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DynamicForm)