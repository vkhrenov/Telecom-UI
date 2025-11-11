import EndpointIcon from "@mui/icons-material/DynamicFeed";

import EndpointList from "./EndpointList";
import EndpointCreate from "./EndpointCreate";
import EndpointEdit from "./EndpointEdit";

// Definition of the endpoint resource for the admin interface
const resource = {
  list: EndpointList,
  create: EndpointCreate,
  edit: EndpointEdit,
  icon: EndpointIcon,
  recordRepresentation: (record: any) => `${record.endpoint}`,
};

export default resource;
