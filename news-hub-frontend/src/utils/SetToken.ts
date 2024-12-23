import { getToken } from "../services/UserApiService"
import { apiClient } from "./ApiClient"


export function setAuthToken () {
    const token = getToken()
    console.log(token)
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        delete apiClient.defaults.headers.common['Authorization']
    }
}