import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(undefined)

const getCartLocalData = () => {
    let localAuthData = localStorage.getItem('glc_t')
    if (localAuthData != undefined) {
        return ``
    } else {
        return JSON.parse(localAuthData)
    }
}


export const AuthProvider = ({children}) => {

    

    const [auth, setAuth] = useState('')    
    const [user, setUser] = useState('') 
    const {pathname} = useLocation()   
    


    const fetchUserData = async() => {
        if (auth) {
            await fetch(import.meta.env.VITE_API_URL+"/auth/v1/users/me/", {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + auth, 
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data)
                }).catch(error => console.log(error))
        }
    }



    useEffect(() => {
        fetchUserData()
    }, [auth, pathname])

    return (
        <AuthContext.Provider
            value={{
                auth,
                user,
                onAuth: (token) => {setAuth(token)}
            }}
        >
            {children}
        </AuthContext.Provider>
    )
   
}

export const useAuthContext = () => useContext(AuthContext)