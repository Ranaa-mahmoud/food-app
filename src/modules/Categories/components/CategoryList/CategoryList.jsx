import { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../../../../api/modules/Categories";
import NoData from "../../../Shared/components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import photoModel from "/src/assets/images/delete-model.svg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
  const navigate = useNavigate();

  // ================= STATE (DATA) =================
  const [categoriesList, setCategoriesList] = useState([]);

  // ================= DELETE MODAL STATE =================
  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  // ================= ADD MODAL STATE =================
  const [showAdd, setShowAdd] = useState(false);

  // ================= FORM (react-hook-form) =================
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // ================= MODAL HANDLERS =================

  // فتح مودال الحذف
  const handleShow = (id) => {
    setCategoryId(id);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  // فتح/قفل إضافة كاتيجوري
  const handleAddShow = () => setShowAdd(true);
  const handleAddClose = () => setShowAdd(false);

  // ================= GET CATEGORIES =================
  const getCategory = async () => {
    try {
      const response = await getCategories();
      setCategoriesList(response?.data?.data || []);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  // ================= CREATE CATEGORY =================
  const onSubmit = async (data) => {
    try {
      await createCategory(data);
      handleAddClose();
      getCategory();
      toast.success("Category added successfully");
    } catch (error) {
      toast.error("Error adding category");
    }
  };

  // ================= DELETE CATEGORY =================
  const deleteCategoryHandler = async (id) => {
    try {
      await deleteCategory(id);

      setCategoriesList((prev) =>
        prev.filter((category) => category.id !== id)
      );

      toast.success("Deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <Header
        title="Categories"
        subtitle="List"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={photo}
      />

      {/* ================= DELETE MODAL ================= */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />

        <Modal.Body className="text-center">
          <img src={photoModel} alt="" className="m-3 img-fluid" />
          <h5>Delete This Category?</h5>
          <p className="text-muted">
            Are you sure you want to delete this item?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={async () => {
              await deleteCategoryHandler(categoryId);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ================= ADD MODAL ================= */}
      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <h4>Add Category</h4>
        </Modal.Header>

        <Modal.Body className="text-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name", { required: "Name is required" })}
              className="form-control my-3 p-3"
              placeholder="Category Name"
            />

            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}

            <Button variant="success" type="submit">
              Save
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* ================= PAGE HEADER ================= */}
      <div className="px-5 py-3 d-flex justify-content-between align-items-center">
        <div>
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>

        <button onClick={handleAddShow} className="btn btn-success">
          Add New Category
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="px-5 py-3">
        {categoriesList.length > 0 ? (
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Creation Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {categoriesList.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>

                  <td>
                    {/* EDIT */}
                    <i
                      className="fa fa-edit text-warning mx-2"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/dashboard/categories/edit/${category.id}`)
                      }
                    />

                    {/* DELETE */}
                    <i
                      className="fa fa-trash text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleShow(category.id)}
                    />
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