import React from 'react';
import UserForm from './components/Form'
import FormikUserForm from './components/UserForm'
import './App.css';

function App() {
  return (
    <div className="App">
      <h3>using Formik</h3>
      <UserForm />
      <h3>usign withFormik</h3>
      <FormikUserForm />
    </div>
  );
}

export default App;
