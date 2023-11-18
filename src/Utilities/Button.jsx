import React from 'react'

const Button = ({children, className, type, disable, loading}) => {
  return (
    <>
      <button
        className={className}
        type={type}
        disabled={disable}
        >
          {
            loading ? <span className='loading'>Loading</span> :
            children
          }
      </button>
    </>
  )
}

export default Button