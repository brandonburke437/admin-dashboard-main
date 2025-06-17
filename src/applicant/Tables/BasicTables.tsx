import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import ComponentCard from "../../admin/admin-component/common/ComponentCard";
import PageMeta from "../../admin/admin-component/common/PageMeta";
import BasicTableOne from "../../admin/admin-component/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta title="Applications " description="ii" />
      <PageBreadcrumb pageTitle="Applications" />
      <div className="space-y-6">
        <ComponentCard title="My applications">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
