import React, { useEffect, useState } from 'react'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import { MdContentPasteOff } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import Button from '../../../Utilities/Button'
import { useGeneralPOST } from '../../../hooks/useGeneralPOST'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import ButtonClose from '../../../Utilities/ButtonClose'
import ErrorStatus from '../../../Utilities/ErrorStatus'
import SuccessStatus from '../../../Utilities/SuccessStatus'
import DelStatus from '../../../Utilities/DelStatus'
import { useAuthContext } from '../../../context/AuthContext'

const SpecificationEditDash = () => {

    const {auth} = useAuthContext()

    const [response, handleProductSpecs] = useGeneralGet()
    const [product, handleProduct] = useGeneralGet()
    
    const { id } = useParams()
    
    const [val, setVal] = useState([])
    const [tableName, setTableName] = useState()
    const [tableData, setTableData] = useState({
        product_id: '',
        tables: [
            {
                table: '',
                fields: []
            }
        ]
    })


    //  custom hooks
    const [loading, error, success, handleSpecification] = useGeneralPOST()
    const [delStatus, handelDelTable] = useGeneralDEL()
    const [delStatusSingleSpec, handelDelSingleSpec] = useGeneralDEL()


    const handleAdd = () => {
        const add = [...val, []]
        setVal(add)
    }

    const handleChange = (e, idx) => {
        const inputData = [...val]
        inputData[idx] = {
            ...inputData[idx], 
            [e.target.name]: e.target.value
        }
        setVal(inputData)
    }

    const handleDelField = (idx) => {
        const delVal = [...val]
        delVal.splice(idx,1)
        setVal(item => {
            return delVal
        })
    }


    useEffect(() => {
        
        handleProductSpecs(`specification`,id)
        handleProduct(`product`,id)
        window.scrollTo(0,0)

    }, [delStatus, delStatusSingleSpec,success])


    useEffect(() => {
        setTableData({
            product_id: id,
            tables: [
                {
                    table_name: tableName,
                    fields: val,
                }
            ]
        })
    },[val])

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSpecification(`specification`, tableData, auth)
        setVal([])
    }



  return (
    <section className='column'>
        <div className="products one">
            <div className="flexwrap">
                <div className="row">
                    
                    <form className="add-form styled" onSubmit={handleSubmit}>
                        <div className='spec-form-header'>
                            <h2>Add Specification</h2>
                            <button
                                type='button'
                                className="secondary-btn"
                                onClick={() =>{handleAdd()}}
                            >
                                Add Field
                            </button>
                        </div>
                        

                        {/* ------TABLE----- */}
                        <div>
                            <p>
                                <label htmlFor="table_name">Table Name <span></span></label>
                                <input 
                                    type="text" 
                                    name='table_name' 
                                    id='table_name'
                                    onChange={e => setTableName(e.target.value)}
                                />
                            </p>

                            {
                                // add fields
                                val.map((data, idx) => (
                                    <div key={idx} className='table-form-field flexitem'>
                                        <p>
                                            <label htmlFor="field_name">Field name <span></span></label>
                                            <input 
                                                type="text" 
                                                name='field_name' 
                                                id='field_name'
                                                onChange={(e) => {handleChange(e,idx)}}
                                                />
                                        </p>
                                        <p>
                                            <label htmlFor="field_name">Field Description <span></span></label>
                                            <input 
                                                type="text" 
                                                name='field_description' 
                                                id='field_description'
                                                onChange={(e) => {handleChange(e,idx)}}
                                            />
                                        </p>
                                        <button className='btn-close' type='button' onClick={() => {handleDelField(idx)}}>
                                            <span className="ri-close-line"></span>
                                        </button>
                                    </div>
                                ))
                            }
                            
                        </div>
                        <Button 
                            type={'submit'}
                            className={'secondary-btn'}
                            loading={loading}
                        >
                            Add Spec Table
                        </Button>  

                        <ErrorStatus error={error} />
                        <SuccessStatus success={success} />
                            
                    </form>
                </div>
                <div className="row">
                    <div className="dash-header medium-text">
                        <h1>Specification Tables</h1>
                        <span>Product name: </span>
                        <span>{product?.title}</span>
                    </div>

                    <DelStatus delStatus={delStatus} />

                    {
                        response ?
                        response.map((item, i) => (
                            <table key={i} className='spec-table'>
                                <thead>
                                    <tr>
                                        <th>{item.table_name}</th>
                                        <th>
                                            <ButtonClose onClick={() => {handelDelTable(`spec-table`, item.id, auth)}} />
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    item.spec_table &&
                                    item.spec_table.map((field, index) => (
                                        <tbody key={index}>
                                            <tr>
                                                <td>{field.field_name}</td>
                                                <td>{field.field_description}</td>
                                                <ButtonClose onClick={() => {handelDelSingleSpec(`spec`, field.id, auth)}} />
                                            </tr>
                                        </tbody>
                                    ))


                                }

                            </table>

                        )) :
                                                    
                        <div className='no-item flexcenter'>
                            <MdContentPasteOff />
                            <p>No item to show!</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default SpecificationEditDash