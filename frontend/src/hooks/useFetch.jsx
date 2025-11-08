import { useEffect, useState } from "react"
import { fetchData } from "../api/apis";

const useFetch = (endpoint) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const response = await fetchData(endpoint);
            if(response.success) setData(response);
            setLoading(false)
        }

        getData()
    }, [endpoint])

    return { data, loading }
}

export default useFetch;