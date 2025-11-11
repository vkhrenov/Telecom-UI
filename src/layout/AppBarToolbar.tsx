import { LoadingIndicator } from "react-admin";
import { ThemeSwapper } from "../themes/ThemeSwapper";

// Toolbar component for the custom AppBar
export const AppBarToolbar = () => (
  <>
    <ThemeSwapper />
    <LoadingIndicator />
  </>
);
