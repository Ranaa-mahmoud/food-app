import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import { useEffect, useState } from "react";
import NoData from "../../../Shared/components/NoData/NoData";
import axiosClient from "../../../../api/axiosClient";

export default function RecipesList() {
  const [listRecipes, setListRecipes] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tagId: ""
  });

  // GET
  const getRecipes = async () => {
    const response = await axiosClient.get(
      "/Recipe/?pageSize=10&pageNumber=1"
    );
    setListRecipes(response.data?.data);
  };

  // DELETE
  const deleteRecipes = async (id) => {
    await axiosClient.delete(`/Recipe/${id}`);

    setListRecipes((prev) =>
      prev.filter((recipe) => recipe.id !== id)
    );
  };

  // UPDATE
  const updateRecipes = async (id, data) => {
    await axiosClient.put(`/Recipe/${id}`, data);

    getRecipes();
  };

  useEffect(() => {
    getRecipes();
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

      <div className="d-flex justify-content-between px-4 py-3">
        <div>
          <h4>Recipe Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button className="btn btn-success">Add New Item</button>
      </div>

      <div className="p-4">

        {listRecipes.length > 0 ? (

          <table className="table table-striped table-hover align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Tag</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {listRecipes.map((recipe) => (
                <tr key={recipe.id}>

                  {/* ID */}
                  <td>{recipe.id}</td>

                  {/* Image */}
                  <td>
                    <img
                      src={recipe.imgpath}
                      alt={recipe.name}
                      width="60"
                      height="60"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </td>

                  {/* Name */}
                  <td>
                    {editId === recipe.id ? (
                      <input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value
                          })
                        }
                      />
                    ) : (
                      recipe.name
                    )}
                  </td>

                  {/* Description */}
                  <td>
                    {editId === recipe.id ? (
                      <input
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value
                          })
                        }
                      />
                    ) : (
                      recipe.description
                    )}
                  </td>

                  {/* Price */}
                  <td>
                    {editId === recipe.id ? (
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: e.target.value
                          })
                        }
                      />
                    ) : (
                      recipe.price
                    )}
                  </td>

                  {/* Category */}
                  <td>
                    {recipe.category?.length > 0
                      ? recipe.category[0].name
                      : "No Category"}
                  </td>

                  {/* Tag */}
                  <td>
                    {recipe.tag?.name || "No Tag"}
                  </td>

                  {/* Actions */}
                  <td>
                    {editId === recipe.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm mx-1"
                          onClick={() => {
                            updateRecipes(editId, formData);
                            setEditId(null);
                          }}
                        >
                          Save
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <i
                        onClick={() => {
                          setEditId(recipe.id);
                          setFormData({
                            name: recipe.name,
                            description: recipe.description,
                            price: recipe.price,
                          });
                        }}
                        className="fa fa-edit text-warning mx-2"
                        style={{ cursor: "pointer" }}
                      ></i>
                    )}

                    <i
                      onClick={() => deleteRecipes(recipe.id)}
                      className="fa fa-trash text-danger"
                      style={{ cursor: "pointer" }}
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