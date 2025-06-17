import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./admin/layout/AppLayout";
import ApplicantAppLayout from "./applicant/layout/AppLayout";
import { ScrollToTop } from "./admin/admin-component/common/ScrollToTop";
import { OnboardingProvider } from "./context/OnboardingContext";
import DataTables from "./pages/Tables/DataTables";
import { Toaster } from "react-hot-toast";
import UserTables from "./pages/Tables/UserTables";
import AdminDashboard from "./admin/Dashboard/AdminDash";
import UserDash from "./applicant/Dashboard/UserDash";
import AppRequirements from "./applicant/Forms/AppRequirements";

export default function App() {
  return (
    <OnboardingProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Layout: Make SignIn the default route */}
          <Route index element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/dashboard" element={<AdminDashboard />} />

            {/* Applicant Dashboard */}
            <Route element={<ApplicantAppLayout />}>
              <Route index path="/user-dashboard" element={<UserDash />} />{" "}
            </Route>

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/app-requirements" element={<AppRequirements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/data-tables" element={<DataTables />} />
            <Route path="/user-tables" element={<UserTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
          {/* <OnboardingRoutes /> */}
        </Routes>
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />
    </OnboardingProvider>
  );
}
