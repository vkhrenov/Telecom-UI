import polyglotI18nProvider from "ra-i18n-polyglot";

import {
  Admin,
  Resource,
  localStorageStore,
  StoreContextProvider,
  fetchUtils,
  useStore,
} from "react-admin";

import { Layout, Login } from "./layout";
import { authProvider } from "./authProvider";
import { Dashboard } from "./dashboard";
import customers from "./customers";
import products from "./products";
import endpoints from "./endpoints";
import statements from "./statements";
import simpleRestProvider from "ra-data-simple-rest";
import englishMessages from "./i18n/en";
import { themes, ThemeName } from "./themes/themes";

// Internationalization provider setup
const i18nProvider = polyglotI18nProvider(
  (locale) => {
    if (locale === "fr") {
      // Return English messages as a fallback for French
      return englishMessages;
      // Or, if you have French messages, use:
      // return import("./i18n/fr").then((messages) => messages.default);
    }

    // Always fallback on english
    return englishMessages;
  },
  "en",
  [
    { locale: "en", name: "English" },
    // { locale: "fr", name: "Français" },
  ],
);

// Custom HTTP client to include Authorization header
const httpClient = (url: string, options: RequestInit = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const auth = localStorage.getItem("auth");

  const { access_token } = auth ? JSON.parse(auth) : { access_token: "" };
  (options.headers as Headers).set("Authorization", `Bearer ${access_token}`);
  return fetchUtils.fetchJson(url, options);
};

const apiURL = import.meta.env.VITE_ROUTEAPI_URL || "http://localhost:8180";
const dataProvider = simpleRestProvider(apiURL + "/ui", httpClient);

// Wrap dataProvider to handle delete errors
const wrappedDataProvider = {
  ...dataProvider,
  async delete(resource: string, params: any) {
    try {
      return await dataProvider.delete(resource, params);
    } catch (err: any) {
      let msg = err?.message ?? "Server error";
      try {
        if (err?.body?.detail) {
          msg = err.body.detail;
        }
      } catch {}
      throw new Error(msg);
    }
  },
  async deleteMany(resource: string, params: any) {
    try {
      return await dataProvider.deleteMany(resource, params);
    } catch (err: any) {
      let msg = err?.message ?? "Server error";
      try {
        if (err?.body?.detail) {
          msg = err.body.detail;
        }
      } catch {}
      throw new Error(msg);
    }
  },
};

const store = localStorageStore(undefined, "RouteUI");

// Main application component
const App = () => {
  const [themeName] = useStore<ThemeName>("themeName", "default");
  const singleTheme = themes.find((theme) => theme.name === themeName)?.single;
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;

  return (
    <Admin
      title="Route Admin"
      dataProvider={wrappedDataProvider}
      store={store}
      authProvider={authProvider}
      dashboard={Dashboard}
      layout={Layout}
      loginPage={Login}
      i18nProvider={i18nProvider}
      disableTelemetry
      theme={singleTheme}
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light"
      requireAuth
    >
      <Resource name="customers" {...customers} />
      <Resource name="products" {...products} />
      <Resource name="endpoints" {...endpoints} />
      <Resource name="statements" {...statements} />
    </Admin>
  );
};

// Wrapper component to provide the store context
const AppWrapper = () => (
  <StoreContextProvider value={store}>
    <App />
  </StoreContextProvider>
);

export default AppWrapper;
