import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import ResponsiveImage from "../../components/ui/images/ResponsiveImage";
import TwoColumnImageGrid from "../../components/ui/images/TwoColumnImageGrid";
import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
import ComponentCard from "../../admin/admin-component/common/ComponentCard";
import PageMeta from "../../admin/admin-component/common/PageMeta";

export default function Images() {
  return (
    <>
      <PageMeta
        title="Images | GNPC Scholarship Portal"
        description="Browse and manage images in the GNPC Scholarship Portal. View responsive images and image grids."
      />
      <PageBreadcrumb pageTitle="Images" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsive image">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Image in 2 Grid">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </>
  );
}
