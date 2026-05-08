import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import noData from "/src/assets/images/no-data.png";
import { useContext, useEffect, useState } from "react";
import NoData from "../../../Shared/components/NoData/NoData";
import { deleteRecipes, getRecipes } from "../../../../api/modules/Recipes";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import photoModel from "/src/assets/images/delete-model.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import { addFavoriteRecipe } from "../../../../api/modules/userRecipe";

export default function RecipesList() {
  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext);

  const [recipesList, setRecipesList] = useState([]);

  // delete modal
  const [showDelete, setShowDelete] = useState(false);
  const [recipeId, setRecipeId] = useState(null);

  // view modal
  const [showView, setShowView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleShowDelete = (id) => {
    setRecipeId(id);
    setShowDelete(true);
  };

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowView = (recipe) => {
    setSelectedRecipe(recipe);
    setShowView(true);
  };

  const handleCloseView = () => setShowView(false);

  const addToFavs = async (id) => {
    try {
      await addFavoriteRecipe({ recipeId: id });
      toast.success("Added to favorites successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add to favorites");
    }
  };

  const getList = async () => {
    try {
      const response = await getRecipes();
      setRecipesList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await deleteRecipes(id);
      setRecipesList((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={photo}
      />

      {/* DELETE MODAL */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center ">
          <img src={photoModel} alt="photoModel" className="m-3 img-fluid" />
          <h5 className="my-2 ">Delete This Category ?</h5>
          <p className="text-muted">
            are you sure you want to delete this item ? if you are sure just click on delete it
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="btn-outline-danger"
            onClick={async () => {
              await deleteRecipe(recipeId);
              handleCloseDelete();
            }}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* VIEW MODAL */}
      <Modal show={showView} onHide={handleCloseView} centered>
        <Modal.Header closeButton >
          <Modal.Title className="text-success fw-bold rounded-3">Recipe Details</Modal.Title>
        </Modal.Header>

        <Modal.Body >

          <div className="text-center mb-3">
            <img
              src={
                selectedRecipe?.imagePath
                  ? `https://upskilling-egypt.com:3006/${selectedRecipe.imagePath}`
                  : noData
              }
              alt="recipe"
              style={{
                width: "400px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>

          <h4 className="text-center mb-2 fw-bold">{selectedRecipe?.name}</h4>

          <p className="text-muted text-center">
            {selectedRecipe?.description}
          </p>

          <div className="p-3 rounded text-white" style={{ background: "#106207" }}>
            <div className="d-flex justify-content-between mb-2">
              <strong>Price:</strong>
              <span>{selectedRecipe?.price}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <strong>Category:</strong>
              <span>{selectedRecipe?.category?.[0]?.name}</span>
            </div>

            <div className="d-flex justify-content-between">
              <strong>Tag:</strong>
              <span>{selectedRecipe?.tag?.name}</span>
            </div>
          </div>

        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">

          <Button variant=" btn btn-outline-success"
            onClick={() => addToFavs(selectedRecipe?.id)}
          >
            <i className="fa fa-heart me-2 text-danger"></i>
            Add to Favorite
          </Button>

        
        </Modal.Footer>
      </Modal>

      {/* TABLE (UNCHANGED EXACTLY) */}
      <div className="px-5 py-3 ">
        {recipesList.length > 0 ? (
          <table className="table table-striped table-responsive text-center">
            <thead className="table-light  fs-5">
              <tr style={{ height: "50px" }}>
                <th className="py-4 px-3" scope="col">#</th>
                <th className="py-4 px-3" scope="col">Name</th>
                <th className="py-4 px-3" scope="col">Image</th>
                <th className="py-4 px-3" scope="col">Price</th>
                <th className="py-4 px-3" scope="col">Description</th>
                <th className="py-4 px-3" scope="col">Category</th>
                <th className="py-4 px-3" scope="col">Tag</th>
                <th className="py-4 px-3" scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {recipesList.map((recipe) => (
                <tr key={recipe.id} style={{ height: "65px" }}>
                  <th className="py-3 px-3">{recipe.id}</th>

                  <td className="py-3 px-3">{recipe.name}</td>

                  <td>
                    <img
                      src={
                        recipe.imagePath
                          ? `https://upskilling-egypt.com:3006/${recipe.imagePath}`
                          : noData
                      }
                      style={{
                        width: "100%",
                        maxWidth: "100px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      alt="img recipe"
                    />
                  </td>

                  <td className="py-3 px-3">{recipe.price}</td>
                  <td className="py-3 px-3">{recipe.description}</td>
                  <td className="py-3 px-3">{recipe.category[0]?.name}</td>
                  <td className="py-3 px-3">{recipe.tag?.name}</td>

                  <td className="py-3 px-3">

                    {loginData?.userGroup === "SystemUser" ? (
                      <i
                        className="fa fa-eye text-success mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleShowView(recipe)}
                      ></i>
                    ) : (
                      <>
                        <i
                          className="fa fa-edit text-warning mx-2"
                          style={{ cursor: "pointer" }}
                        ></i>

                        <i
                          className="fa fa-trash text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleShowDelete(recipe.id)}
                        ></i>
                      </>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}