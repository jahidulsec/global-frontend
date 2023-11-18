import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Button from '../../../Utilities/Button'
import { useLocation, useParams } from 'react-router-dom'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { useFormPUT } from '../../../hooks/useFormPUT'
import { useAuthContext } from '../../../context/AuthContext'



const SliderEditDash = () => {

    const {auth} = useAuthContext()

    const {pathname} = useLocation()
    const {id} = useParams()

    const [response, handleSliderGET] = useGeneralGet()
    const [product, handleProduct] = useGeneralGet()
    const [category, handleCategory] = useGeneralGet()
    const [loading, error, success, handleSlider] = useFormPUT()


    useEffect(() => {
        
        handleCategory(`category`,``,`title`)
        handleSliderGET(`slider`, id)

    }, [pathname])

    

    // image validator
    const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'svg', 'webp'] };

    function getAllowedExt() {
        return validFileExtensions["image"].map((e) => `.${e}`).toString()
    } 


    const MAX_FILE_SIZE = 5 * 10 * 102400; //500KB


    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    let allowedExts = getAllowedExt();


    useEffect(() => {
        if (success || error) {
            window.scrollTo(0, document.body.scrollHeight)
        }
    }, [success, error])


    // add form formik
    const formik = useFormik({
        initialValues: {
            category_id: response?.category_id,
            product_id: response?.product_id,
            mini_text: response?.mini_text,
            mid_text: response?.mid_text,
            color: response?.color,
            image: '',
        },
        enableReinitialize: true,
        onSubmit: async(values) => {
            var formdata = new FormData();
            for (let [key, data] of Object.entries(values)) {
                formdata.append(key, data)
            }

            handleSlider(`slider`, id, formdata, auth)
            
            if (success) {   
                formik.resetForm()
            }
            
        },
        validationSchema: Yup.object({
            category_id: Yup.string().required("enter category!"),
            product_id: Yup.string().required("enter product!"),
            mini_text: Yup.string(),
            mid_text: Yup.string(),
            color: Yup.string(),
            image: Yup
                .mixed()
                .required("Required")
                .test("is-valid-type", "Not a valid image type",
                    value => isValidFileType(value && value.name.toLowerCase(), "image"))
                .test("is-valid-size", "Max allowed size is 500KB",
                    value => value && value.size <= MAX_FILE_SIZE)
            })
    })


    useEffect(() => {
        handleProduct(`product`, ``, `title`,``,``,``,``,``,``,``,``,``,formik.values.category_id)
    }, [formik.values.category_id])




  return (
    <form className="add-form styled" onSubmit={formik.handleSubmit}>
        <h2>Add Slider</h2>
        <p>
            <label htmlFor="category_id">Category <span></span></label>
            <select 
                name="category_id" 
                id="category_id" 
                value={formik.values.category_id}
                onChange={formik.handleChange}
            >
                <option value="" disabled hidden selected>Select Category</option>
                {
                    category &&
                    category.map(item => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))
                }
            </select>
            {
                formik.errors.category_id && formik.touched.category_id &&
                <span className="required">{formik.errors.category_id}</span>
            }
            {
                error?.category_id &&
                <span className="required">{error.category_id}</span>
            }
        </p>
        <p>
            <label htmlFor="product_id">Product <span></span></label>
            <select 
                name="product_id" 
                id="product_id" 
                value={formik.values.product_id}
                onChange={formik.handleChange}
            >
                <option value="" disabled hidden selected>Select product</option>
                {
                    product &&
                    product.map(item => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))
                }
            </select>
            {
                formik.errors.product_id && formik.touched.product_id &&
                <span className="required">{formik.errors.product_id}</span>
            }
            {
                error?.product_id &&
                <span className="required">{error.product_id}</span>
            }
        </p>
        <p>
            <label htmlFor="mini_text">Slider Mini Text</label>
            <input 
                type="text" 
                name="mini_text" 
                id="mini_text" 
                placeholder='e.g. Gaming Laptop'
                value={formik.values.mini_text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.mini_text && formik.touched.mini_text &&
                <span className="required">{formik.errors.mini_text}</span>
            }
            {
                error?.mini_text &&
                <span className="required">{error.mini_text}</span>
            }
        </p>
        <p>
            <label htmlFor="mini_text">Slider Middle Text</label>
            <input 
                type="text" 
                name="mid_text" 
                id="mid_text" 
                placeholder='e.g. Asus ROG Laptop'
                value={formik.values.mid_text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {
                formik.errors.mid_text && formik.touched.mid_text &&
                <span className="required">{formik.errors.mid_text}</span>
            }
            {
                error?.mid_text &&
                <span className="required">{error.mid_text}</span>
            }
        </p>

        <p>
            <label htmlFor="color">Color</label>
            <select 
                name="color" 
                id="color" 
                value={formik.values.color}
                onChange={formik.handleChange}
            >
                <option value="" disabled hidden selected>Select product</option>
                <option value="0">Dark</option>
                <option value="1">Light</option>
            </select>
            {
                formik.errors.color && formik.touched.color &&
                <span className="required">{formik.errors.color}</span>
            }
            {
                error?.color &&
                <span className="required">{error.color}</span>
            }
        </p>
        
        <p>
            <label htmlFor="image">
                Slider Image <span></span>
            </label>
            <input 
                type="file" 
                name="image" 
                id="image" 
                accept={allowedExts}
                onChange={(event) => {
                    formik.setFieldValue('image', event.currentTarget.files[0]);
                }}
            />
            {
                formik.errors["image"] && formik.touched['image'] &&
                <span className="required">{formik.errors.image}</span>
            }
        </p>

        <Button 
            type={'submit'}
            className={'secondary-btn'}
            loading={loading}
        >
            Update Slider
        </Button>

        <div className={`required-msg ${error?.detail && 'failed'}`}>
            {error?.detail}
        </div>

        <div className={`success-msg ${success && 'success'}`}>
            Successfully added!
        </div>
    </form>
  )
}

export default SliderEditDash