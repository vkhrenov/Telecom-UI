import CustomerIcon from "@mui/icons-material/People";

import CustomerList from "./CustomerList";
import CustomerCreate from "./CustomerCreate";
import CustomerEdit from "./CustomerEdit";

// Definition of the customer resource for the admin interface
const resource = {
  list: CustomerList,
  create: CustomerCreate,
  edit: CustomerEdit,
  icon: CustomerIcon,
  recordRepresentation: (record: any) => `${record.name}`,
};

export default resource;
