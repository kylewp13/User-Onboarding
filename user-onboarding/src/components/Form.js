import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const validate = ({ name, email, password, terms }) => {
  const errors = {};

  if (!name){
    errors.name = 'Please enter your name'
  }

  if (!email){
    errors.email = 'Please enter your Email'
  }

  if (!password){
    errors.password = 'Please enter your Password'
  }

  if (!terms){
    errors.terms = 'Please agree to terms of service'
  }
  return errors
};

const UserForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (values, tools) => {
    axios.post('https://reqres.in/api/users', values)
    .then(res => {
      setMessage(res.data);
      tools.resetForm();
    })
    .catch(error => console.log(error))
    .finally(() => {
      tools.setSubmitting(false);
    })
  }

  return(
    <Formik
      initialValues={{ name: '', email: '', password: '', terms: false }}
      validate={validate}
      onSubmit={handleSubmit}>
      {props => (
        <div>
          <Form>
            <label htmlFor='name'>Name:</label>
            <Field id='name' name='name' type='text' placeholder='first and last name' />
            <ErrorMessage name='name' component='div' />

            <label htmlFor='email'>Email:</label>
            <Field id='email' name='email' type='email' placeholder='Email' />
            <ErrorMessage name='email' component='div' />

            <label htmlFor='password'>Password:</label>
            <Field id='password' name='password' type='password' placeholder='Password' />
            <ErrorMessage name='password' component='div' />

            <label htmlFor='terms'>Terms of service:</label>
            <Field id='terms' name='terms' type='checkbox' /><span>I Agree</span>
            <ErrorMessage name='terms' component='div' />
            
            <button type='submit' disabled={props.isSubmitting}>
              {
                props.isSubmitting ? 'SUBMITTING' : 'submit'
              }
            </button>
          </Form>
            <p>Thanks for signing up {message.name}.</p>
        </div>
      )}
    </Formik>
  
  )
};

export default UserForm;