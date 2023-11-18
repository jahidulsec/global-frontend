import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const Profile = () => {

    const {user, auth} = useAuthContext()
    const navigation = useNavigate()


    const handleLogout = async() => {
        try {
            await fetch(import.meta.env.VITE_API_URL + `/auth/${import.meta.env.VITE_API_VERSION}/token/logout/` , {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Token ' + auth
                }
            })
                .then(response => {
                    if (response.status !== 204) {
                        throw new Error()
                    }

                    localStorage.removeItem('glc_t')
                    navigation(`/`)
                    location.reload()
                })
        } catch (error) {
            localStorage.removeItem('glc_t')
            navigation(`/`)
            location.reload()
        }
    }

    
  return (
    <section className='profile-page'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump flexspace">
                    <ul className="flexitem">
                        <li>
                            <Link to={`/`}>
                                Home
                            </Link>
                        </li>
                        <li>Profile</li>
                    </ul>
                    <div className="profile__logout desktop-hide">
                        <button 
                            type='button' 
                            className='light-btn flexitem'
                            onClick={handleLogout}
                        >
                            <span>Sign out</span>
                            <span className="ri-logout-box-r-line"></span>
                        </button>
                    </div>
                </div>
                <div className="content-user flexcenter flexcol">
                    <article className="user-info flexcenter flexcol">
                        <img src="/avatar.png" alt="" />
                        <h2>{user && `${user?.first_name} ${user?.last_name}`}</h2>
                        <p>{user && `${user?.email}`}</p>
                    </article>

                    <div className='user-nav-cards flexcenter gap-1'>
                        <NavLink to={`/profile/info`} className="user-nav-card light-btn">
                           Profile 
                        </NavLink>
                        <NavLink to={`/profile/order`} className="user-nav-card light-btn">
                           Order
                        </NavLink>
                    </div>
                </div>
                <div className="content-body">
                    <Outlet />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Profile