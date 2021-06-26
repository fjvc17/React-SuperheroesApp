import React from 'react'
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik'
import { useHistory } from 'react-router-dom'
import axios from 'axios';

export const Login = () => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: values => {
      axios.post("http://challenge-react.alkemy.org", { email: values.email, password: values.password }).then(r => {
        localStorage.setItem('token', r.token)
        history.replace('/')
      })
    }
  });
  console.log({ error: formik.errors })
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="container mt-5">
        <input onBlur={formik.handleBlur} className="form-control mb-4" onChange={formik.handleChange} type="email" id="email" name="email" value={formik.values.email} />
        {formik.errors.email && formik.touched.email ? <div className="invalid-feedback d-block">{formik.errors.email}</div> : null}
        <input onBlur={formik.handleBlur} className="form-control" onChange={formik.handleChange} type="password" id="password" name="password" value={formik.values.password} />
        <button className="btn btn-primary">Login</button>
      </form>
    </>
  )
}
