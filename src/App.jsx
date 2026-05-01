import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./modules/Shared/components/AuthLayout/components/Authlayout/AuthLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import VerifyAccount from "./modules/Authentication/components/VerifyAccount/VerifyAccount";
import MasterLayout from "./modules/Shared/components/MasterLayout/Components/MasterLayout/MasterLayout";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList";
import RecipeData from "./modules/Recipes/components/RecipeData/RecipeData";
import CategoryList from "./modules/Categories/components/CategoryList/CategoryList";
import CategoryData from "./modules/Categories/components/CategoryData/CategoryData";
import UsersList from "./modules/Users/components/UsersList/UsersList";
import FavList from "./modules/Favourites/components/FavList/FavList";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import ChangePass from "./modules/Authentication/components/ChangePass/ChangePass";

function App() {
  const [loginData,setLoginData]=useState(null);
  const saveLoginData=()=>{
    let endecodedToken=localStorage.getItem("token")
    let decodedToken=jwtDecode(endecodedToken)
    setLoginData(decodedToken)
  }
  useEffect(()=>{
   if(localStorage.getItem('token'))
    saveLoginData()
  },[])
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
      ],
    },
    {
      path: "dashboard",
      element: <ProtectedRoute loginData={loginData} ><MasterLayout loginData={loginData} setLoginData={setLoginData} /></ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard loginData={loginData} /> },
        { path: "", element: <Dashboard loginData={loginData}/> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-data", element: <RecipeData /> },
        { path: "categories", element: <CategoryList /> },
        { path: "user", element: <UsersList /> },
        { path: "favourites", element: <FavList /> },
                { path: "Change-Pass", element: <ChangePass /> },

      ],
    },
  ]);
  return (
<>
    <RouterProvider router={router}></RouterProvider>  
          <ToastContainer />
</>


);
}

export default App;
