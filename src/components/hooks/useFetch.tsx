import { useEffect, useState } from "react"

export const useFetch = (urlDatase: string) => {
    const [ dataFetch, setDataFetch ] = useState<null | object>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [error, setError] = useState<null | string>(null)



    useEffect(() => {
        // GET Request
        const fetchGet = async () => {
            try {
                setIsLoading(true)

                const request = await fetch(urlDatase)
                if(!request.ok) {
                    throw new Error(`Erro na requisição: ${request.status}`)
                }

                const response = await request.json()
                setDataFetch(response)
            } catch (err: any) {
                console.error(`ERROR: ${err}`)
            } finally {
                setIsLoading(false)
            }
        }
        fetchGet()
    }, [urlDatase])

 
        const fetchPost = async (bodyData: any) => {
            try {
                setIsLoading(true)
                setError(null)

                const request = await fetch(urlDatase, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bodyData)
                })

                if(!request.ok) {
                    throw new Error(`Erro na requisição: ${request.status}`)
                }

                const response = await request.json()

                setDataFetch(response)
            } catch (err: any) {
                console.error(`ERROR ON POST: ${err}`)
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }       


    return {dataFetch, isLoading, error, fetchPost};
}

