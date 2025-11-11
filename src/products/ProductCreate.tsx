import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  useDefaultTitle,
  useCreateContext,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { validateForm } from "./ProductValidation";

// Component for displaying the title in the product creation view
const ProductTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useCreateContext();
  return (
    <>
      <title>{`${appTitle} - ${defaultTitle}`}</title>
      <span>{defaultTitle}</span>
    </>
  );
};

// Component for creating a new product
const ProductCreate = () => (
  <Create title={<ProductTitle />}>
    <SimpleForm
      sx={{ maxWidth: 800 }}
      defaultValues={{
        productname: "",
        description: "",
      }}
      validate={validateForm}
    >
      <SectionTitle label="resources.products.fieldGroups.productinfo" />
      <Box
        sx={{
          display: { xs: "block", sm: "flex", width: "100%" },
        }}
      >
        <TextInput source="productname" isRequired />
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

// Component for rendering section titles in forms
const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="h6" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

// Component for adding vertical spacing between form sections
const Separator = () => (
  <Box
    sx={{
      pt: "1em",
    }}
  />
);

export default ProductCreate;
