import { toast } from "react-toastify";
import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header-girl.png";
import { useEffect, useState } from "react";
import {
  deleteFavoriteRecipe,
  getFavoriteRecipes,
} from "../../../../api/modules/userRecipe";

import NoData from "../../../Shared/components/NoData/NoData";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import photoModel from "/src/assets/images/delete-model.svg";

export default function FavList() {
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const getList = async () => {
    try {
      setLoading(true);

      const response = await getFavoriteRecipes();

      setFavList(response?.data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  const deleteFav = async () => {
    try {
      await deleteFavoriteRecipe(selectedId);

      setFavList((prev) =>
        prev.filter((item) => item.id !== selectedId)
      );

      toast.success("Deleted successfully");

      handleClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <Header
        title="Favorite Items"
        description="Your saved recipes list"
        imgUrl={photo}
      />

      {/* DELETE MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body className="text-center">
          <img
            src={photoModel}
            alt="photoModel"
            className="m-3 img-fluid"
          />
          <h5 className="my-2">Delete This Item?</h5>
          <p className="text-muted">
            Are you sure you want to delete this item?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={deleteFav}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* LOADING */}
      {loading ? (
        <div className="text-center px-4 py-4">
          <div className="spinner-border text-success"></div>
        </div>
      ) : favList.length > 0 ? (

        /* GRID */
        <div className="container py-4">
          <div className="row g-4 justify-content-center">

            {favList.map((item) => (
              <div key={item.id} className="col-12 col-sm-4 col-lg-3">

                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">

                  {/* IMAGE */}

                    <img
                      src={
                        item?.recipe?.imagePath
                          ? `https://upskilling-egypt.com:3006/${item.recipe.imagePath}`
                          : "/default-food.jpg"
                      }
                      alt={item?.recipe?.name}
                      style={{
                        width: "100%",
                        maxWidth: "500px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />

                    {/* DELETE ICON */}
                    <i
                      onClick={() => handleShow(item.id)}
                      className="fa fa-trash shadow-sm"
                    ></i>


                  {/* BODY */}
                  <div className="card-body d-flex flex-column p-3">

                    <h5 className="fw-bold mb-2">
                      {item?.recipe?.name}
                    </h5>

                    <p
                      className="text-muted small mb-3"
                      style={{ minHeight: "40px" }}
                    >
                      {item?.recipe?.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-2">

                      <span className="badge bg-success px-3 py-2">
                        {item?.recipe?.price} EGP
                      </span>

                      <span className="badge bg-warning text-dark">
                        {item?.recipe?.tag?.name}
                      </span>

                    </div>

                    <small className="text-secondary">
                      Category: {item?.recipe?.category?.name}
                    </small>

                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

      ) : (
        <NoData />
      )}
    </div>
  );
}