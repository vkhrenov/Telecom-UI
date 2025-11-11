import { Link, useRecordContext } from "react-admin";

import FullNameField from "./FullNameField";
import { Customer } from "../types";

// Component for rendering a link to the customer detail view
const CustomerLinkField = () => {
  const record = useRecordContext<Customer>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/customers/${record.id}`}>
      <FullNameField source="name" />
    </Link>
  );
};

export default CustomerLinkField;
