import React from "react";
import { useTranslate, SelectInput, useGetList } from "react-admin";

// Component for selecting an endpoint name from a list of endpoints
export const SelectEndpointName: React.FC = () => {
  const translate = useTranslate();
  const { data: endpoints = [] } = useGetList(
    "endpoints",
    {
      sort: { field: "endpoint", order: "ASC" },
    },
    {},
  );

  // Map endpoints to choices for the SelectInput
  const endpointChoices = endpoints.map((e: any) => ({
    id: e.id,
    endpoint: e.endpoint,
  }));

  return (
    <SelectInput
      choices={endpointChoices}
      defaultValue=""
      source="endpointid"
      required
      helperText={true}
      optionText="endpoint"
      optionValue="id"
      label={translate("resources.rates.fields.endpoint")}
    />
  );
};
