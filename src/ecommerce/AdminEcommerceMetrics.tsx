import { FileIcon, CheckCircleIcon, AlertIcon, CloseIcon } from "../icons";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchApplications, Application } from "../api/applicationsApi";

export default function AdminEcommerceMetrics() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    submitted: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchApplications().then((apps: Application[]) => {
      const submitted = apps.filter(
        (item) => item.status?.toLowerCase() === "submitted"
      ).length;
      const pending = apps.filter(
        (item) =>
          item.status?.toLowerCase() === "under review" ||
          item.status?.toLowerCase() === "pending"
      ).length;
      const approved = apps.filter(
        (item) => item.status?.toLowerCase() === "approved"
      ).length;
      const rejected = apps.filter(
        (item) => item.status?.toLowerCase() === "rejected"
      ).length;
      setCounts({ submitted, pending, approved, rejected });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-2">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FileIcon className="text-blue-500 size-6 dark:text-blue-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Submitted Applications
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {counts.submitted}
            </h4>
          </div>
          <button
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            onClick={() => navigate("/dashboard/data-tables?status=submitted")}
          >
            View
          </button>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <AlertIcon className="text-yellow-500 size-6 dark:text-yellow-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Pending Applications
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {counts.pending}
            </h4>
          </div>
          <button
            className="mt-4 bg-black hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            onClick={() => navigate("/dashboard/data-tables?status=pending")}
          >
            View
          </button>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CheckCircleIcon className="text-green-500 size-6 dark:text-green-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Approved Applications
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {counts.approved}
            </h4>
          </div>
          <button
            className="mt-4 bg-black hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            onClick={() => navigate("/dashboard/data-tables?status=approved")}
          >
            View
          </button>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CloseIcon className="text-red-500 size-6 dark:text-red-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Rejected Applications
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {counts.rejected}
            </h4>
          </div>
          <button
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            onClick={() => navigate("/dashboard/data-tables?status=rejected")}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
