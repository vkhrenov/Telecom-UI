import React from "react";
import { useTranslate, SelectInput, useGetList } from "react-admin";

// Component for selecting a product name from a list of products
export const SelectProductName: React.FC = () => {
  const translate = useTranslate();
  const { data: products = [] } = useGetList(
    "products",
    {
      sort: { field: "productname", order: "ASC" },
    },
    {},
  );

  const productChoices = products.map((p: any) => ({
    id: p.id,
    name: p.productname,
  }));

  return (
    <SelectInput
      choices={productChoices}
      defaultValue=""
      source="productid"
      required
      helperText={true}
      label={translate("resources.customersettings.fields.productname")}
    />
  );
};
