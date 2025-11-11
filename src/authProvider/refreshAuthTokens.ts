const apiURL = import.meta.env.VITE_ROUTEAPI_URL || "http://localhost:8180";

// Refreshes authentication tokens using the provided refresh token
export async function refreshAuthTokens(refreshToken: string) {
  const response = await fetch(`${apiURL}/auth/refresh`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    // Update tokens in localStorage
    localStorage.setItem("auth", JSON.stringify(data));
    return Promise.resolve();
  }

  return Promise.reject();
}
