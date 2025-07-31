import { useEffect, useState } from "react";
import { fetchUserApplications } from "../api/user";
import { ScholarshipApplication } from "../types/applications"; // ⬅️ import your type

export default function UserApplicationStats() {
  const [applications, setApplications] = useState<ScholarshipApplication[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadApps = async () => {
      try {
        const data = await fetchUserApplications(token!);
        setApplications(data);
      } catch (err) {
        console.error("❌ Error fetching apps", err);
      }
    };

    loadApps();
  }, [token]);

  const total = applications.length;
  const latestStatus = applications[0]?.status ?? "None submitted"; // ✅ No more error

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
        Your Application Stats
      </h3>
      <p className="text-gray-600 dark:text-white/80">
        ✅ <strong>Total Applications:</strong> {total}
      </p>
      <p className="text-gray-600 dark:text-white/80">
        📝 <strong>Latest Status:</strong> {latestStatus}
      </p>
    </div>
  );
}
