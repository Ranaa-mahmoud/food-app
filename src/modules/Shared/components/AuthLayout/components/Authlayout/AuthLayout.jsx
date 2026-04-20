import { Outlet } from "react-router-dom";
import logo from "/src/assets/images/Logo.png";

export default function AuthLayout() {
  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay ">
        <div className="container">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-12 col-sm-11 col-md-8 col-lg-6 col-xl-5 py-4 px-4 bg-white rounded-3 shadow ">
              <div className="logo-container text-center my-4">
                <img className="w-75" src={logo} alt="Logo" />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
