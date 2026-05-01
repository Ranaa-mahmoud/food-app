import SideBar from "../../../Sidebar/Sidebar";
import Navbar from "../../../Navbar/Navbar";
import Header from "../../../Header/Header";
import { Outlet } from "react-router-dom";

export default function MasterLayout({ loginData, setLoginData }) {
  return (
    <div className="d-flex">
      <div className="  vh-100">
        <SideBar setLoginData={setLoginData} />
      </div>
      <div className="w-100">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}
