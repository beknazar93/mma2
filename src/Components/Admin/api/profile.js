import axios from "axios";

export const getProfile = async () => {
  return axios.get("https://testosh.pythonanywhere.com/api/profile/");
};
