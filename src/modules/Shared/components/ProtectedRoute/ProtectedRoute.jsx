import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children,loginData}) {
const devMode=true;
  if(devMode||localStorage.getItem('token')|| loginData)
    return children;
  else return <Navigate to='/login'/>
  
}
