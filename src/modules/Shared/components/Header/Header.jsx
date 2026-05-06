import { useNavigate } from "react-router-dom";

export default function Header({ title, description, imgUrl }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="py-3 px-5  m-3   text-white  rounded rounded-4 header-bg">
        <div className=" container-fluid">
          <div className="row">
            <div className="col-md-8 d-flex align-items-center ">
              <div>
                <h1>{title}</h1>
                <p className="py-2 text-muted">{description}</p>
              </div>
            </div>
            <div className="col-md-4 text-end ">
              <img className=" w-75" src={imgUrl} alt="header-photo" />
            </div>
          </div>
        </div>
      </div>
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
