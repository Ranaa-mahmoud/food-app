import React, { useEffect, useState } from "react";
import { getCategories } from "../../../../api/modules/Categories";
import { getTags } from "../../../../api/modules/tags";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
} from "../../../../api/modules/Recipes";
import { toast } from "react-toastify";

export default function RecipeData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const isEditMode = location.pathname.includes("edit");
  const isViewMode = location.pathname.includes("view");
  const isCreateMode = !id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [categoriesList, setCategoriesList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const getCategorie = async () => {
    try {
      const response = await getCategories();
      setCategoriesList(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTags = async () => {
    try {
      const response = await getTags();
      setTagList(response?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("tagId", data.tagId);
      formData.append("categoriesIds", data.categoriesIds);

      if (data.recipeImage?.[0]) {
        formData.append("recipeImage", data.recipeImage[0]);
      }

      let response;

      if (isEditMode) {
        response = await updateRecipe(id, formData);
      } else {
        response = await createRecipe(formData);
      }

      toast.success(`Recipe ${isEditMode ? "updated" : "created"} successfully`);
      navigate("/dashboard/recipes");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save recipe");
    }
  };

  const getRecipeDetails = async (id) => {
    try {
      const response = await getRecipeById(id);
      const recipe = response.data;

      setValue("name", recipe.name);
      setValue("price", recipe.price);
      setValue("description", recipe.description);
      setValue("tagId", recipe.tagId);
      setValue("categoriesIds", recipe.categoriesIds);
    } catch (error) {
      toast.error("Failed to load recipe details");
    }
  };

  useEffect(() => {
    getCategorie();
    getAllTags();

    if (isEditMode || isViewMode) {
      getRecipeDetails(id);
    }
  }, [id]);

  return (
    <div>
      <h3 className="text-center my-3">
        {isViewMode
          ? "View Recipe"
          : isEditMode
          ? "Edit Recipe"
          : "Create Recipe"}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="w-75 m-auto p-3">

        {/* NAME */}
        <input
          {...register("name", { required: true })}
          className="form-control my-2"
          placeholder="Recipe Name"
          disabled={isViewMode}
        />

        {/* TAG */}
        <select
          {...register("tagId", { required: true })}
          className="form-control my-2"
          disabled={isViewMode}
        >
          <option value="">Tag</option>
          {tagList.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        {/* PRICE */}
        <input
          {...register("price", { required: true })}
          type="number"
          className="form-control my-2"
          placeholder="Price"
          disabled={isViewMode}
        />

        {/* CATEGORY */}
        <select
          {...register("categoriesIds", { required: true })}
          className="form-control my-2"
          disabled={isViewMode}
        >
          <option value="">Category</option>
          {categoriesList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* DESCRIPTION */}
        <textarea
          {...register("description", { required: true })}
          className="form-control my-2"
          placeholder="Description"
          disabled={isViewMode}
        />

        {/* IMAGE */}
        <input
          {...register("recipeImage")}
          type="file"
          className="form-control my-2"
          disabled={isViewMode}
        />

        {/* BUTTONS */}
        {!isViewMode && (
          <button className="btn btn-success w-100 mt-3">
            Save
          </button>
        )}

        <button
          type="button"
          className="btn btn-outline-secondary w-100 mt-2"
          onClick={() => navigate("/dashboard/recipes")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}