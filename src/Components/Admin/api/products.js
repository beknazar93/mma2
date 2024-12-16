import axios from "axios";

const BASE_URL = "https://testosh.pythonanywhere.com/api/products/";

export const getProducts = async () => {
  return axios.get(BASE_URL);
};

export const getProduct = async (id) => {
  return axios.get(`${BASE_URL}${id}/`);
};

export const createProduct = async (data) => {
  return axios.post(BASE_URL, data);
};

export const updateProduct = async (id, data) => {
  return axios.put(`${BASE_URL}${id}/`, data);
};

export const deleteProduct = async (id) => {
  return axios.delete(`${BASE_URL}${id}/`);
};
