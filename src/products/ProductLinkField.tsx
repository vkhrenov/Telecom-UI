import { Link, useRecordContext } from "react-admin";

import FullNameField from "./FullNameField";
import { Product } from "../types";

// Component for rendering a link to the product detail view
const ProductLinkField = () => {
  const record = useRecordContext<Product>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/products/${record.id}`}>
      <FullNameField source="productname" />
    </Link>
  );
};

export default ProductLinkField;
