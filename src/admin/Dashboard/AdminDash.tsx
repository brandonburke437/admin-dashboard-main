import { useEffect, useState } from "react";
import PageMeta from "../../admin/admin-component/common/PageMeta";
import AdminEcommerceMetrics from "../../ecommerce/AdminEcommerceMetrics";
import AdminMonthlyTarget from "../../ecommerce/AdminMonthlyTarget";
import MonthlyChart from "../../ecommerce/MonthlyChart";
import { fetchRecentApplications } from "../../api/admin";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token"); // Adjust if you use context

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRecentApplications(token!);
        setApplications(data.slice(0, 5)); // show latest 5
      } catch (err) {
        console.error("Failed to fetch recent applications:", err);
      }
    };

    loadData();
  }, [token]);

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
              Recent Applications
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Fetched from your live backend (Prisma/PostgreSQL).
            </p>

            <div className="mt-4 space-y-4">
              {applications.length === 0 ? (
                <p className="text-gray-500">No recent applications yet.</p>
              ) : (
                applications.map((app: any, idx) => (
                  <p key={idx} className="text-gray-700 dark:text-gray-300">
                    {app.fullName} ({app.applicantType}) applied to{" "}
                    {app.appliedInstitution}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
