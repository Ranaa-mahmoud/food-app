import SideBar from "../../../Sidebar/Sidebar";
import Navbar from "../../../Navbar/Navbar";
import Header from "../../../Header/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ChangePass from './../../../../../Authentication/components/ChangePass/ChangePass';

export default function MasterLayout({ loginData, setLoginData }) {
  const [showChangePass, setShowChangePass] = useState(false);
const handleOpenChangePass = () => {
  setShowChangePass(true);
};
  return (
    <div className="d-flex">
      <div className="  vh-100">
        <SideBar setLoginData={setLoginData}
        onOpenChangePass={handleOpenChangePass} />
      </div>
      <div className="w-100">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
        {/* Modal */}
      <ChangePass
        show={showChangePass}
        handleClose={() => setShowChangePass(false)}
      />
    </div>
  );
}
