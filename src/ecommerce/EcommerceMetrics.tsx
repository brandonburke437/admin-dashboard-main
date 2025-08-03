import { FileIcon, ListIcon, InfoIcon } from "../icons";
import { Link } from "react-router-dom";
import ComponentCard from "../admin/admin-component/common/ComponentCard";

export default function EcommerceMetrics() {
  return (
    <ComponentCard title="Quick Actions" className="mb-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 ">
        {/* <!-- Add Application Card Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-4">
            <FileIcon className="text-amber-500 size-6 dark:text-amber-400" />
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

        {/* <!-- View Applications Card --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-4">
            <ListIcon className="text-blue-500 size-6 dark:text-blue-400" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="mt-2 text-gray-800 text-title-xs dark:text-white/90">
                View applications
              </h4>
            </div>
            <Link
              to="/user-dashboard/basic-tables"
              className="mt-4 bg-black hover:bg-gray-600 hover:shadow-lg text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-center"
            >
              View Applications
            </Link>
          </div>
        </div>
        {/* <!-- View Requirements Card --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-4">
            <InfoIcon className="text-amber-600 size-6 dark:text-amber-400" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="mt-2  text-gray-800 text-title-xs dark:text-white/90">
                View Application Requirements
              </h4>
            </div>
            <Link
              to="/user-dashboard/app-requirements"
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-center hover:shadow-lg hover:bg-white hover:text-amber-500 hover:border-amber-500 border border-amber-500 dark:hover:bg-white/10 dark:hover:text-amber-500 dark:hover:border-amber-500"
            >
              View Requirements
            </Link>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
