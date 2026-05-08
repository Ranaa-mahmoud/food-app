import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import photo from "/src/assets/images/3.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function SideBar({ onOpenChangePass }) {
  const { loginData } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ⬅️ حماية من undefined + تبسيط الشرط
  const userGroup = loginData?.userGroup;
  const isSystemUser = userGroup === "SystemUser";

  // ⬅️ منع render قبل تحميل البيانات (يمنع ظهور خاطئ)
  if (!loginData) return null;

  return (
    <div className="ps-sidebar">
      <Sidebar collapsed={isCollapsed}>

        {/* Logo / toggle */}
        <div onClick={toggleCollapse} className="my-4 text-center">
          <img className="img-fluid" src={photo} alt="logo" />
        </div>

        <Menu>

          {/* Home */}
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>

          {/* Users (only non system users) */}
          {!isSystemUser && (
            <MenuItem
              icon={<i className="fa-solid fa-user"></i>}
              component={<Link to="/dashboard/user" />}
            >
              Users
            </MenuItem>
          )}

          {/* Recipes (all users) */}
          <MenuItem
            icon={<i className="fa-solid fa-utensils"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>

          {/* Categories (only non system users) */}
          {!isSystemUser && (
            <MenuItem
              icon={<i className="fa-solid fa-list"></i>}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
          )}

          {/* Favourites (only system users) */}
          {isSystemUser && (
            <MenuItem
              icon={<i className="fa-solid fa-heart"></i>}
              component={<Link to="/dashboard/favourites" />}
            >
              Favourites
            </MenuItem>
          )}

          {/* Change password */}
          <MenuItem
            icon={<i className="fa-solid fa-lock"></i>}
            onClick={onOpenChangePass}
          >
            Change Password
          </MenuItem>

          {/* Logout */}
          <MenuItem
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            onClick={logOut}
          >
            Logout
          </MenuItem>

        </Menu>
      </Sidebar>
    </div>
  );
}