import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

 export let AuthContext=createContext(null);
 export default function AuthContextProvider(props){
    console.log(props)
    const [loginData, setLoginData] = useState(null);
      const saveLoginData = () => {
        let endecodedToken = localStorage.getItem("token");
        let decodedToken = jwtDecode(endecodedToken);
        setLoginData(decodedToken);
      };
      useEffect(() => {
        if (localStorage.getItem("token")) 
            saveLoginData();
      }, []);
      return(
        <AuthContext.Provider value={{loginData,saveLoginData}}>
        {props.children}
      </AuthContext.Provider>
      ) 

 }
















