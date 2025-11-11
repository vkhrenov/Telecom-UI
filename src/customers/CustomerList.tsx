import {
  BooleanField,
  CreateButton,
  DataTable,
  DateField,
  ExportButton,
  BulkDeleteButton,
  List,
  SearchInput,
  ColumnsButton,
  TopToolbar,
  useDefaultTitle,
  useListContext,
} from "react-admin";

import CustomerLinkField from "./CustomerLinkField";
import type { Customer } from "../types";

const customerFilters = [<SearchInput source="name" alwaysOn />];

// Component for rendering customer list view actions
const CustomerListActions = () => (
  <TopToolbar>
    <CreateButton label="ADD CUSTOMER" />
    <ColumnsButton />
    <ExportButton />
  </TopToolbar>
);

// Component for displaying the title in the customer list view
const CustomerTitle = () => {
  const title = useDefaultTitle();
  const { defaultTitle } = useListContext();
  return (
    <>
      <title>{`${title} - ${defaultTitle}`}</title>
      <span>{defaultTitle}</span>
    </>
  );
};

const Column = DataTable.Col<Customer>;

// Component for rendering the customer list view
const CustomerList = () => {
  return (
    <List
      filters={customerFilters}
      sort={{ field: "name", order: "ASC" }}
      perPage={25}
      actions={<CustomerListActions />}
      title={<CustomerTitle />}
    >
      <DataTable
        bulkActionButtons={<BulkDeleteButton mutationMode="pessimistic" />}
      >
        <Column source="id" label="ID" />
        <Column
          source="name"
          label="resources.customers.fields.name"
          field={CustomerLinkField}
        />
        <Column source="username" label="resources.customers.fields.username" />
        <Column source="login" label="resources.customers.fields.login" />
        <Column source="email" label="resources.customers.fields.email" />
        <Column
          source="isactive"
          label="resources.customers.fields.isactive"
          field={BooleanField}
        />
        <Column
          source="issuperuser"
          label="resources.customers.fields.issuperuser"
          field={BooleanField}
        />
        <Column
          source="datecreated"
          label="resources.customers.fields.datecreated"
        >
          <DateField source="datecreated" showTime />
        </Column>
        <Column
          source="datedeactivated"
          label="resources.customers.fields.datedeactivated"
        >
          <DateField source="datedeactivated" showTime />
        </Column>
      </DataTable>
    </List>
  );
};

export default CustomerList;
