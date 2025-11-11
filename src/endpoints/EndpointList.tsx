import {
  CreateButton,
  DataTable,
  ExportButton,
  List,
  SearchInput,
  ColumnsButton,
  TopToolbar,
  useDefaultTitle,
  useListContext,
  BulkDeleteButton,
} from "react-admin";

import EndpointLinkField from "./EndpointLinkField";
import type { Endpoint } from "../types";

const endpointFilters = [<SearchInput source="endpoint" alwaysOn />];

// Component for rendering endpoint list view actions
const EndpointListActions = () => (
  <TopToolbar>
    <CreateButton label="ADD ENDPOINT" />
    <ColumnsButton />
    <ExportButton />
  </TopToolbar>
);

// Component for displaying the title in the endpoint list view
const EndpointTitle = () => {
  const title = useDefaultTitle();
  const { defaultTitle } = useListContext();
  return (
    <>
      <title>{`${title} - ${defaultTitle}`}</title>
      <span>{defaultTitle}</span>
    </>
  );
};

const Column = DataTable.Col<Endpoint>;

// Component for rendering the endpoint list view
const EndpointList = () => {
  return (
    <List
      filters={endpointFilters}
      sort={{ field: "endpoint", order: "ASC" }}
      perPage={25}
      actions={<EndpointListActions />}
      title={<EndpointTitle />}
      sx={{
        width: "100%",
        maxWidth: 1200,
        ml: 0,
        overflow: "auto",
      }}
    >
      <DataTable
        bulkActionButtons={<BulkDeleteButton mutationMode="pessimistic" />}
      >
        <Column source="id" label="ID" />
        <Column
          source="endpoint"
          label="resources.endpoints.fields.endpoint"
          field={EndpointLinkField}
        />
        <Column
          source="description"
          label="resources.endpoints.fields.description"
        />
      </DataTable>
    </List>
  );
};

export default EndpointList;
