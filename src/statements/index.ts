import StatementIcon from "@mui/icons-material/MonetizationOn";
import StatementList from "./StatementList";
import StatementShow from "./StatementShow";

// Definition of the statement resource for the admin interface
const resource = {
  list: StatementList,
  show: StatementShow,
  icon: StatementIcon,
  recordRepresentation: (record: any) => {
    const amount = Number(record?.mtd_amount);
    const formatted = Number.isFinite(amount) ? amount.toFixed(3) : "0.000";
    return `${record?.mtd_count ?? ""} / $${formatted}`;
  },
};

export default resource;
