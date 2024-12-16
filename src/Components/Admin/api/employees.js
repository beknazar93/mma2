import axios from "axios";

const BASE_URL = "https://testosh.pythonanywhere.com/api/employees/";

export const getEmployees = async () => {
  return axios.get(BASE_URL);
};

export const getEmployee = async (id) => {
  return axios.get(`${BASE_URL}${id}/`);
};

export const createEmployee = async (data) => {
  return axios.post(BASE_URL, data);
};

export const updateEmployee = async (id, data) => {
  return axios.put(`${BASE_URL}${id}/`, data);
};

export const deleteEmployee = async (id) => {
  return axios.delete(`${BASE_URL}${id}/`);
};
