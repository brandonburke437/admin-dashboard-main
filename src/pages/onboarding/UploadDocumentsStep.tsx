import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";
import ComponentCard from "../../components/common/ComponentCard";
import FileInput from "../../components/form/input/FileInput";
import Label from "../../components/form/Label";

const UploadDocumentsStep: React.FC = () => {
  const [level, setLevel] = useState("UG");
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/onboarding/final");
  };

  const handleReturn = () => {
    navigate("/onboarding/application-type");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, title: string) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`${title} uploaded:`, file.name);
    }
  };

  return (
    <OnboardingLayout currentStep={4} totalSteps={5}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ComponentCard title="Upload Required Documents">
          <p className="mb-4 text-gray-600">
            Please upload the required documents based on your selected level.
          </p>

          {/* Level Selection */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Selected Level: {level === "UG" ? "Undergraduate" : "Postgraduate"}
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="UG">Undergraduate</option>
              <option value="PG">Postgraduate</option>
            </select>
          </div>

          {/* Conditional File Uploads */}
          {level === "UG" && (
            <div className="space-y-6">
              <div>
                <Label>WAEC Certificate</Label>
                <FileInput onChange={(e) => handleFileChange(e, "WAEC Certificate")} />
              </div>
              <div>
                <Label>Testimonial</Label>
                <FileInput onChange={(e) => handleFileChange(e, "Testimonial")} />
              </div>
              <div>
                <Label>Birth Certificate/Ghana Card</Label>
                <FileInput onChange={(e) => handleFileChange(e, "Birth Certificate/Ghana Card")} />
              </div>
              <div>
                <Label>Passport Picture</Label>
                <FileInput onChange={(e) => handleFileChange(e, "Passport Picture")} />
              </div>
            </div>
          )}

          {level === "PG" && (
            <div className="space-y-6">
              <div>
                <Label>First Degree Certificate</Label>
                <FileInput onChange={(e) => handleFileChange(e, "First Degree Certificate")} />
              </div>
              <div>
                <Label>Curriculum Vitae (CV)</Label>
                <FileInput onChange={(e) => handleFileChange(e, "Curriculum Vitae (CV)")} />
              </div>
              <div>
                <Label>Letters of Recommendation (2)</Label>
                <FileInput onChange={(e) => handleFileChange(e, "Letters of Recommendation (2)")} />
              </div>
              <div>
                <Label>National Service Certificate</Label>
                <FileInput onChange={(e) => handleFileChange(e, "National Service Certificate")} />
              </div>
              <div>
                <Label>Passport Picture</Label>
                <FileInput onChange={(e) => handleFileChange(e, "Passport Picture")} />
              </div>
            </div>
          )}
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

export default UploadDocumentsStep;
