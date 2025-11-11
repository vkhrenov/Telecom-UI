import ProductIcon from "@mui/icons-material/Shop2";

import ProductList from "./ProductList";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";

// Definition of the product resource for the admin interface
const resource = {
  list: ProductList,
  create: ProductCreate,
  edit: ProductEdit,
  icon: ProductIcon,
  recordRepresentation: (record: any) => `${record.productname}`,
};

export default resource;
