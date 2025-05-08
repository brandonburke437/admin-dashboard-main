import React from "react";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const OnboardingLayout = ({ children, currentStep, totalSteps }: OnboardingLayoutProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-gray-50">
      {/* Progress Tracker */}
      <div className="flex items-center justify-center mb-8 space-x-4">
        {steps.map((step) => (
          <div key={step} className="flex items-center space-x-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step <= currentStep ? "bg-amber-500 text-white" : "bg-gray-300 text-gray-700"
              } text-sm font-semibold`}
            >
              {step}
            </div>
            {step !== totalSteps && <div className="w-8 h-1 bg-gray-300" />}
          </div>
        ))}
      </div>

     
      
        {children}
      
    </div>
  );
};

export default OnboardingLayout;
