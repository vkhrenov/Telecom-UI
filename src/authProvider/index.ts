import { addRefreshAuthToAuthProvider } from "react-admin";
import { refreshAuth } from "./refreshAuth";
import { loginAndGetTokens } from "./loginAndGetTokens";

const routeAuthProvider = {
  // called when the user attempts to log in
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const loginData = await loginAndGetTokens(username, password);
    if (loginData !== null) {
      const login = username;
      localStorage.setItem("login", login);
      localStorage.setItem("auth", JSON.stringify(loginData));
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("login");
    localStorage.removeItem("username");
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("login");
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },

  getIdentity: () =>
    Promise.resolve({
      id: "user",
      fullName: localStorage.getItem("login") ?? undefined,
    }),
};

export const authProvider = addRefreshAuthToAuthProvider(
  routeAuthProvider,
  refreshAuth,
);
