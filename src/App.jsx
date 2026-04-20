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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "", element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-data", element: <RecipeData /> },
        { path: "categories", element: <CategoryList /> },
        { path: "user", element: <UsersList /> },
        { path: "favourites", element: <FavList /> },
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
