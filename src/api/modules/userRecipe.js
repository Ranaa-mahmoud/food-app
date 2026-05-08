import axiosClient from "../axiosClient";

export const getFavoriteRecipes = () => {
  return axiosClient.get("/userRecipe/");
};

export const addFavoriteRecipe = (data) => {
  return axiosClient.post("/userRecipe/", data);
};

export const deleteFavoriteRecipe = (id) => {
  return axiosClient.delete(`/userRecipe/${id}`);
};