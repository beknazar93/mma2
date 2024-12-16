import axios from "axios";

const BASE_URL = "https://testosh.pythonanywhere.com/api/sales/";

export const getSales = async () => {
  return axios.get(BASE_URL);
};

export const getSale = async (id) => {
  return axios.get(`${BASE_URL}${id}/`);
};

export const createSale = async (data) => {
  return axios.post(BASE_URL, data);
};

export const updateSale = async (id, data) => {
  return axios.put(`${BASE_URL}${id}/`, data);
};

export const deleteSale = async (id) => {
  return axios.delete(`${BASE_URL}${id}/`);
};
