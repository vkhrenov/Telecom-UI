import React, { useMemo, useEffect, useState, Suspense } from "react";
import { Translate, useGetList } from "react-admin";
import { Skeleton, Card, CardHeader, CardContent } from "@mui/material";

import Welcome from "./Welcome";
import MonthlyDips from "./MonthlyDips";
import DailyDips from "./DailyDips";
import MonthlyAmount from "./MonthlyAmount";
import LastDip from "./LastDip";
import Health from "./Health";
import { getHealth, getMonthlyStats, getLatestInfo } from "./Stats";

import { subDays, startOfDay, subMinutes } from "date-fns";
import { StatsPerTime } from "../types";
import { toLocalDateTimeString } from "../logic/Date_Time";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

interface MonthlyStats {
  monthlydips?: string;
  monthlyamount?: string;
}

const Spacer = () => <span style={{ width: "1em" }} />;
//const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const MonthlyDipChart = React.lazy(() => import("./MonthlyDipChart"));
const DailyDipChart = React.lazy(() => import("./DailyDipChart"));

// Main component for rendering the dashboard view
const Dashboard = () => {
  const aMonthAgo = useMemo(
    () => toLocalDateTimeString(subDays(startOfDay(new Date()), 30)),
    [],
  );

  const [health, setHealth] = useState<string | undefined>(undefined);
  const [lastcheckeddip, setLastCheckedDip] = useState<string | undefined>(
    undefined,
  );
  const [dailydips, setDailyDips] = useState<string | undefined>(undefined);
  // version key to force remount/redraw of DailyDipChart when dipsper5 changes
  const [ddVersion, setDdVersion] = useState(0);

  // 5-minute tick to force re-render / recompute values
  const [tick5, setTick5] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setTick5(Date.now()), 1 * 60_000); // every 5 minutes
    return () => clearInterval(id);
  }, []);

  // unified poll: fetch latest info and health every 60 seconds
  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      try {
        // run both in parallel and handle results independently
        const [latestRes, healthRes] = await Promise.allSettled([
          getLatestInfo(),
          getHealth(),
        ]);

        if (!mounted) return;

        if (latestRes.status === "fulfilled") {
          const data = latestRes.value;
          setLastCheckedDip(data?.latestdip);
          setDailyDips(data?.dailydips?.toString());
        }

        if (healthRes.status === "fulfilled") {
          const h = healthRes.value;
          setHealth(typeof h === "string" ? h : String(h));
        }
      } catch (err) {
        if (!mounted) return;
        console.error("Poll error:", err);
      }
    };

    fetchAll(); // initial
    const id = setInterval(fetchAll, 60_000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const [aggregation, setAggregation] = useState<MonthlyStats>({});

  // fetch monthly stats on mount
  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const data = await getMonthlyStats();
        if (!mounted) return;
        setAggregation({
          monthlydips: data.monthlydips,
          monthlyamount: data.monthlyamount,
        });
      } catch (err) {
        if (!mounted) return;
        const msg = err instanceof Error ? err.message : String(err);
        setAggregation({ monthlydips: msg, monthlyamount: msg });
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, [aMonthAgo]);

  // fetch monthly dips per day for the past month
  const { data: monthlydipsperday } = useGetList<StatsPerTime>(
    "monthlystatsperday",
    {
      filter: { from_date: aMonthAgo },
      pagination: { page: 1, perPage: 50 },
    },
  );
  // compute from_date for dips per 5 minutes (24 hours ago)
  const fromDateForDips = useMemo(() => {
    const now = new Date();
    now.setSeconds(0, 0);
    now.setMinutes(Math.floor(now.getMinutes() / 5) * 5);
    const dayAgo = subMinutes(now, 24 * 60); // or use subDays(now, 1)
    return toLocalDateTimeString(dayAgo);
  }, [tick5]); // recompute every 5 minutes when tick5 changes

  // pass a memoized filter object so its identity is stable
  const dipsFilter = useMemo(
    () => ({ from_date: fromDateForDips }),
    [fromDateForDips],
  );

  // fetch dips per 5 minutes for the past day
  const { data: dipsper5 } = useGetList<StatsPerTime>("dailystatsper5min", {
    filter: dipsFilter,
    pagination: { page: 1, perPage: 288 },
  });

  // force remount of DailyDipChart when dipsper5 data arrives/changes
  useEffect(() => {
    if (!dipsper5) return;
    const key = Date.now();
    setDdVersion(key);
  }, [dipsper5]);

  const { monthlydips, monthlyamount } = aggregation;

  return (
    <>
      <Welcome />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <LastDip value={lastcheckeddip} />
            <Spacer />
            <DailyDips value={dailydips} />
          </div>
          <div style={styles.singleCol}>
            <Card>
              <CardHeader
                title={<Translate i18nKey="pos.dashboard.day_history" />}
              />
              <CardContent>
                <Suspense fallback={<Skeleton height={300} />}>
                  <DailyDipChart key={ddVersion} dipsper5={dipsper5} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <Health value={health} />
            <Spacer />
            <MonthlyDips value={monthlydips} />
            <Spacer />
            <MonthlyAmount value={monthlyamount} />
          </div>
          <div style={styles.singleCol}>
            <Card>
              <CardHeader
                title={<Translate i18nKey="pos.dashboard.month_history" />}
              />
              <CardContent>
                <Suspense fallback={<Skeleton height={300} />}>
                  <MonthlyDipChart monthlydipsperday={monthlydipsperday} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
