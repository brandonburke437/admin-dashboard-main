import { useNavigate } from "react-router-dom";
import PageMeta from "../../admin/admin-component/common/PageMeta";
import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageMeta
        title="New Application"
        description="Create a new application"
      />
      <PageBreadcrumb pageTitle="GNPC Scholarship Application" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Welcome
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Welcome to the Onboarding Process! Lets get started with your
            application
          </p>
          <button
            onClick={() => navigate("/user-dashboard/onboarding/eligibility")}
            className="mt-6 rounded bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
