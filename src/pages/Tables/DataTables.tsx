import DataTable from "../../components/tables/BasicTables/DataTable";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

export default function DataTables() {
  return (
    <>
      <PageMeta title="Applications" description="" />
      <PageBreadcrumb pageTitle="Your Applications" />
      <div className="space-y-6">
        <ComponentCard title="Your Applications">
          <DataTable />
        </ComponentCard>
      </div>
    </>
  );
}
