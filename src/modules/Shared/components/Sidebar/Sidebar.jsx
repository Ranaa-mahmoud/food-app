import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import photo from "/src/assets/images/3.png";
import { useState } from "react";

export default function SideBar({ setLoginData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    navigate("/login");
  };
  return (
    <div className="  ps-sidebar vh-100">
      <Sidebar collapsed={isCollapsed}>
        <div onClick={() => toggleCollapse()} className="my-4 text-center ">
          <img className=" img-fluid" src={photo} alt="" />
        </div>
        <Menu>
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-user"></i>}
            component={<Link to="/dashboard/user" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-utensils"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-list"></i>}
            component={<Link to="/dashboard/categories" />}
          >
            Categories
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-heart"></i>}
            component={<Link to="/dashboard/favourites" />}
          >
            favourites
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-lock"></i>}
            component={<Link to="/dashboard/Change-Pass" />}
          >
            change password
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
