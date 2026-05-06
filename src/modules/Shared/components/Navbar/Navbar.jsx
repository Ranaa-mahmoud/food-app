import { Link } from "react-router-dom";
import photoNav from "/src/assets/images/avatar.png";

export default function Navbar({ loginData }) {
  return (
    <div className="bg-light rounded-4 py-3 mx-5 my-4">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <form className="d-flex align-items-center rounded-4 px-2 py-1 bg-white w-75">
            <i className="fa fa-search mx-2"></i>
            <input
              className="form-control border-0"
              type="search"
              placeholder="Search Here"
            />
          </form>

          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={photoNav}
                alt="user"
                className="rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />

              <Link
                to="/profile"
                className="mx-2 text-decoration-none text-dark"
              >
                {loginData?.userName}
              </Link>

              <i
                className="fa fa-chevron-down mx-3"
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            <i
              className="fa fa-bell mx-3 fs-5"
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
      </nav>
    </div>
  );
}
