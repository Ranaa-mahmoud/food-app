import { useNavigate } from "react-router-dom";
import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header-girl.png";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext);
  return (
    <>
      <Header
        title={`Welcomen ${loginData?.userName}`}
        description="This is a welcoming screen for the entry of the application, you can now see the options"
        imgUrl={photo}
      />
      <div className="container my-4 px-5 py-4">
        <div className="px-5 py-3 recipe-header rounded-3 d-flex justify-content-between align-items-center">
          <div>
            <h5>Fill the Recipes !</h5>
            <p className="my-3">
              you can now fill the meals easily using the table and form, click
              here and fill it with the table !
            </p>
          </div>

          <div>
            <button
              onClick={() => navigate("/dashboard/recipes")}
              className="btn btn-success"
            >
              fill recipes <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
