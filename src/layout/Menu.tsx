import { useState } from "react";
import { Box } from "@mui/material";

import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import clsx from "clsx";
import customers from "../customers";
import products from "../products";
import endpoints from "../endpoints";
import statements from "../statements";
import SubMenu from "./SubMenu";

import { VersionBadge } from "../version";

type MenuName = "menuCustomers" | "menuProducts";

// Custom Menu component for the admin interface
const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCustomers: true,
    menuProducts: true,
  });

  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
      className={clsx({
        "RaMenu-open": open,
        "RaMenu-closed": !open,
      })}
    >
      <DashboardMenuItem />
      <SubMenu
        handleToggle={() => handleToggle("menuCustomers")}
        isOpen={state.menuCustomers}
        name={translate("pos.menu.customers")}
        icon={<customers.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/customers"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.customers.name`, {
            smart_count: 2,
          })}
          leftIcon={<customers.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/statements"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.statements.name`, {
            smart_count: 2,
          })}
          leftIcon={<statements.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuProducts")}
        isOpen={state.menuProducts}
        name={translate("pos.menu.products")}
        icon={<products.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/products"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.products.name`, {
            smart_count: 2,
          })}
          leftIcon={<products.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/endpoints"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.endpoints.name`, {
            smart_count: 2,
          })}
          leftIcon={<endpoints.icon />}
          dense={dense}
        />
      </SubMenu>
      <br />
      <br />
      {/* version badge at the end of the menu */}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <VersionBadge />
      </Box>
    </Box>
  );
};

export default Menu;
