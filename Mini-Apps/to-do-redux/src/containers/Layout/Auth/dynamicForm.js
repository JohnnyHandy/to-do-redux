import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../../store/actions/index'
import {Formik,Field,ErrorMessage} from 'formik'
import {Label,FormGroup,Col,Alert,Button} from 'reactstrap'
import classes from './Auth.module.css'

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
        <FormGroup row key={input.name}>
            <Label sm={2}>{input.label}</Label>
            <Col sm={10}>
                <Field
                name={input.name}
                render={(props)=>{
                    const {field}=props;
                    return (
                        <input 
                            className='form-control' 
                            {...field}
                            type='password'
                        />
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
                <Label sm={2}>{input.label}</Label>
                <Col sm={10}>
                    <Field
                        name={input.name}
                        render={(props)=>{
                            const {field} = props;
                            return(
                                <input
                                    {...field}
                                    className='form-control'
                                    type='email' 
                                /> 
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

        return(
                <Formik
                    onSubmit={(values)=>{this.props.onSubmit(values.email,values.password)}}
                    validationSchema={this.props.validation}
                    initialValues={initialValues}
                    render={(form)=>{
                        return (
                                <form onSubmit = {form.handleSubmit} className={classes.form}>
                                    {this.renderFields(this.props.fields)}
                                    <Button color='primary' type='submit'>Submit</Button>
                                </form>
                        )
                    }}
                />
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSubmit:(email,password)=>{dispatch(actions.authStart(email,password))}
    }
}

export default connect(null,mapDispatchToProps)(DynamicForm)