import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import ComponentCard from "../../admin/admin-component/common/ComponentCard";
import PageMeta from "../../admin/admin-component/common/PageMeta";
import BasicTableOne from "../../applicant/Tables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Applications | GNPC Scholarship Portal"
        description="Start a new scholarship application or view your existing applications on the GNPC Scholarship Portal."
      />
      <PageBreadcrumb pageTitle="Applications" />
      <div className="space-y-6">
        {/* New Application Card */}
        <ComponentCard>
          <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 flex flex-col items-center justify-center shadow-lg w-full">
            <h2 className="text-2xl font-bold text-amber-600 mb-2 text-center">
              Start a New Application
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-xl">
              Ready to take the next step? Begin your scholarship application
              journey now. Click below to get started and follow the guided
              process to complete your application.
            </p>
            <button
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-lg shadow transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400"
              onClick={() =>
                window.location.assign("/user-dashboard/onboarding")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Application
            </button>
          </div>
        </ComponentCard>
        <ComponentCard title="My applications">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
