import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  useDefaultTitle,
  useCreateContext,
} from "react-admin";

import { Box, Typography } from "@mui/material";
import { validateForm } from "./EndpointValidation";

// Component for displaying the title in the endpoint creation view
const EndpointTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useCreateContext();
  return (
    <>
      <title>{`${appTitle} - ${defaultTitle}`}</title>
      <span>{defaultTitle}</span>
    </>
  );
};

// Component for creating a new endpoint
const EndpointCreate = () => (
  <Create title={<EndpointTitle />}>
    <SimpleForm
      sx={{ maxWidth: 800 }}
      defaultValues={{
        productname: "",
        description: "",
      }}
      validate={validateForm}
    >
      <SectionTitle label="resources.endpoints.fieldGroups.endpointinfo" />

      <Box
        sx={{
          display: { xs: "block", sm: "flex", width: "100%" },
        }}
      >
        <TextInput source="endpoint" isRequired />
      </Box>
      <Box
        sx={{
          display: { xs: "block", sm: "flex", width: "100%" },
        }}
      >
        <TextInput source="description" isRequired />
      </Box>
      <Separator />
    </SimpleForm>
  </Create>
);

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="h6" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

const Separator = () => (
  <Box
    sx={{
      pt: "1em",
    }}
  />
);

export default EndpointCreate;
