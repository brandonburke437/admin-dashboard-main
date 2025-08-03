import PageMeta from "../../admin/admin-component/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Sign Up | GNPC Scholarship Portal"
        description="Create a new account on the GNPC Scholarship Portal to start your scholarship application journey."
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
