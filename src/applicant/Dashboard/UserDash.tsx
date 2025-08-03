import EcommerceMetrics from "../../ecommerce/EcommerceMetrics";
import UserApplicationStats from "../../ecommerce/UserApplicationStats";
import PageMeta from "../applicant-components/common/PageMeta";

export default function UserDash() {
  return (
    <>
      <PageMeta title="My Dashboard" description="User dashboard portal" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <UserApplicationStats />

          <EcommerceMetrics />
        </div>
      </div>
    </>
  );
}
