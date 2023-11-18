import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'

const ProfileInfo = () => {

    const {user} = useAuthContext()

    // const [user, setUser] = useState('')
    // const [token, setToken] = useState()



    // useEffect(() => {
    //    const userData = localStorage.getItem('user')

    //    if (userData && userData != 'undefined') {
    //         setToken(data => {
    //             return JSON.parse(localStorage.getItem('auth')).auth_token
    //         })
    //         setUser((data) => {
    //             return JSON.parse(userData)
    //         })
    //    } 

    // },[])



  return (
    <section className='profile-info box-shadow'>
        <h3>Account Info</h3>
        <form className="profile-info-content styled flexwrap">
            <p>
                <label>Username</label>
                <input type='text' value={user && user?.username} disabled/>
            </p>
            <p>
                <label>Full Name</label>
                <input type='text' value={user?.first_name + ' ' + user?.last_name} disabled/>
            </p>
            <p>
                <label>Email</label>
                <input type='email' value={user?.email} disabled/>
            </p>
            <p>
                <label>Phone</label>
                <input type='phone' value={user?.phone_number} disabled/>
            </p>
            <p>
                <label>Street Address</label>
                <input type='text' value={user?.street_address} disabled/>
            </p>
            <p>
                <label>District</label>
                <input type='text' value={user?.district} disabled/>
            </p>
            <p>
                <label>Division</label>
                <input type='text' value={user?.division} disabled/>
            </p>
            
        </form>
    </section>
  )
}

export default ProfileInfo