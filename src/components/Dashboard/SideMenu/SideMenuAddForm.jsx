import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Button from '../../../Utilities/Button'
import { useLocation } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { useGeneralPOST } from '../../../hooks/useGeneralPOST'
import SuccessStatus from '../../../Utilities/SuccessStatus'
import ErrorStatus from '../../../Utilities/ErrorStatus'
import { useAuthContext } from '../../../context/AuthContext'



const SideMenuAddForm = () => {

    const {pathname} = useLocation()
    const [loading, error, success, handleSideMenu] = useGeneralPOST()
    
    const {auth} = useAuthContext()

    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, document.body.scrollHeight)
        }

        if (success) {   
            formik.resetForm()
        }
    }, [success, error])



    // add form formik

    const formik = useFormik({
        initialValues: {
            title: '',
            logo: '',
        },
        onSubmit: async(values) => {
            handleSideMenu(`side-menu`, values, auth)
        },
        validationSchema: Yup.object({
            title: Yup.string().required("enter slug title!"),
            logo: Yup.string().required("enter title!"),
        })
    })






  return (
    <form className="add-form styled" onSubmit={formik.handleSubmit}>
        <h2>Add Side Menu</h2>
        
        <p>
            <label htmlFor="title">Name <span></span></label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                placeholder='e.g. Processor'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}  
            />
            {
                formik.errors.title && formik.touched.title &&
                <span className="required">{formik.errors.title}</span>
            }
            {
                error?.title &&
                <span className="required">{error.title}</span>
            }
        </p>
        <p>
            <label htmlFor="logo">Logo <span></span></label>
            <input 
                type="text" 
                name="logo" 
                id="logo" 
                placeholder='e.g. macbook-line, see "remix-icon" website '
                value={formik.values.logo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.logo && formik.touched.logo &&
                <span className="required">{formik.errors.logo}</span>
            }
            {
                error?.logo &&
                <span className="required">{error.title}</span>
            }
        </p>
        <Button 
            type={'submit'}
            className={'secondary-btn'}
            loading={loading}
        >
            Add Side Menu
        </Button>

        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />
        
    </form>
  )
}

export default SideMenuAddForm