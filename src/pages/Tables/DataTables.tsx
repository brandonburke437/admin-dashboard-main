import DataTable from "../../admin/admin-component/tables/BasicTables/DataTable";
import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import ComponentCard from "../../admin/admin-component/common/ComponentCard";
import PageMeta from "../../admin/admin-component/common/PageMeta";

export default function DataTables() {
  return (
    <>
      <PageMeta
        title="Applications | GNPC Scholarship Portal"
        description="View and manage all user applications in the GNPC Scholarship Portal. Filter, search, and take action on submitted, pending, approved, or rejected applications."
      />
      <PageBreadcrumb pageTitle="My Applications" />
      <div className="space-y-6">
        <ComponentCard title="Quick Actions" className="mb-6">
          <DataTable />
        </ComponentCard>
      </div>
    </>
  );
}
