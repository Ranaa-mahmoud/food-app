import SideBar from "../../../Sidebar/Sidebar";
import Navbar from "../../../Navbar/Navbar";
import Header from "../../../Header/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ChangePass from "./../../../../../Authentication/components/ChangePass/ChangePass";

export default function MasterLayout() {
  const [showChangePass, setShowChangePass] = useState(false);

  const handleOpenChangePass = () => {
    setShowChangePass(true);
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">

      {/* Sidebar */}
      <div >
        <SideBar onOpenChangePass={handleOpenChangePass} />
      </div>

      {/* Main Content */}
      <div className="w-100 overflow-auto">

        <Navbar />

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