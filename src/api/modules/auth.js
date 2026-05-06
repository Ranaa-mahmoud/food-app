import axiosClient from "../axiosClient";

export const login = (data) => {
  return axiosClient.post("/Users/Login", data);
};
export const register = (data) => {
  return axiosClient.post("/Users/Register", data);
};
export const verify = (data) => {
  return axiosClient.put("/Users/verify", data);
};
export const forget = (data) => {
  return axiosClient.post("/Users/Reset/Request", data);
};
export const reset = (data) => {
  return axiosClient.post("/Users/Reset", data);
};
