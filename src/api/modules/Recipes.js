import axiosClient from "../axiosClient";

export const getRecipes = () => {
  return axiosClient.get("/Recipe");
};

export const getRecipeById = (id) => {
  return axiosClient.get(`/Recipe/${id}`);
};

export const createRecipe = (data) => {
  return axiosClient.post("/Recipe", data);
};

export const updateRecipe = (id, data) => {
  return axiosClient.put(`/Recipe/${id}`, data);
};

export const deleteRecipes = (id) => {
  return axiosClient.delete(`/Recipe/${id}`);
};