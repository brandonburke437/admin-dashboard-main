import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import ComponentCard from "../../admin/admin-component/common/ComponentCard";
import PageMeta from "../../admin/admin-component/common/PageMeta";
import UserTable from "../../admin/admin-component/tables/BasicTables/UsersTable";

export default function UserTables() {
  return (
    <>
      <PageMeta
        title="User Accounts | GNPC Scholarship Portal"
        description="Manage user accounts and profiles in the GNPC Scholarship Portal. View, edit, and administer user access."
      />
      <PageBreadcrumb pageTitle="User Accounts" />
      <div className="space-y-6">
        <ComponentCard title="Users Profiles">
          <UserTable />
        </ComponentCard>
      </div>
    </>
  );
}
