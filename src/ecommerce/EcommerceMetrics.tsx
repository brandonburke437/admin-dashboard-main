import { Link } from "react-router-dom";
import ComponentCard from "../admin/admin-component/common/ComponentCard";

export default function EcommerceMetrics() {
  return (
    <ComponentCard title="Quick Actions" className="mb-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 ">
        {/* <!-- Add Application Card Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-4">
            {/* Inline SVG for Plus Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-800 size-6 dark:text-white/90"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="mt-2  text-gray-800 text-title-xs dark:text-white/90">
                Start a new application
              </h4>
            </div>
            <Link
              to="/user-dashboard/onboarding"
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-center hover:shadow-lg hover:bg-white hover:text-amber-500 hover:border-amber-500 border border-amber-500 dark:hover:bg-white/10 dark:hover:text-amber-500 dark:hover:border-amber-500"
            >
              Apply Now
            </Link>
          </div>
        </div>
        {/* <!-- Add Application Card End --> */}

        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-4">
            {/* Inline SVG for File Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-800 size-6 dark:text-white/90"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="mt-2 text-gray-800 text-title-xs dark:text-white/90">
                View applications
              </h4>
            </div>
            <Link
              to="/user-dashboard/data-tables"
              className="mt-4 bg-black hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-center"
            >
              View Applications
            </Link>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-4">
            {/* Inline SVG for Plus Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-800 size-6 dark:text-white/90"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="mt-2  text-gray-800 text-title-xs dark:text-white/90">
                View Application Requirements
              </h4>
            </div>
            <Link
              to="/user-dashboard/app-requirements"
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-center hover:shadow-lg hover:bg-white hover:text-amber-500 hover:border-amber-500 border border-amber-500 dark:hover:bg-white/10 dark:hover:text-amber-500 dark:hover:border-amber-500"
            >
              View Requirements
            </Link>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
