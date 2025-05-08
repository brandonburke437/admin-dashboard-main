import React, { createContext, useContext, useState } from "react";

interface OnboardingData {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  programName: string;
  level: string;
  duration: string;
  admissionLetter: string;
  waecCertificate: string;
  testimonial: string;
  birthCertificate: string;
  passportPicture: string;
}

interface OnboardingContextProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    programName: "",
    level: "",
    duration: "",
    admissionLetter: "",
    waecCertificate: "",
    testimonial: "",
    birthCertificate: "",
    passportPicture: "",
  });

  return (
    <OnboardingContext.Provider value={{ data, setData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextProps => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};