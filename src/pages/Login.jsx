import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import PasswordField from '../Utilities/PasswordField'
import Button from '../Utilities/Button'
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from '../context/AuthContext'


const Login = () => {

    const [user, setUser] = useState()
    const navigation = useNavigate()

    const {response, loading, error, login} = useLogin()


    const fetchUserData = async() => {
        if (response) {
            await fetch(import.meta.env.VITE_API_URL+"/auth/v1/users/me/", {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + response.auth_token, 
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data)
                })
        }
    }

    useEffect(() => {
        if (!response?.non_field_errors) {
            localStorage.setItem('glc_t', JSON.stringify(response?.auth_token))
            fetchUserData()
            if (user) {
                navigation('/')
                return
            }
        }
    },[response, error, user])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async(values) => {
            login(values)
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter valid email address!').required('Enter valid email address!'),
            password: Yup.string().required('Enter your password!').min(8, 'at least 8 characters long!')
        })
    })

    


  return (
    <>
    <Helmet>
        <title>Login | Global Computer (BD)</title>
    </Helmet>
    <section className='login-page'>
        <div className="container">
            <div className="wrapper">
                <div className="login flexwrap">
                    <div className="item right mobile-hide">
                        <img src="/login_bg.jpg" alt="signup_bg" loading='lazy' />
                    </div>

                    <div className="item left styled">
                        <h1>Login</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <p>
                                <label htmlFor="email">Email <span></span></label>
                                <input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    {...formik.getFieldHelpers('email')}
                                />
                                {
                                    formik.errors.email && formik.touched.email &&
                                    <span className="required">{formik.errors.email}</span>
                                }
                            </p>
                            
                            <p>
                                <label htmlFor="password">Password <span></span></label>
                                <PasswordField 
                                    name={`password`}
                                    id={`password`}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.errors.password && formik.touched.password &&
                                    <span className="required">{formik.errors.password}</span>
                                }
                            </p>
                            
                            <Button
                                type="submit"
                                className='primary-btn'
                                loading={loading}
                            >
                                Login
                            </Button>
                        </form>


                            <div className={`required-msg ${error?.non_field_errors && `failed`}`}>
                                {error?.non_field_errors}
                            </div>

                        <div className="footer flexitem">
                            <Link>
                                <p className='mini-text'>
                                    <b>
                                        Forget Password?
                                    </b>
                                </p>
                            </Link>
                            <p className='mini-text'>|</p>
                            <p className='mini-text'>Create an account?</p>
                            <button 
                                className="mini-text" 
                                type='button'
                            >
                                <Link to={`/signup`}>
                                    <b>Sign up</b>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login