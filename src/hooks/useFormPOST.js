import { useState } from "react";


export const useFormPOST = () => {
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


    const handleFormPOST = async(name, body, token) => {
        try {
            setLoading(true)
            await fetch(import.meta.env.VITE_API_URL + `/api/${import.meta.env.VITE_API_VERSION}/${name}/`, {
                method: 'POST',
                headers: {
                    "Authorization": "Token "+ token,
                },
                body: body,
            }).then(response => {
                if (response.status !== 201) {
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

    return [loading, error, success, handleFormPOST]
}