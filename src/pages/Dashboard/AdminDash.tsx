import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import DataTable from "../../components/tables/BasicTables/DataTable";
import PageMeta from "../../components/common/PageMeta";
import AdminEcommerceMetrics from "../../components/ecommerce/AdminEcommerceMetrics";

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
          <MonthlyTarget />
        </div>
        <div className="col-span-12">
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
            <div className="mb-6 text-left">
              <h3 className="mb-2 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                Applications Table
              </h3>
            </div>
            <DataTable />
          </div>
        </div>
      </div>
    </>
  );
}
