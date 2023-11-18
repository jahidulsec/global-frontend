import { useState } from "react";


export const useGeneralPUT = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const [success, setSuccess] = useState(false)
    


    const handleSuccess = () => {
        setTimeout(() => {
            setSuccess(false)
        }, 2000);
    }

    const handleFailed = () => {
        setTimeout(() => {
            setError(false)
        }, 5000);
    }


    const handleGeneralPUT = async(name, id, body, token) => {
        try {
            setLoading(true)
            await fetch(import.meta.env.VITE_API_URL + `/api/${import.meta.env.VITE_API_VERSION}/${name}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+ token,
                },
                body: JSON.stringify(body),
            }).then(response => {
                if (response.status !== 200) {
                    response.json()
                        .then(data => {
                            setError(item => {
                                console.log(data)
                                return data
                            })
                        })
                    handleFailed()

                } else {
                    handleSuccess()
                    setSuccess(true)
                }
            }).then(data => console.log(data))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return [loading, error, success, handleGeneralPUT]
}