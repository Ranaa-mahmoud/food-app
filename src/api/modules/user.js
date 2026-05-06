import axiosClient from "../axiosClient";

export const createRecipe = (data) => {
  //   return axiosClient.post("/Recipe", data);
};
export const getUsers = () => {
  return axiosClient.get("/Users");
};
export const getRecipeById = (id) => {
  //   return axiosClient.get(`/Recipe/${id}`);
};
export const updateRecipe = (id) => {
  //   return axiosClient.put(`/Recipe/${id}`);
};
export const deleteUser = (id) => {
  return axiosClient.delete(`/Users/${id}`);
};
