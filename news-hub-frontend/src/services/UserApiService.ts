import { apiClient } from "../utils/ApiClient";
const tokenName = "token"

interface signUpPros {
    first_name: string;
    last_name: string;
    email: string;
    password: string; 
    password_confirmation: string; 
}
interface loginProps {
    email: string;
    password: string;
}


export const signUpAPIService = async (data: signUpPros) => {
    const {data:userData} =  await apiClient.post("/register", data);
    localStorage.setItem(tokenName, userData?.data?.token);
    
};  

export const loginAPIService = async (data: loginProps) => {
    const {data: userData} =  await apiClient.post("/login", data);
    localStorage.setItem(tokenName, userData?.data?.token);
};

export const getToken = () => {
   return localStorage.getItem(tokenName)
}

export async function logout() {
    await apiClient.post('logout')
    localStorage.removeItem(tokenName);
}