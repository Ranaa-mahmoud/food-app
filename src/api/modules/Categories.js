import axiosClient from "../axiosClient";

export const getCategories = () => {
  return axiosClient.get("/Category");
};

export const getCategoryById = (id) => {
  return axiosClient.get(`/Category/${id}`);
};

export const createCategory = (data) => {
  return axiosClient.post("/Category", data);
};

export const updateCategory = (id, data) => {
  return axiosClient.put(`/Category/${id}`, data);
};

export const deleteCategory = (id) => {
  return axiosClient.delete(`/Category/${id}`);
};