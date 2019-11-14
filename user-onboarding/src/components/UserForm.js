import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, status }) => {
  const [users, setUsers] = useState('');

  useEffect(() => {
    status && setUsers(status);
  }, [status]);

  return(
    <div>
      <Form>
        <label htmlFor='name'>Name:</label>
        <Field name='name' type='text' placeholder='first and last name' />
        <br/>
        {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        <br/>
        <label htmlFor='email'>Email:</label>
        <Field name='email' type='email' placeholder='Email' />
        <br/>
        {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        <br/>
        <label htmlFor='password'>Password:</label>
        <Field name='password' type='password' placeholder='Password' />
        <br/>
        {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        <br/>
        <label htmlFor='terms'>Terms of service:</label>
        <Field name='terms' type='checkbox' /><span>I Agree</span>
        <br/>
        {touched.terms && errors.terms && (
            <p className="errors">{errors.terms}</p>
          )}
        <br/>
        <button type='submit'>Submit!</button>
      </Form>
      <p>Thanks for signing up {users.name}</p>
    </div>
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
      terms: Yup.boolean().oneOf([true], 'Please agree to terms of service').required()
  }),
  handleSubmit(user, { setStatus, resetForm }) {
    axios
      .post('https://reqres.in/api/users', user)
      .then(res => {
        setStatus(res.data);
        console.log(res)
        resetForm();
      })
      .catch(err => console.log(err))
      .finally()
  }
})(UserForm);

export default FormikUserForm;