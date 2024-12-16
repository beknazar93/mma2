export const fetchWithAuth = async (url, options = {}) => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  if (!accessToken || !refreshToken) {
    console.error("Токен отсутствует. Перенаправляем на страницу входа.");
    window.location.href = "/login";
    return;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      console.warn("Access токен недействителен. Обновляем токен...");
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        // Повторяем запрос с новым токеном
        return await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } else {
        console.error("Ошибка обновления токена. Перенаправляем на страницу входа.");
        window.location.href = "/login";
        return;
      }
    }

    return response;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};

const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) {
    console.error("Refresh token отсутствует.");
    return null;
  }

  try {
    const response = await fetch("https://testosh.pythonanywhere.com/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
      console.error("Не удалось обновить токен. Код ответа:", response.status);
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.access;

    if (newAccessToken) {
      localStorage.setItem("access", newAccessToken);
      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);
    return null;
  }
};
