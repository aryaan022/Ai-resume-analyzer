import {createContext,useState,useEffect} from 'react'
import {getMe} from "./services/auth.api"


export const AuthContex= createContext()

export const AuthProvider = ({children})=>{
    const [user,setUser]=useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{ //basically for reloading that user will not redirect to again logic if tokken will be there then onlythe user will stay on home page!
        const getAndSetUser=async()=>{
            try{
                const data = await getMe();
                setUser(data.user);
            }catch(err){

            }finally{
                setLoading(false);
            }
    
        } 
        getAndSetUser();
    },[])
    return (
        <AuthContex.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContex.Provider>
    )
}