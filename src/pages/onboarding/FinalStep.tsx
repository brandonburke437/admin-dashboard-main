import React, { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import OnboardingLayout from "./OnboardingLayout";
import { useNavigate } from "react-router-dom";

const FinalStep: React.FC = () => {
  const [declarationName, setDeclarationName] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isConfirmed && declarationName.trim()) {
      alert("Application submitted successfully!");
      // You can add your submission logic here
    }
  };

  const handleReturn = () => {
    navigate("/onboarding/personal-statement");
  };

  return (
    <OnboardingLayout currentStep={6} totalSteps={6}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ComponentCard title="Declaration">
          <div className="mb-4 text-sm text-gray-700">
            <p>
              Misrepresentation in any material form renders the application
              null and void. Any award made based on misrepresentation shall be
              withdrawn or refunded by the applicant, and he or she may be
              prosecuted.
            </p>
            <br />
            <p>
              By signing (typing your legal name) in the space below you are
              certifying that all the information is correct and that you are
              the person completing this application and you consent to any
              background checks that may be required.
            </p>
            <br />
            <p>
              {declarationName || "(Name)"} agrees to complete the academic
              results consent form if awarded, giving the Foundation the mandate
              to request for terminal results / transcript from the institution
              of study. {declarationName || "(Name)"} agrees to abide by the
              award rules and regulations.
            </p>
          </div>
          <Label>Type your legal name</Label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            value={declarationName}
            onChange={(e) => setDeclarationName(e.target.value)}
            placeholder="Enter your legal name"
          />
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              id="confirm"
              className="w-5 h-5"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
            <label htmlFor="confirm" className="text-gray-700">
              I confirm that the information provided is accurate and I agree to
              the declaration above.
            </label>
          </div>
        </ComponentCard>
        <div className="flex justify-between">
          <button
            onClick={handleReturn}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Return
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isConfirmed || !declarationName.trim()}
            className={`bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ${
              !isConfirmed || !declarationName.trim()
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default FinalStep;
