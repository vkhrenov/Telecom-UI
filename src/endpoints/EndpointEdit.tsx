import {
  useTranslate,
  Edit,
  TextInput,
  SimpleForm,
  useDefaultTitle,
  useEditContext,
} from "react-admin";

import { Grid, Box, Typography } from "@mui/material";
import FullNameField from "./FullNameField";
import { validateForm } from "./EndpointValidation";

// Component for reendering endpoint edit view
const EndpointEdit = () => {
  const translate = useTranslate();

  return (
    <Edit title={<EndpointTitle />} mutationMode="pessimistic">
      <SimpleForm validate={validateForm}>
        <div>
          <Grid
            container
            spacing={2}
            sx={{
              width: { xs: "100%", xl: 1200 },
            }}
          >
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.endpoints.fieldGroups.endpointinfo")}
              </Typography>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <TextInput source="endpoint" isRequired />
              </Box>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <TextInput source="description" isRequired />
              </Box>
            </Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

const EndpointTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useEditContext();
  return (
    <>
      <title>{`${appTitle} - ${defaultTitle}`}</title>
      <FullNameField source="endpoint" size="32" sx={{ margin: "5px 0" }} />
    </>
  );
};

export default EndpointEdit;
