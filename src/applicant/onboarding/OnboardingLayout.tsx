import React from "react";
import { useNavigate } from "react-router-dom";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const stepRoutes = [
  "/user-dashboard/onboarding/eligibility",
  "/user-dashboard/onboarding/emergency-contact",
  "/user-dashboard/onboarding/educational-history",
  "/user-dashboard/onboarding/applied-program",
  "/user-dashboard/onboarding/personal-statement",
  "/user-dashboard/onboarding/final",
];

const OnboardingLayout = ({
  children,
  currentStep,
  totalSteps,
}: OnboardingLayoutProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col items-center justify-start py-12 px-4 bg-gray-50">
      {/* Responsive Progress Tracker */}
      <div className="flex flex-wrap items-center justify-center mb-8 gap-2 sm:gap-4 w-full max-w-2xl">
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => navigate(stepRoutes[idx])}
                className={`flex items-center justify-center w-8 h-8 rounded-full focus:outline-none transition-colors duration-150 border-2 ${
                  step === currentStep
                    ? "bg-amber-500 text-white border-amber-500"
                    : step < currentStep
                    ? "bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200"
                    : "bg-gray-300 text-gray-700 border-gray-300 hover:bg-gray-400"
                } text-sm font-semibold`}
                aria-current={step === currentStep ? "step" : undefined}
                aria-label={`Go to step ${step}`}
              >
                {step}
              </button>
            </div>
            {step !== totalSteps && (
              <div
                className="hidden sm:block w-8 h-1 bg-gray-300"
                aria-hidden="true"
              />
            )}
            {step !== totalSteps && (
              <div
                className="block sm:hidden w-2 h-1 bg-gray-300"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="w-full max-w-5xl">{children}</div>
    </div>
  );
};

export default OnboardingLayout;
