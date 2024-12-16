import axios from "axios";

export const refreshAccessToken = async (navigate) => {
  const refreshToken = localStorage.getItem("refresh");
  if (!refreshToken) {
    navigate("/login");
    return null;
  }
  try {
    const response = await axios.post("https://testosh.pythonanywhere.com/token/refresh/", {
      refresh: refreshToken,
    });
    const newToken = response.data.access;
    localStorage.setItem("access", newToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    return newToken;
  } catch (err) {
    navigate("/login");
    return null;
  }
};

export const fetchClientsData = async () => {
  const token = localStorage.getItem("access");
  const [clientsResponse, profileResponse] = await Promise.all([
    axios.get("https://testosh.pythonanywhere.com/api/clients/", {
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios.get("https://testosh.pythonanywhere.com/api/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);
  return {
    clientsData: clientsResponse.data,
    profileData: profileResponse.data,
  };
};

export const updateClientData = async (clientId, updatedData) => {
  const token = localStorage.getItem("access");
  try {
    const response = await axios.put(
      `https://testosh.pythonanywhere.com/api/clients/${clientId}/`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Ошибка при обновлении клиента:", err);
    return null;
  }
};
