import { useEffect } from "react";
import { useLocation } from "react-router";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-5L34NZZGZ1", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
