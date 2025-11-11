import { Link, useRecordContext } from "react-admin";

import FullNameField from "./FullNameField";
import { Statement } from "../types";

// Component for rendering a link to the statement detail view
const StatementLinkField = () => {
  const record = useRecordContext<Statement>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/statements/${record.id}`}>
      <FullNameField source="name" />
    </Link>
  );
};

export default StatementLinkField;
