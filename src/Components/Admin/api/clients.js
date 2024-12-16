import axios from "axios";

const BASE_URL = "https://testosh.pythonanywhere.com/api/clients/";

export const getClients = async () => {
  return axios.get(BASE_URL);
};

export const getClient = async (id) => {
  return axios.get(`${BASE_URL}${id}/`);
};

export const createClient = async (data) => {
  return axios.post(BASE_URL, data);
};

export const updateClient = async (id, data) => {
  return axios.put(`${BASE_URL}${id}/`, data);
};

export const deleteClient = async (id) => {
  return axios.delete(`${BASE_URL}${id}/`);
};
