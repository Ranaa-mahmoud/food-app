import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import { useEffect, useState } from "react";
import NoData from "../../../Shared/components/NoData/NoData";
import axiosClient from "../../../../api/axiosClient";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");

  // GET
  const getCategories = async () => {
    try {
      const response = await axiosClient.get(
        "/Category/?pageSize=10&pageNumber=1"
      );
      setCategories(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteCategory = async (id) => {
    try {
      await axiosClient.delete(`/Category/${id}`);

      setCategories((prev) =>
        prev.filter((cat) => cat.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE
  const updateCategory = async (id, data) => {
    try {
      await axiosClient.put(`/Category/${id}`, data);

      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Header
        title={
          <>
            Categories <span className="text-light fw-light">Item</span>
          </>
        }
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={photo}
      />

      <div className="p-4">
        {categories.length > 0 ? (
          <table className="table table-striped table-hover align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Creation Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>

                  <td>
                    {editId === category.id ? (
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      category.name
                    )}
                  </td>

                  <td>{category.creationDate}</td>

                  <td>
                    {editId === category.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm mx-1"
                          onClick={() => {
                            updateCategory(editId, { name });
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
                          setEditId(category.id);
                          setName(category.name);
                        }}
                        className="fa fa-edit text-warning mx-2"
                        style={{ cursor: "pointer" }}
                      ></i>
                    )}

                    <i
                      onClick={() => deleteCategory(category.id)}
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