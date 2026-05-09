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
    setIsCollapsed((prev) => !prev);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const userGroup = loginData?.userGroup;
  const isSystemUser = userGroup === "SystemUser";

  if (!loginData) return null;

  return (
    <div className=" ps-sidebar ">
      <Sidebar collapsed={isCollapsed}>
        <div onClick={toggleCollapse} className="my-4 text-center">
          <img className="img-fluid" src={photo} alt="logo" />
        </div>

        <Menu>
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>

          {!isSystemUser && (
            <MenuItem
              icon={<i className="fa-solid fa-user"></i>}
              component={<Link to="/dashboard/user" />}
            >
              Users
            </MenuItem>
          )}

          <MenuItem
            icon={<i className="fa-solid fa-utensils"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>

          {!isSystemUser && (
            <MenuItem
              icon={<i className="fa-solid fa-list"></i>}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
          )}

          {isSystemUser && (
            <MenuItem
              icon={<i className="fa-solid fa-heart"></i>}
              component={<Link to="/dashboard/favourites" />}
            >
              Favourites
            </MenuItem>
          )}

          <MenuItem
            icon={<i className="fa-solid fa-lock"></i>}
            onClick={onOpenChangePass}
          >
            Change Password
          </MenuItem>

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
