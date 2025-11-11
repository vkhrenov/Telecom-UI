import {
  BooleanField,
  DataTable,
  ExportButton,
  List,
  SearchInput,
  ColumnsButton,
  TopToolbar,
  useDefaultTitle,
  useListContext,
} from "react-admin";

import StatementLinkField from "./StatementLinkField";
import type { Statement } from "../types";

const statementFilters = [
  <SearchInput source="name" alwaysOn />,
  <BooleanField source="isactive" />,
];

// Component for rendering statement list view actions
const StatementListActions = () => (
  <TopToolbar>
    <ColumnsButton />
    <ExportButton />
  </TopToolbar>
);

// Component for displaying the title in the statement list view
const StatementTitle = () => {
  const title = useDefaultTitle();
  const { defaultTitle } = useListContext();
  return (
    <>
      <title>{`${title} - ${defaultTitle}`}</title>
      <span>{defaultTitle}</span>
    </>
  );
};

const Column = DataTable.Col<Statement>;
const ColumnNumber = DataTable.NumberCol<Statement>;

// Component for rendering the statement list view
const StatementList = () => {
  return (
    <List
      filters={statementFilters}
      sort={{ field: "name", order: "ASC" }}
      perPage={25}
      actions={<StatementListActions />}
      title={<StatementTitle />}
    >
      <DataTable bulkActionButtons={false}>
        <Column
          source="name"
          label="resources.statements.fields.name"
          field={StatementLinkField}
          sx={{ width: "40%" }}
        />
        <Column
          source="isactive"
          label="resources.statements.fields.isactive"
          field={BooleanField}
          sx={{ width: "5%" }}
        />
        <ColumnNumber
          source="dtd_count"
          label="resources.statements.fields.dtddips"
          disableSort
          align="right"
        />
        <ColumnNumber
          source="dtd_amount"
          label="resources.statements.fields.dtdamount"
          disableSort
          align="right"
          options={{
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 3,
          }}
        />
        <ColumnNumber
          source="ld_count"
          label="resources.statements.fields.lddips"
          disableSort
        />
        <ColumnNumber
          source="ld_amount"
          label="resources.statements.fields.ldamount"
          disableSort
          align="right"
          options={{
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 3,
          }}
        />
        <ColumnNumber
          source="mtd_count"
          label="resources.statements.fields.mtddips"
          disableSort
          align="right"
        />
        <ColumnNumber
          source="mtd_amount"
          label="resources.statements.fields.mtdamount"
          disableSort
          align="right"
          options={{
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 3,
          }}
        />
        <ColumnNumber
          source="lastm_count"
          label="resources.statements.fields.lastmdips"
          disableSort
          align="right"
        />
        <ColumnNumber
          source="lastm_amount"
          label="resources.statements.fields.lastmamount"
          disableSort
          align="right"
          options={{
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 3,
          }}
        />
      </DataTable>
    </List>
  );
};

export default StatementList;
