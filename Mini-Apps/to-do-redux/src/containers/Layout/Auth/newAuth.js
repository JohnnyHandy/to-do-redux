import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, FormGroup, Label,Alert,Col} from 'reactstrap'
import {Formik,Form, Field,} from 'formik'
import * as yup from 'yup'
import classes from './Auth.module.css'

const validations = yup.object().shape({
    email:yup.string().email().required('Email is Required'),
    password:yup.string().min(2,'Minimum of 2 characters').required('Password is Required')
})


class myForm extends Component {
    state={
        formControl:{
            email:'',
            password:''
        }
    }
    render(){

       const handleEmailChange = (event) =>{
            console.log(event.target.value)
        }

        return(
            <Formik 
                initialValues={{email:this.state.formControl.email,password:this.state.formControl.password}} 
                onSubmit = {
                    (values)=>{
                        alert(JSON.stringify(values))
                    }
                }
                validationSchema={validations}>
                {(
                    {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                      }
                )=>(
                    <Form onSubmit={handleSubmit} className={classes.form}>   
                        <FormGroup row>
                            <Label for='email' sm={2}>Email</Label>
                            <Col sm={10}>
                                <Field className='form-control' type='email' name='email' id='email' placeholder='Place your Email' value={values.email}/>
                                {errors.email && touched.email && <Alert color='danger'>{errors.email}</Alert>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='password' sm={2}>Password</Label>
                            <Col sm={10}>
                                <Field className='form-control' onChange={handleChange} type='password' name='password' id='password' placeholder='Insert your password' value={values.password}/>
                                {errors.password && touched.password && <Alert color='danger'>{errors.password}</Alert>}
                            </Col>
                        </FormGroup>
                            <Button type='submit'>Submit</Button>
                    </Form>
                )}
            </Formik>
        )
    }
    
}

const mapStateToProps = state =>{
    return
}

const mapDispatchToProps = dispatch =>{
    return{
        
    }
}
export default connect()(myForm)