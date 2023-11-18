import React, { useState } from 'react'

const PasswordField = ({value, onChange, onBlur, name, id}) => {

    const [showPassword, setShowPassword] = useState(false)

  return (
    <span className='password-field'>
        <input 
            type={!showPassword? "password": "text"} 
            name={name} 
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
        <span 
            className={!showPassword ? "ri-eye-line" : "ri-eye-off-line"} 
            onClick={() => {setShowPassword(!showPassword)}}
        ></span>
    </span>
  )
}

export default PasswordField