import React, {Component, Fragment} from 'react'
import {Formik,Field} from 'formik'
import {Label,FormGroup,Col} from 'reactstrap'

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
                                    className='form-control'
                                    {...field}
                                    type='email' 
                                />
                            )
                        }}
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
            <div>
                <Formik
                    onSubmit={(values)=>{console.log(values)}}
                    validationSchema={this.props.validation}
                    initialValues={initialValues}
                    render={(form)=>{
                        return (
                                <form onSubmit = {form.handleSubmit} className={classes.form}>
                                    {this.renderFields(this.props.fields)}
                                    <button type='submit'>Submit</button>
                                </form>
                        )
                    }}
                />
            </div>
        )
    }
}

export default DynamicForm