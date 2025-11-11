import { getAuthTokensFromLocalStorage } from "./getAuthTokensFromLocalStorage";
import { refreshAuthTokens } from "./refreshAuthTokens";

// Refreshes authentication tokens if they are expired or about to expire
export const refreshAuth = () => {
  const { accessToken, refreshToken } = getAuthTokensFromLocalStorage();
  if (!accessToken || !refreshToken) {
    return Promise.reject();
  }

  if (
    !accessToken?.exp ||
    Number(accessToken.exp) < Math.floor(Date.now() / 1000) + 300
  ) {
    // ...existing code...
    // This function will fetch the new tokens from the authentication service and update them in localStorage
    //return refreshAuthTokens(refreshToken);
    //
    console.log(
      "Access token is expired or about to expire, refreshing tokens..." +
        accessToken.exp,
    );
    return refreshAuthTokens(refreshToken)
      .then(() => {
        console.log("Tokens refreshed successfully");
        return Promise.resolve();
      })
      .catch((error) => {
        console.error("Failed to refresh tokens:", error);
        return Promise.reject();
      });
  }
  return Promise.resolve();
};
