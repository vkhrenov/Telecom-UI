import {
  useTranslate,
  Edit,
  BooleanInput,
  TextInput,
  DateTimeInput,
  PasswordInput,
  DateField,
  SimpleForm,
  ArrayInput,
  NumberInput,
  SimpleFormIterator,
  useDefaultTitle,
  useEditContext,
  ReferenceField,
} from "react-admin";

import { Grid, Box, Typography } from "@mui/material";
import FullNameField from "./FullNameField";
import { validateForm } from "./CustomerValidation";
import { SelectProductName } from "./CustomerComponents";
import { toLocalDateTimeString } from "../logic/Date_Time";

// Component for reendering customer edit view
const CustomerEdit = () => {
  const translate = useTranslate();

  return (
    <Edit title={<CustomerTitle />} mutationMode="pessimistic">
      <SimpleForm validate={validateForm}>
        <div>
          <Grid
            container
            spacing={2}
            sx={{
              width: { xs: "100%", xl: 1600 },
            }}
          >
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.customers.fieldGroups.identity")}
              </Typography>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <TextInput source="name" isRequired />
              </Box>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <TextInput source="username" isRequired />
              </Box>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <TextInput type="email" source="email" />
              </Box>

              <Typography variant="h6" gutterBottom>
                {translate("resources.customers.fieldGroups.authentication")}
              </Typography>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <TextInput source="login" isRequired />
              </Box>

              <Typography variant="h6" gutterBottom>
                {translate("resources.customers.fieldGroups.change_password")}
              </Typography>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
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

              <Typography variant="h6" gutterBottom>
                {translate("resources.customers.fieldGroups.properties")}
              </Typography>
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    mr: { xs: 0, sm: "0.5em" },
                  }}
                >
                  <BooleanInput
                    label={translate("resources.customers.fields.issuperuser")}
                    source="issuperuser"
                  />
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    mr: { xs: 0, sm: "0.5em" },
                  }}
                >
                  <BooleanInput
                    label={translate("resources.customers.fields.isactive")}
                    source="isactive"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  ml: { xs: 0, sm: "0.5em" },
                }}
              >
                <DateTimeInput
                  source="datedeactivated"
                  parse={(date) => toLocalDateTimeString(date)}
                />
              </Box>

              <Typography variant="h6" gutterBottom>
                {translate("resources.customers.fieldGroups.statements")}
              </Typography>

              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                }}
              >
                <Box
                  sx={{
                    flex: 2,
                    mr: { xs: 0, sm: "0.5em" },
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {translate("resources.customers.fields.statementmemo")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    mr: { xs: 0, sm: "0.5em" },
                  }}
                >
                  <ReferenceField
                    source="id"
                    reference="statements"
                    label={translate("resources.customers.fields.name")}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.customers.fieldGroups.settings")}
              </Typography>

              <div>
                <Box
                  sx={{
                    flex: 1,
                    mr: { xs: 0, sm: "0.5em" },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {translate("resources.customers.fields.datecreated")}
                    :&nbsp;
                    <DateField source="datecreated" showTime />
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    ml: { xs: 0, sm: "0.5em" },
                    mb: 2,
                  }}
                >
                  <ArrayInput source="usersettings" label="">
                    <SimpleFormIterator inline disableClear disableReordering>
                      <SelectProductName />
                      <NumberInput
                        source="productpriority"
                        required
                        min={0}
                        defaultValue={0}
                        label={translate(
                          "resources.customersettings.fields.productpriority",
                        )}
                        helperText={false}
                        sx={{ width: "35%" }}
                      />
                      <NumberInput
                        source="ratio"
                        helperText={false}
                        required
                        min={0}
                        defaultValue={1}
                        step={0.1}
                        label={translate(
                          "resources.customersettings.fields.ratio",
                        )}
                        sx={{ width: "40%" }}
                      />
                      <TextInput
                        source="note"
                        helperText={true}
                        label={translate(
                          "resources.customersettings.fields.note",
                        )}
                      />
                      <DateTimeInput
                        source="dateeff"
                        required
                        helperText={false}
                        label={translate(
                          "resources.customersettings.fields.dateeff",
                        )}
                        defaultValue={toLocalDateTimeString(new Date())}
                        parse={(date) => toLocalDateTimeString(date)}
                        sx={{ width: "130%" }}
                      />
                      <DateTimeInput
                        source="dateexp"
                        helperText={false}
                        label={translate(
                          "resources.customersettings.fields.dateexp",
                        )}
                        parse={(date) => toLocalDateTimeString(date)}
                        sx={{ width: "130%" }}
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

// Component for displaying the title in the customer edit view
const CustomerTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useEditContext();
  return (
    <>
      <title>{`${appTitle} - ${defaultTitle}`}</title>
      <FullNameField source="name" size="32" sx={{ margin: "5px 0" }} />
    </>
  );
};

export default CustomerEdit;
