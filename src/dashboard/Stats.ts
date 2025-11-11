const apiURL = import.meta.env.VITE_ROUTEAPI_URL || "http://localhost:8180";
import { toLocalDateTimeString } from "../logic/Date_Time";
import { subDays } from "date-fns";

export interface MonthlyStats {
  monthlydips: string;
  monthlyamount: string;
}

export interface LatestInfo {
  latestdip: string;
  dailydips: string;
  dailyamount: string;
}

// Fetch health status from the API
export async function getHealth() {
  try {
    const response = await fetch(`${apiURL}/health`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.status;
    }
    return "Unknown";
  } catch (err: unknown) {
    const msg = String(err).toLowerCase();
    // fetch throws a TypeError for network failures in browsers; also check message for "network"
    if (err instanceof TypeError || msg.includes("network")) {
      return "Down";
    }
    throw err;
  }
}

// Fetch monthly stats from the API
export async function getMonthlyStats(): Promise<MonthlyStats> {
  const auth = localStorage.getItem("auth");
  const { access_token } = auth ? JSON.parse(auth) : { access_token: "" };

  const response = await fetch(`${apiURL}/ui/monthlystats`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching monthly stats: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    monthlydips: data.monthly_dips,
    monthlyamount: data.monthly_amount,
  };
}

// Fetch latest info from the API
export async function getLatestInfo(): Promise<LatestInfo> {
  const auth = localStorage.getItem("auth");
  const { access_token } = auth ? JSON.parse(auth) : { access_token: "" };

  const response = await fetch(`${apiURL}/ui/latestinfo`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching monthly stats: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    latestdip: data.latest_dip,
    dailydips: data.daily_dips,
    dailyamount: data.daily_amount,
  };
}

// Get the date-time string for a day ago
export function aDayAgoDate(): string {
  return toLocalDateTimeString(subDays(new Date(), 1)) ?? "";
}
