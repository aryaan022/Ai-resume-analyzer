import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import Spinner from '../../../components/Spinner.jsx'

const Protected = ({children}) => {
    const{loading ,user}=useAuth();
    if(loading){
        return <Spinner />
    }
    if(!user){
        return <Navigate to={"/login"}></Navigate>
    }
    return children;
}

export default Protected