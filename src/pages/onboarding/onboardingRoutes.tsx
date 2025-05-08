import { Routes, Route, Navigate } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import EligibilityStep from "./EligibilityStep";
import ApplicationTypeStep from "./ApplicationTypeStep";
import UploadDocumentsStep from "./UploadDocumentsStep";
import FinalStep from "./FinalStep";

const OnboardingRoutes = () => {
  return (
   
      <Routes>
        {/* Default route for /onboarding */}
        <Route index element={<WelcomeScreen />} />

        {/* Child routes */}
        <Route path="eligibility" element={<EligibilityStep />} />
        <Route path="application-type" element={<ApplicationTypeStep />} />
        <Route path="upload-documents" element={<UploadDocumentsStep />} />
        <Route path="final" element={<FinalStep />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   
  );
};

export default OnboardingRoutes;
