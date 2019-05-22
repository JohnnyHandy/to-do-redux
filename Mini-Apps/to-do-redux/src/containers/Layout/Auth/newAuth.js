import React from 'react'
import {Button, FormGroup,FormFeedback, Label} from 'reactstrap'
import {Formik,Form, Field,ErrorMessage} from 'formik'
import * as yup from 'yup'

const validations = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(2).required()
})

const myForm = ({
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  }) => {
    
    return(
        <Formik initialValues={{email:'cool@gmail.com',password:''}} onSubmit = {handleSubmit} validationSchema={validations}>
            {()=>(
                <Form onSubmit={handleSubmit} >
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Field type='email' name='email' id='email' placeholder='Place your Email'/>
                        <ErrorMessage component='span' name='email' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Field type='password' name='password' id='password' placeholder='Insert your password'/>
                        <ErrorMessage component='span' name='password' />
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                </Form>
            )}
        </Formik>
    )
}
export default myForm