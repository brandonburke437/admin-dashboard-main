import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

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
