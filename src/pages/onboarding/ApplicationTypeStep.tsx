import React, { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import { useNavigate } from "react-router-dom";

const ApplicationTypeStep = () => {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState("");
  const [level, setLevel] = useState("UG");
  const [duration, setDuration] = useState("");
  const [admissionLetter, setAdmissionLetter] = useState<File | null>(null);

  const handleAdmissionLetterUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setAdmissionLetter(file);
        console.log("Admission Letter uploaded:", file.name);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  const handleProceed = () => {
    navigate("/onboarding/upload-documents");
  };

  const handleReturn = (): void => {
    console.log("Returning to the previous step...");
    navigate("/onboarding/eligibility");
  };

  return (
    <OnboardingLayout currentStep={3} totalSteps={5}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ComponentCard title="Application Type Information">
          {/* Program Name */}
          <div>
            <Label>Program Name</Label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              placeholder="Enter Program Name"
            />
          </div>

          {/* Level */}
          <div>
            <Label>Level</Label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="UG">Undergraduate</option>
              <option value="PG">Postgraduate</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <Label>Duration</Label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="">Select Duration</option>
              <option value="1 year">1 Year</option>
              <option value="2 years">2 Years</option>
            </select>
          </div>

          {/* Admission Letter Upload */}
          <div>
            <Label>Admission Letter Upload (PDF)</Label>
            <FileInput onChange={handleAdmissionLetterUpload} />
            {admissionLetter && (
              <p className="mt-2 text-sm text-gray-600">
                Uploaded File: {admissionLetter.name}
              </p>
            )}
          </div>
        </ComponentCard>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleReturn}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Return
          </button>
          <button
            onClick={handleProceed}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Proceed
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ApplicationTypeStep;
