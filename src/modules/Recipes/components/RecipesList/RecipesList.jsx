import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import noData from "/src/assets/images/no-data.png";
import { useEffect, useState } from "react";
import NoData from "../../../Shared/components/NoData/NoData";
import { deleteRecipes, getRecipes } from "../../../../api/modules/Recipes";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import photoModel from "/src/assets/images/delete-model.svg";
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
  const navigate = useNavigate()
  const [recipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRecipeId(id);
    setShow(true);
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
      setRecipesList((prev) => prev.filter((recipe) => recipe.id !== id));
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center ">
          <img src={photoModel} alt="photoModel" className="m-3 img-fluid" />
          <h5 className="my-2 ">Delete This Category ?</h5>
          <p className=" text-muted">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=" btn-outline-danger "
            onClick={async () => {
              await deleteRecipe(recipeId);
              handleClose();
            }}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="px-5 py-3 d-flex justify-content-between justify-content-center align-items-center">
        <div>
          <h4>Recipe Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button
          className="btn btn-success"
          onClick={() => navigate("/dashboard/recipe-data")}
        >
          Add New Item
        </button>
      </div>
      <div className="px-5 py-3 ">
        {recipesList.length > 0 ? (
          <table className="table table-striped table-responsive text-center">
            <thead className="table-light  fs-5">
              <tr style={{ height: "50px" }}>
                <th className="py-4 px-3" scope="col">
                  #
                </th>
                <th className="py-4 px-3" scope="col">
                  Name
                </th>
                <th className="py-4 px-3" scope="col">
                  Image
                </th>
                <th className="py-4 px-3" scope="col">
                  Price
                </th>
                <th className="py-4 px-3" scope="col">
                  Description
                </th>
                <th className="py-4 px-3" scope="col">
                  Category
                </th>
                <th className="py-4 px-3" scope="col">
                  Tag
                </th>
                <th className="py-4 px-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe) => (
                <tr key={recipe.id} style={{ height: "65px" }}>
                  <th scope="row" className="py-3 px-3">
                    {recipe.id}
                  </th>

                  <td className="py-3 px-3">{recipe.name}</td>

                  <td>
                    {recipe.imagePath ? (
                      <img
                        className="table-img"
                        src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                        alt={recipe.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectfit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={noData}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectfit: "cover",
                        }}
                      />
                    )}
                  </td>
                  <td className="py-3 px-3">{recipe.price}</td>
                  <td className="py-3 px-3">{recipe.description}</td>
                  <td className="py-3 px-3">{recipe.category[0]?.name}</td>
                  <td className="py-3 px-3">{recipe.tag?.name}</td>
                  <td className="py-3 px-3">
                    <i
                     
                                onClick={() => navigate("/dashboard/recipe-data")}

                      className="fa fa-edit text-warning mx-2"
                      style={{ cursor: "pointer", fontSize: "18px" }}
                    ></i>
                    <i
                      onClick={() => handleShow(recipe.id)}
                      //  onClick={() => deleteRecipe(recipe.id)}
                      className="fa fa-trash text-danger"
                      style={{ cursor: "pointer", fontSize: "18px" }}
                    ></i>
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
