import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../Utilities/Button'
import { MdContentPasteOff } from 'react-icons/md'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import SuccessStatus from '../../../Utilities/SuccessStatus'
import ErrorStatus from '../../../Utilities/ErrorStatus'
import { useGeneralPUT } from '../../../hooks/useGeneralPUT'
import { useAuthContext } from '../../../context/AuthContext'


const BrandEditDash = () => {

    const {auth} = useAuthContext()
    
    const { id } = useParams()
    
    const [response, handleSingleBrand] = useGeneralGet()
    const [loading, error, success, handleBrand] = useGeneralPUT()

    useEffect(() => {
        handleSingleBrand(`brand`,id)
    }, [])

    useEffect(() => {
        if (error || success) {
            window.scrollTo(0, document.body.scrollHeight)
        }
    }, [success, error])



    
    // add form formik
    const formik = useFormik({
        initialValues: {
            title: response?.title,
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            handleBrand(`brand`, id, values, auth)
        },
        validationSchema: Yup.object({
            title: Yup.string().required("enter title!"),
            })
        })



  return (
    response &&
    <form className="add-form styled" onSubmit={formik.handleSubmit}>

        <h2>Edit Brand</h2>
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
            Update Brand
        </Button>    
    
        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />

    </form>
  )
}

export default BrandEditDash