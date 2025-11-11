import { useEffect, useState } from "react";
const apiURL = import.meta.env.VITE_ROUTEAPI_URL || "http://localhost:8180";

// Fetch API version from the API
export async function getAPIVersion() {
  try {
    const response = await fetch(`${apiURL}/?type=raw`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const ver = await response.text();
      // remove all double quotes and trim whitespace/newlines
      const cleaned = ver.replace(/"/g, "").trim();
      return cleaned;
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

// VersionBadge component to display portal and API versions
export const VersionBadge = () => {
  const portalVer = import.meta.env.VITE_APP_VERSION || "dev";
  const [apiVer, setApiVer] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchAPIVersion = async () => {
      try {
        const ver = await getAPIVersion();
        if (mounted) {
          setApiVer(ver);
        }
      } catch (err) {
        if (mounted) {
          console.error("Error fetching API version:", err);
          setApiVer("Error");
        }
      }
    };

    fetchAPIVersion();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <span style={{ fontSize: 12, opacity: 0.7 }}>
      UI Ver:{portalVer}
      <br />
      API Ver: {apiVer}
    </span>
  );
};
