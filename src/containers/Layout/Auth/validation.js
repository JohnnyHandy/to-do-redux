import * as Yup from 'yup'


const validation = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('A valid email adress is required')
      .max(35),
    password:Yup.string()
    .required('A valid password is required')
    .max(8)
  });
  
  export default validation;