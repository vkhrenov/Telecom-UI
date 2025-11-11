import {
  Show,
  TabbedShowLayout,
  useDefaultTitle,
  useShowContext,
  ListBase,
  DataTable,
  ExportButton,
  TopToolbar,
  useRecordContext,
  Pagination,
} from "react-admin";
import { Box, Card } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";

import FullNameField from "./FullNameField";

import { StatementShowAside } from "./StatementShowAside";
import { Statement } from "../types";

const Column = DataTable.Col<Statement>;
const ColumnNumber = DataTable.NumberCol<Statement>;

// Component for rendering the statement detail view
const StatementShow = () => {
  const location = useLocation();

  // If the URL ends with .../show (no tab), synchronously redirect so Tabs mounts with a valid value
  const path = location.pathname.replace(/\/+$/, "");
  if (path.endsWith("/show")) {
    return <Navigate to={`${path}/mtd_summary`} replace />;
  }

  return (
    <Show title={<StatementTitle />} aside={<StatementShowAside />}>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab
          label="resources.statements.tabs.dtd_summary"
          icon={<CalendarTodayIcon />}
          iconPosition="start"
          value="dtd_summary"
          path="dtd_summary"
        >
          <StatementSummary summaryType="dtd" />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab
          label="resources.statements.tabs.ld_summary"
          icon={<TodayIcon />}
          iconPosition="start"
          path="ld_summary"
          value="ld_summary"
        >
          <StatementSummary summaryType="ld" />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab
          label="resources.statements.tabs.mtd_summary"
          icon={<DateRangeIcon />}
          iconPosition="start"
          path="mtd_summary"
          value="mtd_summary"
        >
          <StatementSummary summaryType="mtd" />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab
          label="resources.statements.tabs.lastm_summary"
          icon={<CalendarMonthIcon />}
          iconPosition="start"
          path="lastm_summary"
          value="lastm_summary"
        >
          <StatementSummary summaryType="lastm" />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab
          label="resources.statements.tabs.custom_summary"
          icon={<EditCalendarIcon />}
          iconPosition="start"
          path="custom_summary"
          value="custom_summary"
        >
          <CustomSummaryTabContent />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};

const StatementTitle = () => {
  const appTitle = useDefaultTitle();
  const { defaultTitle } = useShowContext();
  return (
    <>
      <title>{`${appTitle} - ${defaultTitle}`}</title>
      <FullNameField source="name" size="32" sx={{ margin: "5px 0" }} />
    </>
  );
};

const StatementSummary = (props: { summaryType: string }) => {
  const { summaryType } = props;
  const record = useRecordContext<Statement>();
  if (!record) return null;
  return (
    <ListBase
      resource="summaries"
      filter={{ summaryType, id: record.id }}
      perPage={25}
    >
      <TopToolbar>
        <ExportButton />
      </TopToolbar>
      <Card>
        <DataTable bulkActionButtons={false}>
          <Column source="endpoint" />
          <Column source="description" />
          <ColumnNumber source="dips" />
          <ColumnNumber source="amount" />
        </DataTable>
      </Card>
      <Pagination />
    </ListBase>
  );
};

// Helper function to convert Date to local datetime input value string
const toLocalDatetimeInputValue = (d: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
};

// Component for rendering the custom summary tab content
const CustomSummaryTabContent: React.FC = () => {
  const record = useRecordContext<Statement>();
  // default to today at 00:00 local time
  const defaultDate = (() => {
    const dt = new Date();
    dt.setHours(0, 0, 0, 0);
    return toLocalDatetimeInputValue(dt);
  })();

  const [fromdate, setFromDate] = useState<string>(defaultDate);
  const [todate, setToDate] = useState<string>(defaultDate);

  if (!record) return null;

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          gap: 1,
          alignItems: "center",
        }}
      >
        <TextField
          label="From"
          type="datetime-local"
          value={fromdate}
          onChange={(e) => setFromDate(e.target.value)}
          sx={{
            mb: { xs: 1, sm: 0 },
            minWidth: 160,
            flex: "1 1 160px",
            maxWidth: 250,
          }}
        />
        <TextField
          label="To"
          type="datetime-local"
          value={todate}
          onChange={(e) => setToDate(e.target.value)}
          sx={{
            mb: { xs: 1, sm: 0 },
            minWidth: 160,
            flex: "1 1 160px",
            maxWidth: 250,
          }}
        />
      </Box>
      {fromdate && todate ? (
        <StatementSummary summaryType={fromdate + "|" + todate} />
      ) : null}
    </>
  );
};

export default StatementShow;
