import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children,loginData}) {
  const DEV_MODE = true;
  if(DEV_MODE||localStorage.getItem('token')|| loginData)
    return children;
  else return <Navigate to='/login'/>
  
}
