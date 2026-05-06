import React, { useEffect, useState } from "react";
import { getCategories } from "../../../../api/modules/Categories";
import { getTags } from "../../../../api/modules/tags";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createRecipe } from "../../../../api/modules/Recipes";
import { useParams } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../../../../api/modules/Recipes";
export default function RecipeData() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const { id } = useParams();
  const isEditMode = !!id;

  const getCategorie = async () => {
    try {
      const response = await getCategories();
      setCategoriesList(response?.data?.data);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  const getAllTags = async () => {
    try {
      const response = await getTags();
      setTagList(response?.data);
    } catch (error) {
      console.log("ERROR:", error);
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

      console.log(response);
      navigate("/dashboard/recipes");
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };
  useEffect(() => {
    getCategorie();
    getAllTags();
    if (isEditMode) {
      getRecipeDetails(id);
    }
  }, [id]);
  return (
    <div>
      <div className=" container-fluid">
        <div className="row recipe-header px-5 py-4 m-3  rounded  rounded-3 justify-content-between">
          <div className="col-md-8">
            {isEditMode ? "Edit The Recipe" : "Fill The Recipes!"}

            <p className="my-3">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div className=" col-md-4 text-end">
            <button
              onClick={() => navigate("/dashboard/recipes")}
              className="btn btn-success"
            >
              All recipes <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-75 m-auto p-3 "
      >
        <div className=" input-group my-2">
          <input
            {...register("name", { required: "field is required" })}
            className=" form-control "
            type="text"
            placeholder="Recipe Name"
          />
        </div>
        {errors.name && <p className="text-danger">{errors.name.message}</p>}

        <div className=" input-group my-2">
          <select
            {...register("tagId", { required: "field is required" })}
            className=" form-control"
            id=""
          >
            <option value="">Tag</option>
            {tagList.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        {errors.tagId && <p className="text-danger">{errors.tagId.message}</p>}

        <div className=" input-group my-2">
          <input
            {...register("price", { required: "field is required" })}
            type="number"
            placeholder="Price"
            className="form-control"
          ></input>
        </div>
        {errors.price && <p className="text-danger">{errors.price.message}</p>}

        <div className=" input-group my-2">
          <select
            {...register("categoriesIds", { required: "field is required" })}
            className=" form-control"
            id=""
          >
            <option value="">Category</option>
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {errors.categoriesIds && (
          <p className="text-danger">{errors.categoriesIds.message}</p>
        )}

        <div className=" input-group my-2">
          <textarea
            {...register("description", { required: "field is requierd" })}
            type="text"
            placeholder="Description"
            className="form-control"
          ></textarea>
        </div>
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}

        <div className=" input-group my-2">
          <input
            {...register("recipeImage", { required: "field is requierd" })}
            className=" form-control "
            type="file"
          />
        </div>
        {errors.recipeImage && (
          <p className="text-danger">{errors.recipeImage.message}</p>
        )}
        <div className="btns d-flex justify-content-end my-5">
          <button type="button" className="btn btn-outline-success mx-3">
            cancel
          </button>
          <button type="submit" className="btn btn-success ">
            save
          </button>
        </div>
      </form>
    </div>
  );
}
