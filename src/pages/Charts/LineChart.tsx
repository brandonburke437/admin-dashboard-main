import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import ComponentCard from "../../admin/admin-component/common/ComponentCard";
import LineChartOne from "../../components/charts/line/LineChartOne";
import PageMeta from "../../admin/admin-component/common/PageMeta";

export default function LineChart() {
  return (
    <>
      <PageMeta
        title="Line Chart | GNPC Scholarship Portal"
        description="View line chart visualizations in the GNPC Scholarship Portal. Analyze trends and data insights."
      />
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </>
  );
}
