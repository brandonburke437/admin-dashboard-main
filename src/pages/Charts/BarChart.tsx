import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import ComponentCard from "../../admin/admin-component/common/ComponentCard";
import BarChartOne from "../../components/charts/bar/BarChartOne";
import PageMeta from "../../admin/admin-component/common/PageMeta";

export default function BarChart() {
  return (
    <div>
      <PageMeta
        title="Bar Chart | GNPC Scholarship Portal"
        description="View bar chart visualizations in the GNPC Scholarship Portal. Compare data and categories."
      />
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
