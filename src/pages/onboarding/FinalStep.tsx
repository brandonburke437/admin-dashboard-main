import React, { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import OnboardingLayout from "./OnboardingLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const FinalStep: React.FC = () => {
  const [declarationName, setDeclarationName] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; confirm?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newErrors: { name?: string; confirm?: string } = {};
    if (!declarationName.trim())
      newErrors.name = "Please enter your legal name.";
    if (!isConfirmed) newErrors.confirm = "You must confirm the declaration.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast.success("Your application has been submitted successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2500); // 2.5 seconds
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
          <form onSubmit={handleSubmit}>
            <Label>Type your legal name</Label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg mb-1"
              value={declarationName}
              onChange={(e) => setDeclarationName(e.target.value)}
              placeholder="Enter your legal name"
            />
            {errors.name && (
              <span className="text-error-500 text-xs mb-2 block">
                {errors.name}
              </span>
            )}
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                id="confirm"
                className="w-5 h-5"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
              />
              <label htmlFor="confirm" className="text-gray-700">
                I confirm that the information provided is accurate and I agree
                to the declaration above.
              </label>
            </div>
            {errors.confirm && (
              <span className="text-error-500 text-xs mb-2 block">
                {errors.confirm}
              </span>
            )}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleReturn}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Return
              </button>
              <button
                type="submit"
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
          </form>
        </ComponentCard>
      </div>
    </OnboardingLayout>
  );
};

export default FinalStep;
