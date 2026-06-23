import { useEffect, useState } from "react"

export const useFetch = (urlDatase: string) => {
    

    const [ dataFetch, setDataFetch ] = useState<null | object>(null)
    const [ method, setMethod ] = useState<null | string>(null)
    const [ settings, setSettings ] = useState<null | object>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    console.log(method, setMethod, urlDatase)

    
    const httpsSettings = () => {
        if(method === "POST") return;
        setSettings({
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dataFetch)
        })
        setIsLoading(false)
    }
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)

                const request = await fetch(urlDatase)
                if(!request.ok) {
                    throw new Error(`Erro na requisição: ${request.status}`)
                }

                const response = await request.json()
                setDataFetch(response)
            } catch (error) {
                console.error(`ERROR: ${error}`)
            } finally {
                setIsLoading(true)
                setMethod(null)
                setSettings(null)
            }
        }

        fetchData()
    }, [urlDatase, httpsSettings])



    return { method, settings, httpsSettings, isLoading};
}

