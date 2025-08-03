import { useNavigate } from "react-router-dom";
import PageMeta from "../../admin/admin-component/common/PageMeta";
import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import { FileIcon } from "../../icons";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageMeta
        title="New Application"
        description="Create a new application"
      />
      <PageBreadcrumb pageTitle="GNPC Scholarship Application" />
      <div className="flex items-center justify-center bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 min-h-[60vh]">
        <div className="w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] shadow-xl p-10 flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <FileIcon className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="mb-2 font-bold text-gray-800 text-3xl dark:text-white/90 text-center">
            Welcome to Your Scholarship Journey
          </h1>
          <p className="mb-6 text-base text-gray-600 dark:text-gray-300 text-center max-w-lg">
            We're excited to help you begin your application for the GNPC
            Foundation Local Scholarship. This onboarding process will guide you
            step-by-step. Click below to get started!
          </p>
          <button
            onClick={() => navigate("/user-dashboard/onboarding/eligibility")}
            className="flex items-center gap-2 mt-4 rounded-lg bg-amber-500 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-amber-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400"
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
