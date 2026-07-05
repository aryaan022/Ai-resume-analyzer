import {useContext} from "react";
import { AuthContex } from "../auth.context.jsx";
import {login,register,logout,getMe} from "../services/auth.api.js"


export const useAuth = () => {
    const context = useContext(AuthContex);
    const {user,setUser,loading,setLoading} = context;

    const handleLogin =async({email,password}) =>{
        setLoading(true);
        try{
            const data = await login({email,password});
            setUser(data.user);
        }catch(err){
            console.error("Login error:", err);
        }finally{
            setLoading(false);
        }
        
    }

    const handleRegister =async({username,email,password}) =>{
        setLoading(true);
        try{
            const data = await register({username,email,password});
            setUser(data.user);
        }catch(err){
            console.error("Register error:", err);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout =async() =>{
        setLoading(true);
        try{
            await logout();
            setUser(null);
        }catch(err){
            console.error("Logout error:", err);
        }finally{
            setLoading(false);
        }
        
    }

    return {user,loading,handleLogin,handleRegister,handleLogout};
}