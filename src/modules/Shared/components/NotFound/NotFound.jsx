import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import photo from "../../../../assets/images/not-found-bg.png";
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row w-100 align-items-center">
        <div className="col-12 mb-4 text-center text-md-start">
          <img src={logo} alt="logo" style={{ maxWidth: "300px" }} />
        </div>

        <div className="col-md-6 text-center text-md-start">
          <h1 className="fw-bold display-4">Oops.</h1>
          <h2 className="text-success">Page not found</h2>
          <p className="text-muted">
            This page doesn’t exist or was removed. We suggest you go back to
            home.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-success px-4 py-2 mt-3"
          >
            ← Back To Dashboard
          </button>
        </div>

        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img
            src={photo}
            alt="404"
            className="img-fluid"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  );
}
