import DataTable from "../../admin/admin-component/tables/BasicTables/DataTable";
import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import ComponentCard from "../../admin/admin-component/common/ComponentCard";
import PageMeta from "../../admin/admin-component/common/PageMeta";

export default function DataTables() {
  return (
    <>
      <PageMeta title="Applications" description="" />
      <PageBreadcrumb pageTitle="My Applications" />
      <div className="space-y-6">
        <ComponentCard title="Quick Actions" className="mb-6">
          <DataTable />
        </ComponentCard>
      </div>
    </>
  );
}
