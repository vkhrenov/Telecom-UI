import {
  useTranslate,
  Edit,
  TextInput,
  NumberInput,
  SimpleForm,
  useDefaultTitle,
  useEditContext,
  SimpleFormIterator,
  ArrayInput,
  DateTimeInput,
} from "react-admin";

import { Grid, Box, Typography } from "@mui/material";
import FullNameField from "./FullNameField";
import { validateForm } from "./ProductValidation";
import { SelectEndpointName } from "./ProductComponents";
import { toLocalDateTimeString } from "../logic/Date_Time";

// Component for reendering product edit view
const ProductEdit = () => {
  const translate = useTranslate();

  return (
    <Edit title={<ProductTitle />} mutationMode="pessimistic">
      <SimpleForm validate={validateForm}>
        <div>
          <Grid
            container
            spacing={2}
            sx={{
              width: { xs: "100%", xl: 1300 },
            }}
          >
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.products.fieldGroups.productinfo")}
              </Typography>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <TextInput source="productname" isRequired />
              </Box>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <TextInput source="description" isRequired />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.products.fieldGroups.settings")}
              </Typography>

              <div>
                <Box
                  sx={{
                    flex: 1,
                    mr: { xs: 0, sm: "0.5em" },
                  }}
                ></Box>

                <Box
                  sx={{
                    flex: 1,
                    ml: { xs: 0, sm: "0.5em" },
                    mb: 2,
                  }}
                >
                  <ArrayInput source="rates" label="">
                    <SimpleFormIterator inline disableClear disableReordering>
                      <SelectEndpointName />
                      <NumberInput
                        source="rate"
                        required
                        min={0}
                        defaultValue={0}
                        step={0.001}
                        label={translate("resources.rates.fields.rate")}
                        sx={{ width: "40%" }}
                      />
                      <DateTimeInput
                        source="dateeff"
                        required
                        helperText={false}
                        label={translate("resources.rates.fields.dateeff")}
                        defaultValue={toLocalDateTimeString(new Date())}
                        parse={(date) => toLocalDateTimeString(date)}
                        sx={{ width: "100%" }}
                      />
                      <DateTimeInput
                        source="dateexp"
                        helperText={false}
                        label={translate("resources.rates.fields.dateexp")}
                        parse={(date) => toLocalDateTimeString(date)}
                        sx={{ width: "100%" }}
                      />
                    </SimpleFormIterator>
                  </ArrayInput>
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

// Component for displaying the title in the product edit view
const ProductTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useEditContext();
  return (
    <>
      <title>{`${appTitle} - ${defaultTitle}`}</title>
      <FullNameField source="productname" size="32" sx={{ margin: "5px 0" }} />
    </>
  );
};

export default ProductEdit;
