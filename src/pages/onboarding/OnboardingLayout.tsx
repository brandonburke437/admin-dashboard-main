import React from "react";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const OnboardingLayout = ({
  children,
  currentStep,
  totalSteps,
}: OnboardingLayoutProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-gray-50">
      {/* Responsive Progress Tracker */}
      <div className="flex flex-wrap items-center justify-center mb-8 gap-2 sm:gap-4 w-full max-w-2xl">
        {steps.map((step) => (
          <React.Fragment key={step}>
            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step <= currentStep
                    ? "bg-amber-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } text-sm font-semibold`}
              >
                {step}
              </div>
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
      {children}
    </div>
  );
};

export default OnboardingLayout;
