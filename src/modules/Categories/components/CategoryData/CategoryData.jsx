import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  updateCategory,
  getCategoryById,
} from "../../../../api/modules/Categories";

export default function CategoryData() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const getDetails = async () => {
    try {
      const res = await getCategoryById(id);
      setValue("name", res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      getDetails();
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        // 🔥 UPDATE CATEGORY
        await updateCategory(id, data);
      } else {
        // 🔥 CREATE CATEGORY
        await createCategory(data);
      }

      navigate("/dashboard/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">
          {isEditMode ? "Edit Category" : "Create Category"}
        </h4>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <div className="mb-5 ">
            <input
              type="text"
              className="form-control "
              placeholder="Category Name"
              {...register("name", {
                required: "Category name is required",
              })}
            />

            {errors.name && (
              <p className="text-danger mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/dashboard/categories")}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-success">
              {isEditMode ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
