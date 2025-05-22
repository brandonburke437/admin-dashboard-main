import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";

const levels = ["Diploma", "Undergraduate", "Postgraduate", "PhD"];
const classes = [
  "First Class",
  "Second Class Upper",
  "Second Class Lower",
  "Third Class",
];

const EducationalHistoryStep: React.FC = () => {
  const [education, setEducation] = useState([
    { institution: "", level: "", programme: "", class: "" },
  ]);
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/onboarding/applied-program");
  };

  const handleReturn = () => {
    navigate("/onboarding/emergency-contact");
  };

  // Educational history handlers
  const handleEducationChange = (idx: number, field: string, value: string) => {
    const updated = education.map((ed, i) =>
      i === idx ? { ...ed, [field]: value } : ed
    );
    setEducation(updated);
  };

  const handleAddEducation = () => {
    if (education.length < 3) {
      setEducation([
        ...education,
        { institution: "", level: "", programme: "", class: "" },
      ]);
    }
  };

  return (
    <OnboardingLayout currentStep={3} totalSteps={6}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Educational History Section */}
        <ComponentCard title="Educational History">
          {education.map((ed, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
            >
              <div>
                <Label>Institution</Label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={ed.institution}
                  onChange={(e) =>
                    handleEducationChange(idx, "institution", e.target.value)
                  }
                  placeholder="Enter Institution"
                />
              </div>
              <div>
                <Label>Level</Label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={ed.level}
                  onChange={(e) =>
                    handleEducationChange(idx, "level", e.target.value)
                  }
                >
                  <option value="">Select Level</option>
                  {levels.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Programme</Label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={ed.programme}
                  onChange={(e) =>
                    handleEducationChange(idx, "programme", e.target.value)
                  }
                  placeholder="Enter Programme"
                />
              </div>
              <div>
                <Label>Class</Label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={ed.class}
                  onChange={(e) =>
                    handleEducationChange(idx, "class", e.target.value)
                  }
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          {education.length < 3 && (
            <button
              type="button"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              onClick={handleAddEducation}
            >
              Add Another Level
            </button>
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

export default EducationalHistoryStep;
