import { Routes, Route, Navigate } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import EligibilityStep from "./EligibilityStep";
import EmergencyContact from "./EmergencyContactInfo";
import EducationalHistoryStep from "./EducationalHistory";
import FinalStep from "./FinalStep";
import AppliedProgram from "./AppliedProgram";
import PersonalStatement from "./PersonalStatement";

const OnboardingRoutes = () => {
  return (
    <Routes>
      {/* Default route for /onboarding */}
      <Route index element={<WelcomeScreen />} />

      {/* Child routes */}
      <Route path="eligibility" element={<EligibilityStep />} />
      <Route path="emergency-contact" element={<EmergencyContact />} />
      <Route path="educational-history" element={<EducationalHistoryStep />} />
      <Route path="personal-statement" element={<PersonalStatement />} />
      <Route path="applied-program" element={<AppliedProgram />} />
      <Route path="final" element={<FinalStep />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default OnboardingRoutes;
