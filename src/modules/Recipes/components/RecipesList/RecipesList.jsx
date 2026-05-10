import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import noData from "/src/assets/images/no-data.png";
import { useContext, useEffect, useState } from "react";
import NoData from "../../../Shared/components/NoData/NoData";
import { deleteRecipes, getRecipes } from "../../../../api/modules/Recipes";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import photoModel from "/src/assets/images/delete-model.svg";
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import { addFavoriteRecipe } from "../../../../api/modules/userRecipe";
import { getTags } from "../../../../api/modules/tags";
import { getCategories } from "../../../../api/modules/Categories";
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
  const { loginData } = useContext(AuthContext);
  const navigate = useNavigate();

  // ================= STATE =================
  const [nameValue, setNameValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [catValue, setCatValue] = useState("");

  const [recipesList, setRecipesList] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showDelete, setShowDelete] = useState(false);
  const [recipeId, setRecipeId] = useState(null);

  const [showView, setShowView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // ================= GET DATA =================
  const getList = async () => {
    try {
      const res = await getRecipes();
      setRecipesList(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTags = async () => {
    try {
      const res = await getTags();
      const data = res?.data?.data || res?.data || [];
      setTags(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setTags([]);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      const data = res?.data?.data || res?.data || [];
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setCategories([]);
    }
  };

  // ================= DELETE =================
  const deleteRecipe = async (id) => {
    try {
      await deleteRecipes(id);
      setRecipesList((prev) => prev.filter((r) => r.id !== id));
      toast.success("Deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FAVORITE =================
  const addToFavs = async (id) => {
    try {
      await addFavoriteRecipe({ recipeId: id });
      toast.success("Added to favorites successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add to favorites");
    }
  };

  // ================= MODALS =================
  const handleShowDelete = (id) => {
    setRecipeId(id);
    setShowDelete(true);
  };

  const handleShowView = (recipe) => {
    setSelectedRecipe(recipe);
    setShowView(true);
  };

  // ================= EFFECT =================
  useEffect(() => {
    getList();
    getAllTags();
    getAllCategories();
  }, []);

  // ================= FILTER =================
  const filteredRecipes = recipesList.filter((recipe) => {
    const matchName = recipe.name
      ?.toLowerCase()
      .includes(nameValue.toLowerCase());

    const matchTag = tagValue ? recipe.tag?.id == tagValue : true;

    const matchCat = catValue
      ? recipe.category?.[0]?.id == catValue
      : true;

    return matchName && matchTag && matchCat;
  });

  return (
    <>
      {/* HEADER */}
      <Header
        title="Recipes"
        subtitle={"Items"}
        description={"You can now add your items..."}
        imgUrl={photo}
      />

      {/* DELETE MODAL */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <img src={photoModel} alt="" className="m-3 img-fluid" />
          <h5>Delete this item?</h5>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteRecipe(recipeId);
              setShowDelete(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* VIEW MODAL */}
      <Modal show={showView} onHide={() => setShowView(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-center mb-3">
            <img
              src={
                selectedRecipe?.imagePath
                  ? `https://upskilling-egypt.com:3006/${selectedRecipe.imagePath}`
                  : noData
              }
              style={{ width: "400px", height: "200px", objectFit: "cover" }}
              alt=""
            />
          </div>

          <h4 className="text-center">{selectedRecipe?.name}</h4>
          <p className="text-center text-muted">
            {selectedRecipe?.description}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => addToFavs(selectedRecipe?.id)}
          >
            Add to Favorite
          </Button>
        </Modal.Footer>
      </Modal>

      {/* FILTERS */}
      <div className="row p-3 my-2 mx-0">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search..."
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
          >
            <option value="">Tag</option>
            {tags?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={catValue}
            onChange={(e) => setCatValue(e.target.value)}
          >
            <option value="">Category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="px-5 py-3">
        {filteredRecipes.length > 0 ? (
          <table className="table text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Category</th>
                <th>Tag</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecipes.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>

                  <td>
                    <img
                      src={
                        r.imagePath
                          ? `https://upskilling-egypt.com:3006/${r.imagePath}`
                          : noData
                      }
                      style={{ width: "80px", height: "50px" }}
                      alt=""
                    />
                  </td>

                  <td>{r.price}</td>
                  <td>{r.category?.[0]?.name}</td>
                  <td>{r.tag?.name}</td>

                  <td>
                 



                      {/* VIEW */}
  <i
    className="fa fa-eye text-success"
    style={{ cursor: "pointer" }}
    onClick={() => navigate(`/dashboard/recipes/view/${r.id}`)}
  />

  {/* EDIT */}
  {loginData?.userGroup !== "SystemUser" && (
    <i
      className="fa fa-edit text-warning mx-3"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/dashboard/recipes/edit/${r.id}`)}
    />
  )}

  {/* DELETE */}
  {loginData?.userGroup !== "SystemUser" && (
    <i
      className="fa fa-trash text-danger"
      style={{ cursor: "pointer" }}
      onClick={() => handleShowDelete(r.id)}
    />
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