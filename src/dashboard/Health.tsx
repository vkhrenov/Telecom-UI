import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { useTranslate } from "react-admin";

import CardWithIcon from "./CardWithIcon";

interface Props {
  value?: string;
}
const apiURL = import.meta.env.VITE_ROUTEAPI_URL || "http://localhost:8180";

// Component for displaying health status in the dashboard
const Health = (props: Props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      icon={MonitorHeartIcon}
      to={`${apiURL}/grafana`}
      title={translate("pos.dashboard.health")}
      subtitle={value}
      alert={value !== "healthy"}
    />
  );
};

export default Health;
