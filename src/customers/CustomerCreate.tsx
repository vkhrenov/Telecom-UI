import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  useDefaultTitle,
  useCreateContext,
  BooleanInput,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { validateForm } from "./CustomerValidation";

// Component for displaying the title in the customer creation view
const CustomerTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useCreateContext();
  return (
    <>
      <title>{`${appTitle} - ${defaultTitle}`}</title>
      <span>{defaultTitle}</span>
    </>
  );
};

// Component for creating a new customer
const CustomerCreate = () => (
  <Create title={<CustomerTitle />}>
    <SimpleForm
      sx={{ maxWidth: 800 }}
      defaultValues={{
        isactive: true,
        issuperuser: false,
        name: "",
        username: "newuser",
        login: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
      validate={validateForm}
    >
      <SectionTitle label="resources.customers.fieldGroups.identity" />
      <Box
        sx={{
          display: { xs: "block", sm: "flex", width: "100%" },
        }}
      >
        <TextInput source="name" isRequired />
      </Box>
      <Box
        sx={{
          display: { xs: "block", sm: "flex", width: "100%" },
        }}
      >
        <TextInput source="username" isRequired />
      </Box>
      <TextInput type="email" source="email" />
      <Separator />
      <SectionTitle label="resources.customers.fieldGroups.authentication" />
      <Box
        sx={{
          display: { xs: "block", sm: "flex", width: "100%" },
        }}
      >
        <TextInput source="login" isRequired />
      </Box>
      <Box
        sx={{
          display: { xs: "block", sm: "flex", width: "100%" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            mr: { xs: 0, sm: "0.5em" },
          }}
        >
          <PasswordInput source="password" />
        </Box>
        <Box
          sx={{
            flex: 1,
            ml: { xs: 0, sm: "0.5em" },
          }}
        >
          <PasswordInput source="confirm_password" />
        </Box>
      </Box>
      <Separator />
      <SectionTitle label="resources.customers.fieldGroups.properties" />
      <BooleanInput label="Is Superuser?" source="issuperuser" />
    </SimpleForm>
  </Create>
);

// Component for rendering section titles within the form
const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="h6" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

// Component for adding vertical spacing between sections
const Separator = () => (
  <Box
    sx={{
      pt: "1em",
    }}
  />
);

export default CustomerCreate;
