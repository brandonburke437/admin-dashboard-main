import PageMeta from "../../admin/admin-component/common/PageMeta";
import AdminEcommerceMetrics from "../../ecommerce/AdminEcommerceMetrics";
import AdminMonthlyTarget from "../../ecommerce/AdminMonthlyTarget";
import MonthlyChart from "../../ecommerce/MonthlyChart";

export default function AdminDashboard() {
  return (
    <>
      <PageMeta
        title="Dashboard | Admin"
        description="Admin dashboard portal"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <AdminEcommerceMetrics />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <AdminMonthlyTarget />
        </div>
        <div className="col-span-12 xl:col-span-5.">
          <MonthlyChart />
        </div>

        <div className="col-span-12">
          <div className="mb-6 text-left"></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Recent Activities
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View the latest activities in the system.
            </p>
            {/* Placeholder for recent activities content */}
            <div className="mt-4 space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Activity 1: User X created a new application.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Activity 2: User Y updated their profile.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Activity 3: User Z submitted a feedback form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
