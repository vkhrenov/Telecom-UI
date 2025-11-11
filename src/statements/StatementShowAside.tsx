import {
  useRecordContext,
  SimpleShowLayout,
  EmailField,
  ReferenceField,
  DateField,
  TextField,
  BooleanField,
} from "react-admin";
import { Box } from "@mui/material";

// Component for rendering the aside section in the statement detail view
export const StatementShowAside = () => {
  const record = useRecordContext();
  if (!record) return <Box minWidth={300} flexShrink={0} />;
  return (
    <SimpleShowLayout sx={{ minWidth: 300, flexShrink: 0 }}>
      <TextField source="id" />
      <ReferenceField
        source="id"
        reference="customers"
        label="resources.customers.fields.name"
      />
      <TextField
        source="username"
        label="resources.customers.fields.username"
      />
      <EmailField source="email" label="resources.customers.fields.email" />

      <BooleanField
        source="isactive"
        label="resources.customers.fields.isactive"
      />
      <BooleanField
        source="issuperuser"
        label="resources.customers.fields.issuperuser"
      />
      <DateField
        source="datecreated"
        showTime
        label="resources.customers.fields.datecreated"
      />
      <DateField
        source="last_call_date"
        showTime
        label="resources.statements.fields.lastcalldate"
      />
    </SimpleShowLayout>
  );
};
