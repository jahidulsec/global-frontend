import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import Button from '../../../Utilities/Button'
import { useGeneralPOST } from '../../../hooks/useGeneralPOST'
import SuccessStatus from '../../../Utilities/SuccessStatus'
import ErrorStatus from '../../../Utilities/ErrorStatus'
import { useAuthContext } from '../../../context/AuthContext'



const CategoryAddForm = () => {

    const {auth} = useAuthContext()

    const [loading, error, success, handleCategory] = useGeneralPOST()


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
            handleCategory(`category`,values, auth)
            if (success) {   
                formik.resetForm()
            }
        },
        validationSchema: Yup.object({
            title: Yup.string().required("enter title!"),
        })
    })


  return (
    <form className="add-form styled" onSubmit={formik.handleSubmit}>
        <h2>Add Category</h2>
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
        <Button 
            type={'submit'}
            className={'secondary-btn'}
            loading={loading}
        >
            Add Category
        </Button>
        
        <SuccessStatus success={success} />
        
        <ErrorStatus error={error} />
        
    </form>
  )
}

export default CategoryAddForm