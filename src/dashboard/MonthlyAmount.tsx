import DollarIcon from "@mui/icons-material/AttachMoney";
import { useTranslate } from "react-admin";

import CardWithIcon from "./CardWithIcon";

interface Props {
  value?: string;
}

// Component for displaying the monthly amount in the dashboard
const MonthlyAmount = (props: Props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/statements"
      icon={DollarIcon}
      title={translate("pos.dashboard.monthly_amount")}
      subtitle={value}
    />
  );
};

export default MonthlyAmount;
