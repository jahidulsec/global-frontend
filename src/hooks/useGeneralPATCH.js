import { useState } from "react";


export const useGeneralPATCH = () => {
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


    const handleGeneralPATCH = async(name, id, body, token, formdata) => {
        try {

            const headerOpt = new Headers();
            if (!formdata) {
                headerOpt.append('Content-Type', `application/json`)
            }
            headerOpt.append('Authorization', `Token ${token}`)

            let bodyData;
            if (formdata) {
                bodyData = body
            } else {
                bodyData = JSON.stringify(body)
            }
            
            setLoading(true)
            await fetch(import.meta.env.VITE_API_URL + `/api/${import.meta.env.VITE_API_VERSION}/${name}/${id}`, {
                method: 'PATCH',
                headers: headerOpt,
                body: bodyData,
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

    return [loading, error, success, handleGeneralPATCH]
}