import { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import {
  createCategory,
  getCategories,
} from "../../../../api/modules/Categories";
import NoData from "../../../Shared/components/NoData/NoData";
import { deleteCategory } from "./../../../../api/modules/Categories";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import photoModel from "/src/assets/images/delete-model.svg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState([]);
  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCategoryId(id);
    setShow(true);
  };
  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await createCategory(data);
      handleAddClose();
      getCategory();
      toast.success("success add item");
      console.log(response);
    } catch (error) {
      toast.error(error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await getCategories();
      setCategoriesList(response?.data?.data);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  const DeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategoriesList((prev) =>
        prev.filter((category) => category.id !== id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center ">
          <img src={photoModel} alt="photoModel" className="m-3 img-fluid" />
          <h5 className="my-2 out">Delete This Category ?</h5>
          <p className=" text-muted">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=" btn-outline-danger "
            onClick={async () => {
              await DeleteCategory(categoryId);
              handleClose();
            }}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <h4 className=" fw-bolder">Add Category</h4>
        </Modal.Header>
        <Modal.Body className="text-center ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" input-group my-2">
              <input
                {...register("name", { required: "name is required" })}
                className=" form-control w-75 m-5 py-3 px-4"
                type="text"
                placeholder="Category Name"
              />
            </div>
            {errors.name && (
              <p className=" text-danger">{errors.name.message}</p>
            )}
            <Button variant=" btn btn-success ">save</Button>
          </form>
        </Modal.Body>
      </Modal>
      <div className=" px-5 py-3   d-flex justify-content-between justify-content-center align-items-center">
        <div>
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button onClick={handleAddShow} className="btn btn-success">
          Add New Category
        </button>
      </div>
      <div className="px-5 py-3 ">
        {categoriesList.length > 0 ? (
          <table className="table table-striped table-responsive text-center  ">
            <thead className="table-light  fs-5">
              <tr style={{ height: "50px" }}>
                <th className="py-4 px-3" scope="col">
                  #
                </th>
                <th className="py-4 px-3" scope="col">
                  Name
                </th>
                <th className="py-4 px-3" scope="col">
                  Creation date
                </th>
                <th className="py-4 px-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category) => (
                <tr key={category.id} style={{ height: "65px" }}>
                  <th scope="row" className="py-3 px-3">
                    {category.id}
                  </th>

                  <td className="py-3 px-3">{category.name}</td>

                  <td className="py-3 px-3">{category.creationDate}</td>

                  <td className="py-3 px-3">
                    <i
                      onClick={() =>
                        navigate(`/dashboard/categories/edit/${category.id}`)
                      }
                      className="fa fa-edit text-warning mx-2"
                      style={{ cursor: "pointer", fontSize: "18px" }}
                    ></i>

                    <i
                      onClick={() => handleShow(category.id)}
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
