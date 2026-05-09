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

  // ================= STATES =================

  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATES
  const [searchValue, setSearchValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  // MODAL STATES
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // ================= MODAL FUNCTIONS =================

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  // ================= GET FAVORITE RECIPES =================

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

  // ================= DELETE FAVORITE =================

  const deleteFav = async () => {
    try {
      await deleteFavoriteRecipe(selectedId);

      // DELETE ITEM FROM UI
      setFavList((prev) =>
        prev.filter((item) => item.id !== selectedId)
      );

      toast.success("Deleted successfully");

      handleClose();

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  // ================= USE EFFECT =================

  useEffect(() => {
    getList();
  }, []);

  // ================= FILTER =================

  const filteredFavorites = favList.filter((item) => {

    // SEARCH BY NAME
    const matchSearch = item?.recipe?.name
      ?.toLowerCase()
      .includes(searchValue.toLowerCase());

    // FILTER BY TAG
    const matchTag = tagValue
      ? item?.recipe?.tag?.name === tagValue
      : true;

    // FILTER BY CATEGORY
    const matchCategory = categoryValue
      ? item?.recipe?.category?.[0]?.name === categoryValue
      : true;

    return matchSearch && matchTag && matchCategory;
  });

  return (
    <div>

      {/* ================= HEADER ================= */}

      <Header
        title="Favorite "
        subtitle={"Items"}
        description="Your saved recipes list"
        imgUrl={photo}
      />

      {/* ================= DELETE MODAL ================= */}

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

          <Button
            variant="outline-danger"
            onClick={deleteFav}
          >
            Delete this item
          </Button>

        </Modal.Footer>

      </Modal>

      {/* ================= FILTERS ================= */}

      <div className="container py-3">

        <div className="row g-3">

          {/* SEARCH */}
          <div className="col-md-6">

            <div className="input-group">

              <span className="input-group-text bg-white border-end-0">
                <i className="fa fa-search text-muted"></i>
              </span>

              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search recipe..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

            </div>

          </div>

          {/* TAG FILTER */}
          <div className="col-md-3">

            <select
              className="form-select"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
            >

              <option value="">All Tags</option>

              {[...new Set(
                favList.map((item) => item?.recipe?.tag?.name)
              )].map((tag, index) => (

                <option key={index} value={tag}>
                  {tag}
                </option>

              ))}

            </select>

          </div>

          {/* CATEGORY FILTER */}
          <div className="col-md-3">

            <select
              className="form-select"
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            >

              <option value="">All Categories</option>

              {[...new Set(
                favList.map(
                  (item) => item?.recipe?.category?.[0]?.name
                )
              )].map((cat, index) => (

                <option key={index} value={cat}>
                  {cat}
                </option>

              ))}

            </select>

          </div>

        </div>

      </div>

      {/* ================= LOADING ================= */}

      {loading ? (

        <div className="text-center px-4 py-4">
          <div className="spinner-border text-success"></div>
        </div>

      ) : filteredFavorites.length > 0 ? (

        /* ================= FAVORITES CARDS ================= */

        <div className="d-flex flex-row flex-wrap justify-content-center gap-4 py-4">

          {filteredFavorites.map((item) => (

            <div
              key={item.id}
              className="card shadow-sm border-0 rounded-4 overflow-hidden"
              style={{
                width: "320px",
              }}
            >

              {/* ================= IMAGE ================= */}

              <img
                src={
                  item?.recipe?.imagePath
                    ? `https://upskilling-egypt.com:3006/${item.recipe.imagePath}`
                    : "/default-food.jpg"
                }
                alt={item?.recipe?.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              {/* ================= CARD BODY ================= */}

              <div className="card-body d-flex flex-column p-3 text-center">

                {/* RECIPE NAME */}
                <h5 className="fw-bold mb-2 fs-4 text-dark">
                  {item?.recipe?.name}
                </h5>

                {/* DESCRIPTION */}
                <p
                  className="text-muted mb-3"
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.6",
                    minHeight: "60px",
                  }}
                >
                  {item?.recipe?.description}
                </p>

                {/* ================= PRICE ================= */}

                <div className="mb-3">

                  <div className="d-flex justify-content-center align-items-center gap-2 p-2 rounded-3 bg-light border">

                    <i className="fa-solid fa-coins text-success fs-5"></i>

                    <span className="fw-bold fs-5">
                      {item?.recipe?.price} EGP
                    </span>

                  </div>

                </div>

                {/* ================= TAG + CATEGORY ================= */}

                <div className="d-flex gap-2">

                  {/* TAG */}
                  <div className="flex-fill p-2 rounded-3 bg-warning-subtle border text-center">

                    <div className="fw-semibold fs-6">
                      {item?.recipe?.tag?.name}
                    </div>

                  </div>

                  {/* CATEGORY */}
                  <div className="flex-fill p-2 rounded-3 bg-danger-subtle border text-center">

                    <div className="fw-semibold fs-6">
                      {item?.recipe?.category?.[0]?.name}
                    </div>

                  </div>

                </div>

                {/* ================= DELETE BUTTON ================= */}

                <button
                  className="btn btn-danger w-100 mt-4"
                  onClick={() => handleShow(item.id)}
                >
                  <i className="fa-solid fa-trash me-2"></i>
                  Remove Recipe
                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <NoData />

      )}
    </div>
  );
}