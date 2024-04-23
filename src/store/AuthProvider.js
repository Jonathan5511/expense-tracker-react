import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props)=>{
    const initialToken=localStorage.getItem('token')
    const [token,setToken] = useState(initialToken)

    const isUserLoggedIn=!!token

    const onLoginHandler=(token)=>{
        setToken(token)
        localStorage.setItem('token',token)
        setTimeout(()=>{
            localStorage.removeItem('token')
        },5000)
    }

    const onLogoutHandler=()=>{

    }

    const AuthContent={
        token:token,
        isLoggedIn:isUserLoggedIn,
        login:onLoginHandler,
        logout:onLogoutHandler
    }

    return(<AuthContext.Provider value={AuthContent}>
        {props.children}
    </AuthContext.Provider>

    )
}

export default AuthProvider;;