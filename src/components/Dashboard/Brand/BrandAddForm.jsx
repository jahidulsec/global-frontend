import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Button from '../../../Utilities/Button'
import { useLocation } from 'react-router-dom'
import { useFormPOST } from '../../../hooks/useFormPOST'
import SuccessStatus from '../../../Utilities/SuccessStatus'
import ErrorStatus from '../../../Utilities/ErrorStatus'
import { useGeneralPOST } from '../../../hooks/useGeneralPOST'
import { useAuthContext } from '../../../context/AuthContext'



const BrandAddForm = () => {

    const {auth} = useAuthContext()

    const {pathname} = useLocation()

    const [loading, error, success, handleBrand] = useGeneralPOST()

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
        },
        onSubmit: async(values) => {

            handleBrand(`brand`, values, auth)
          
        },
        validationSchema: Yup.object({
            title: Yup.string().required("enter title!"),
            })
    })



  return (
    <form className="add-form styled" onSubmit={formik.handleSubmit}>
        <h2>Add Brand</h2>
        <p>
            <label htmlFor="title">Name <span></span></label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                placeholder='e.g. Asus'
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
        

        <Button 
            type={'submit'}
            className={'secondary-btn'}
            loading={loading}
        >
            Add Brand
        </Button>

        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />
    </form>
  )
}

export default BrandAddForm