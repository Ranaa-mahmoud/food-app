import { useNavigate } from "react-router-dom";

export default function FillRecipe() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid px-5 py-4 mt-4 rounded rounded-2 shadow-sm">
      <div className="row align-items-center justify-content-between p-5 rounded-4 shadow-sm bg-success-subtle">
        <div className="col-md-8 mb-3 mb-md-0">
          <h2 className="fw-bold mb-3">
            Fill The
            {""}
            <span className="text-success">Recipes</span>
          </h2>

          <p className="text-muted fs-6 mb-0 lh-lg">
            You can now manage and fill meals easily using the table and form
            section.
            <br />
            Click below to explore all recipes.
          </p>
        </div>

        <div className="col-md-4 text-md-end text-start">
          <button
            className="btn btn-success py-3 fw-semibold rounded-3 "
            onClick={() => navigate("/dashboard/recipes")}
          >
            All Recipes{" "}
            <i className="fa-solid fa-arrow-right text-center ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
