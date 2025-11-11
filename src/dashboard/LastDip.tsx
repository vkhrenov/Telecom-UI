import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTranslate } from "react-admin";

import CardWithIcon from "./CardWithIcon";

interface Props {
  value?: string;
}

// Component for displaying the last dip time in the dashboard
const LastDip = (props: Props) => {
  const { value } = props;
  const translate = useTranslate();

  // alert when value is older than 10 minutes
  const isStale = (() => {
    if (!value) return false;
    const d = new Date(value);
    if (isNaN(d.getTime())) return false;
    return Date.now() - d.getTime() > 10 * 60 * 1000;
  })();

  return (
    <CardWithIcon
      to="/statements"
      icon={AccessTimeIcon}
      title={translate("pos.dashboard.last_dip")}
      subtitle={value}
      alert={isStale}
    />
  );
};

export default LastDip;
