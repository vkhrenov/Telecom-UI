import { Link, useRecordContext } from "react-admin";

import FullNameField from "./FullNameField";
import { Endpoint } from "../types";

// Component for rendering a link to the endpoint detail view
const EndpointLinkField = () => {
  const record = useRecordContext<Endpoint>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/endpoints/${record.id}`}>
      <FullNameField source="endpoint" />
    </Link>
  );
};

export default EndpointLinkField;
