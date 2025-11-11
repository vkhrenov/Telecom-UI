import NumbersIcon from "@mui/icons-material/Numbers";
import { useTranslate } from "react-admin";

import CardWithIcon from "./CardWithIcon";

interface Props {
  value?: string;
}

// Component for displaying daily dips in the dashboard
const MonthlyDips = (props: Props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/statements"
      icon={NumbersIcon}
      title={translate("pos.dashboard.daily_dips")}
      subtitle={value}
    />
  );
};

export default MonthlyDips;
