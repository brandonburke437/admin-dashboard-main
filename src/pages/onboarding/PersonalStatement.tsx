import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import { useNavigate } from "react-router-dom";

const PersonalStatement = () => {
  const [personalStatement, setPersonalStatement] = useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    // Save or validate the statement if needed
    navigate("/onboarding/final");
  };

  const handleReturn = () => {
    navigate("/onboarding/applied-program");
  };

  return (
    <OnboardingLayout currentStep={5} totalSteps={6}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ComponentCard title="Personal Statement">
          <Label>Why should you be awarded the scholarship?</Label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            rows={6}
            value={personalStatement}
            onChange={(e) => setPersonalStatement(e.target.value)}
            placeholder="Write your answer here..."
          />
        </ComponentCard>
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

export default PersonalStatement;
