import React, { useEffect } from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, status }) => {

  // useEffect(() => {
  //   status(user => {

  //   }, [status])
  // })
  return(
    <Form>
      <label htmlFor='name'>Name:</label>
      <Field id='name' name='name' type='text' placeholder='first and last name' />
      {touched.name && errors.name && (
          <p className="errors">{errors.name}</p>
        )}

      <label htmlFor='email'>Email:</label>
      <Field id='email' name='email' type='email' placeholder='Email' />
      <ErrorMessage name='email' component='p' />

      <label htmlFor='password'>Password:</label>
      <Field id='password' name='password' type='password' placeholder='Password' />
      <ErrorMessage name='password' component='p' />

      <label htmlFor='terms'>Terms of service:</label>
      <Field id='terms' name='terms' type='checkbox' /><span>I Agree</span>
      <ErrorMessage name='terms' component='p' />
      
      <button>Submit!</button>
    </Form>
  )
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms}){
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      terms: terms || false
    };
  },
  validationSchema: Yup.object().shape({
      name: Yup.string().required('Please enter your Name'),
      email: Yup.string().required('Please enter your Email'),
      password: Yup.string().required('Please enter your Password'),
      terms: Yup.boolean('true').required('Please agree to terms of service')
  }),
  handleSubmit(user, { setStatus, status }) {
    axios.post('https://reqres.in/api/users', user)
    .then(res => {
      setStatus(res.data);
      console.log(res);
      console.log(status)
    })
    .catch(err => console.log(err))
    .finally()
  }
})(UserForm);

export default FormikUserForm;