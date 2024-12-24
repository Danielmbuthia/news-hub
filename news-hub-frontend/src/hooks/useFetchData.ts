import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiClient } from '../utils/ApiClient';




const useFetchData = <T = []> (endpoint:string, queryKey:QueryKey, customConfig:Record<string, any> = {}, staleTime = 300_000):UseQueryResult<T> => {
    
    const fetchData = () => apiClient.get(endpoint, customConfig).then(res => res.data);
   return useQuery({
    queryKey,
    queryFn: fetchData,
    staleTime
   })
}

export default useFetchData;