import PageMeta from "../../admin/admin-component/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In | GNPC Scholarship Portal"
        description="Sign in to your GNPC Scholarship Portal account to access your dashboard, applications, and profile."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
