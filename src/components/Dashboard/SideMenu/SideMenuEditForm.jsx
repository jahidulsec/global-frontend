import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Utilities/Button'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { useGeneralPUT } from '../../../hooks/useGeneralPUT'
import SuccessStatus from '../../../Utilities/SuccessStatus'
import ErrorStatus from '../../../Utilities/ErrorStatus'
import { useAuthContext } from '../../../context/AuthContext'


const SideMenuEditDash = () => {
    const [response, handleSingleSideMenu] = useGeneralGet()
    const [loading, error, success, handleSideMenu] = useGeneralPUT()

    const {auth} = useAuthContext()

    const { id } = useParams()


    useEffect(() => {
        handleSingleSideMenu(`side-menu`,id)
    }, [])

    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, document.body.scrollHeight)
        }

    }, [success, error])


    
    const formik = useFormik({
        initialValues: {
            title: response?.title,
            logo: response?.logo,
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            handleSideMenu(`side-menu`, id, values, auth)
            
        },
        validationSchema: Yup.object({
            title: Yup.string().required("enter slug title!"),
            logo: Yup.string().required("enter title!"),
        })
    })


  return (
    response &&
    <form className="add-form styled" onSubmit={formik.handleSubmit}>

        <h2>Edit Side Menu</h2>
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
            Update Side Menu
        </Button>

        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />

    </form>
  )
}

export default SideMenuEditDash