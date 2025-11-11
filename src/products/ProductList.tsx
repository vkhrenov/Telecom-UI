import {
  CreateButton,
  DataTable,
  ExportButton,
  BulkDeleteButton,
  List,
  SearchInput,
  ColumnsButton,
  TopToolbar,
  useDefaultTitle,
  useListContext,
} from "react-admin";

import ProductLinkField from "./ProductLinkField";
import type { Product } from "../types";

const productFilters = [<SearchInput source="productname" alwaysOn />];

// Component for rendering product list view actions
const ProductListActions = () => (
  <TopToolbar>
    <CreateButton label="ADD PRODUCT" />
    <ColumnsButton />
    <ExportButton />
  </TopToolbar>
);

// Component for displaying the title in the product list view
const ProductTitle = () => {
  const title = useDefaultTitle();
  const { defaultTitle } = useListContext();
  return (
    <>
      <title>{`${title} - ${defaultTitle}`}</title>
      <span>{defaultTitle}</span>
    </>
  );
};

const Column = DataTable.Col<Product>;

// Component for rendering the product list view
const ProductList = () => {
  return (
    <List
      filters={productFilters}
      sort={{ field: "productname", order: "ASC" }}
      perPage={25}
      actions={<ProductListActions />}
      title={<ProductTitle />}
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
          source="productname"
          label="resources.products.fields.productname"
          field={ProductLinkField}
        />
        <Column
          source="description"
          label="resources.products.fields.description"
        />
      </DataTable>
    </List>
  );
};

export default ProductList;
