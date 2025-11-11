// Retrieves authentication tokens from local storage
export function getAuthTokensFromLocalStorage() {
  const authData = localStorage.getItem("auth");
  if (authData) {
    const parsed = JSON.parse(authData);
    const access_token = parsed.access_token;
    const exp = parsed.expired_in + Math.floor(Date.now() / 1000);
    const refresh_token = parsed.refresh_token;
    return {
      accessToken: { token: access_token, exp: exp },
      refreshToken: refresh_token,
    };
  } else {
    return {
      accessToken: null,
      refreshToken: null,
    };
  }
}
