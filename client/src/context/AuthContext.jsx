import { useState } from "react"
import { AuthContext } from "./useAuth"
import axiosInstance from "../utils/axiosInstance"
import { useEffect } from "react"

export const AuthProvider =({children})=>{
    const [user, setUser]=useState(null)
    const [loading, setLoading] =useState(false)
useEffect(()=>{
  const chechUser =async () => {
    
    try {
        const response = await axiosInstance.get('/api/users/me')
        setUser(response.data)
    } catch (error) {
        console.log(error || 'failed to fetch user info')
        throw new Error("failed to fetch user info",error.message);
        
    }
  };
  chechUser();
},[]);
    const register = async (fullName, email, password) => {
       
        try {
            const response =await axiosInstance.post('/api/users/register', {fullName,email,password});
            // console.log(response.data)
            setUser(response.data)
            
        } catch (error) {
            console.log(error.message || 'register failed')
            
        }
    }

    const login = async (email, password) => {
        
        try {
            const response =await axiosInstance.post('/api/users/login', {email,password});
           
            setUser(response.data)
        } catch (error) {
            console.log(error.message || 'login failed')
            
        }
    }
    const logout = async () => {
        try {
            await axiosInstance.post('/api/users/logout')
            setUser(null)
            
        } catch (error) {
            console.log(error.message ||'logout failed')
        }
    }
    const value={user, register,login, logout, loading}
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}