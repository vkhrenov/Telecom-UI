const apiURL = import.meta.env.VITE_ROUTEAPI_URL || "http://localhost:8180";

// Logs in a user and retrieves authentication tokens
export async function loginAndGetTokens(login: string, password: string) {
  const response = await fetch(`${apiURL}/auth/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
}
