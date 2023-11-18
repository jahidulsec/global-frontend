import React from 'react'

const SuccessStatus = ({success}) => {
  return (
    <div className={`success-msg ${success && 'success'}`}>
        Successfully added!
    </div>
  )
}

export default SuccessStatus