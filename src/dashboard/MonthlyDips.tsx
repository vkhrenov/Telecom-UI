import NumbersIcon from "@mui/icons-material/Numbers";
import { useTranslate } from "react-admin";

import CardWithIcon from "./CardWithIcon";

interface Props {
  value?: string;
}

// Component for displaying monthly dips in the dashboard
const MonthlyDips = (props: Props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/statements"
      icon={NumbersIcon}
      title={translate("pos.dashboard.monthly_dips")}
      subtitle={value}
    />
  );
};

export default MonthlyDips;
