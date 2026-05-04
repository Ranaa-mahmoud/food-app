import axiosClient from "../axiosClient";

export const getCategories = () => {
  return axiosClient.get("/Category");
};

export const GetCategoryById = (id) => {
  return axiosClient.get(`/Category/${id}`);
};

export const CreateCategory = (data) => {
  return axiosClient.post("/Category", data);
};

export const UpdateCategory = (id, data) => {
  return axiosClient.put(`/Category/${id}`, data);
};

export const deleteCategory = (id) => {
  return axiosClient.delete(`/Category/${id}`);
};