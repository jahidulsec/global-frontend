import { useState } from "react"



export const useGeneralDEL = () => {

    const [delStatus, setDelStatus] = useState(false)

    const handleDelStatus = () => {
        setTimeout(() => {
            setDelStatus(false)
        }, 5000);
    }


    const handleDel = async(name, id, token) => {
        try {
            await fetch(import.meta.env.VITE_API_URL + `/api/${import.meta.env.VITE_API_VERSION}/${name}/` + id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + token, 
                }
            })
            .then(response => {
                if (response.status !== 204) {
                    console.log(response.json().then(data => {return data}))
                    throw new Error('Something went wrong!')
                }
                setDelStatus(!delStatus)
                handleDelStatus()
            })
            
        } catch (error) {
            console.log(error)
        }  
    }

    return [delStatus, handleDel]
    

}