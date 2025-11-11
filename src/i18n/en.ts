import { TranslationMessages } from "react-admin";
import englishMessages from "ra-language-english";

const customEnglishMessages: TranslationMessages = {
  ...englishMessages,
  pos: {
    search: "Search",
    configuration: "Configuration",
    language: "Language",
    theme: {
      name: "Theme",
      light: "Light",
      dark: "Dark",
    },
    menu: {
      customers: "Customers",
      products: "Products",
    },
    dashboard: {
      month_history: "30 Day Dip History",
      day_history: "24 Hour Dip History",
      welcome: {
        title: "Telecom-UI Admin",
      },
      monthly_dips: "Monthly Dips",
      daily_dips: "Daily Dips",
      daily_amount: "Daily Amount",
      monthly_amount: "Monthly Amount",
      last_dip: "Last Checked Dip",
      health: "Health",
    },
  },
  resources: {
    // Customer related translations
    customers: {
      name: "Customer |||| Customers",
      fields: {
        name: "Name",
        username: "Username",
        login: "Login",
        email: "Email",
        isactive: "Authorized to access",
        issuperuser: "Is Superuser?",
        datecreated: "Created on",
        datedeactivated: "Deactivation Date",
        password: "Password",
        confirm_password: "Confirm password",
        stateAbbr: "State",
        statementmemo: "Month-to-date  (Dips / $$)",
      },
      filters: {},
      fieldGroups: {
        identity: "Identity",
        authentication: "Authentication",
        properties: "Properties",
        password: "Password",
        change_password: "Change Password",
        settings: "Settings",
        statements: "Statements",
      },
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
      notifications: {
        created: "Customer created |||| %{smart_count} customers created",
        updated: "Customer updated |||| %{smart_count} customers updated",
        deleted: "Customer deleted |||| %{smart_count} customers deleted",
      },
    },
    // Customer Settings related translations
    customersettings: {
      name: "Customer Settings |||| Customer Settings",
      empty: "No customer settings found",
      invite: "Click below to add customer settings",
      fields: {
        productname: "Product",
        productpriority: "Priority",
        ratio: "Ratio",
        note: "Note",
        dateeff: "Effective Date",
        dateexp: "Expiration Date",
      },
      fieldGroups: {
        addbutton: "+ Add Product",
        newsettings: "New customer product",
      },
    },
    // Product related translations
    products: {
      name: "Product |||| Products",
      fields: {
        productname: "Product Name",
        description: "Description",
      },
      fieldGroups: {
        productinfo: "Product Info",
        settings: "Endpoints & Rates",
      },
      tabs: {},
      filters: {},
      notifications: {
        created: "Product created |||| %{smart_count} ptoducts created",
        updated: "Product updated |||| %{smart_count} ptoducts updated",
        deleted: "Product deleted |||| %{smart_count} ptoducts deleted",
      },
    },
    // Rate related translations
    rates: {
      name: "Rate |||| Rates",
      fields: {
        endpoint: "Endpoint",
        rate: "Rate",
        dateeff: "Effective Date",
        dateexp: "Expiration Date",
      },
    },
    // Endpoint related translations
    endpoints: {
      name: "Endpoint |||| Endpoints",
      fields: {
        endpoint: "Endpoint",
        description: "Description",
      },
      fieldGroups: {
        endpointinfo: "Endpoint Info",
      },
      notifications: {
        created: "Endpoint created |||| %{smart_count} endpoints created",
        updated: "Endpoint updated |||| %{smart_count} endpoints updated",
        deleted: "Endpoint deleted |||| %{smart_count} endpoints deleted",
      },
    },
    // Statement related translations
    statements: {
      name: "Statement |||| Statements",
      fields: {
        name: "Customer Name",
        username: "Username",
        isactive: "Authorized to access",
        lddips: "PD Dips",
        ldamount: "PD Amount",
        dtddips: "DTD Dips",
        dtdamount: "DTD Amount",
        mtddips: "MTD Dips",
        mtdamount: "MTD Amount",
        lastmdips: "LM Dips",
        lastmamount: "LM Amount",
        lastcalldate: "Last Call Date",
        amount: "Amount",
      },
      tabs: {
        dtd_summary: "Day-to-Date Summary",
        ld_summary: "Previous Day Summary",
        mtd_summary: "Month-to-Date Summary",
        lastm_summary: "Last Month Summary",
        custom_summary: "Custom Summary",
      },
    },
  },
};

export default customEnglishMessages;
