import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";
import ComponentCard from "../../components/common/ComponentCard";
import FileInput from "../../components/form/input/FileInput";
import Label from "../../components/form/Label";
import toast from "react-hot-toast";

const levels = ["Diploma", "Undergraduate", "Postgraduate", "PhD"];

const classOptions = [
  "First Class",
  "Second Class Upper",
  "Second Class Lower",
  "Third Class",
];

const UploadDocumentsStep: React.FC = () => {
  const [level, setLevel] = useState("UG");
  const [education, setEducation] = useState([
    { institution: "", level: "", programme: "", class: "" },
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [docErrors, setDocErrors] = useState<string[]>([]);
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>(
    {}
  );
  const navigate = useNavigate();

  // Required documents for each level
  const requiredDocs: { [key: string]: string[] } = {
    UG: [
      "WAEC Certificate",
      "Testimonial",
      "Birth Certificate/Ghana Card",
      "Passport Picture",
    ],
    PG: [
      "First Degree Certificate",
      "Curriculum Vitae (CV)",
      "Letters of Recommendation (2)",
      "National Service Certificate",
      "Passport Picture",
    ],
    PHD: [
      "Master's Degree Certificate",
      "Curriculum Vitae (CV)",
      "Research Proposal",
      "Letters of Recommendation (3)",
      "National Service Certificate",
      "Passport Picture",
    ],
  };

  // Validate educational history
  const validateEducation = () => {
    const newErrors: { [key: string]: string[] } = {};
    education.forEach((ed, idx) => {
      const edErrors: string[] = [];
      if (!ed.institution.trim()) edErrors.push("Institution is required");
      if (!ed.level.trim()) edErrors.push("Level is required");
      if (!ed.programme.trim()) edErrors.push("Programme is required");
      if (!ed.class.trim()) edErrors.push("Class is required");
      if (edErrors.length > 0) newErrors[idx] = edErrors;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate required documents
  const validateDocuments = () => {
    let docErrs: string[] = [];
    let docKeys: string[] = [];
    if (level === "UG") docKeys = requiredDocs.UG;
    else if (level === "PG") docKeys = requiredDocs.PG;
    else if (level === "PHD") docKeys = requiredDocs.PHD;
    docErrs = docKeys.filter((doc) => !documents[doc]);
    setDocErrors(docErrs);
    return docErrs.length === 0;
  };

  const handleProceed = () => {
    const validEdu = validateEducation();
    const validDocs = validateDocuments();
    if (!validEdu || !validDocs) {
      toast.error(
        "Please fill all required educational history fields and upload all required documents."
      );
      return;
    }
    navigate("/onboarding/applied-program");
  };

  const handleReturn = () => {
    navigate("/onboarding/emergency-contact");
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    const file = event.target.files?.[0] || null;
    setDocuments((prev) => ({ ...prev, [title]: file }));
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
                  className="w-full px-4 dark:text-white py-2 border rounded-lg"
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
                  className="w-full px-4 py-2 dark:text-gray-500 border rounded-lg"
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
                  className="w-full px-4 py-2 dark:text-white border rounded-lg"
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
                  className="w-full px-4 py-2 dark:text-gray-500 border rounded-lg"
                  value={ed.class}
                  onChange={(e) =>
                    handleEducationChange(idx, "class", e.target.value)
                  }
                >
                  <option value="">Select Class</option>
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {/* Show validation errors for this education entry */}
              {errors[idx] && (
                <div className="col-span-4">
                  {errors[idx].map((err, i) => (
                    <span key={i} className="text-error-500 text-xs block">
                      {err}
                    </span>
                  ))}
                </div>
              )}
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
        <ComponentCard title="Upload Required Documents">
          <p className="mb-4 text-gray-600 dark:text-white">
            Please upload the required documents based on your selected level.
          </p>

          {/* Level Selection */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-400">
              Selected Level:{" "}
              {level === "UG"
                ? "Undergraduate"
                : level === "PG"
                ? "Postgraduate"
                : "PhD"}
            </label>
            <select
              className="w-full px-4 py-2 border dark:text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="UG">Undergraduate</option>
              <option value="PG">Postgraduate</option>
              <option value="PHD">PhD</option>
            </select>
          </div>

          {/* Conditional File Uploads */}
          {level === "UG" && (
            <div className="space-y-6">
              <div>
                <Label>WAEC Certificate</Label>
                <FileInput
                  onChange={(e) => handleFileChange(e, "WAEC Certificate")}
                />
              </div>
              <div>
                <Label>Testimonial</Label>
                <FileInput
                  onChange={(e) => handleFileChange(e, "Testimonial")}
                />
              </div>
              <div>
                <Label>Birth Certificate/Ghana Card</Label>
                <FileInput
                  onChange={(e) =>
                    handleFileChange(e, "Birth Certificate/Ghana Card")
                  }
                />
              </div>
              <div>
                <Label>Passport Picture</Label>
                <FileInput
                  onChange={(e) => handleFileChange(e, "Passport Picture")}
                />
              </div>
            </div>
          )}

          {level === "PG" && (
            <div className="space-y-6">
              <div>
                <Label>First Degree Certificate</Label>
                <FileInput
                  onChange={(e) =>
                    handleFileChange(e, "First Degree Certificate")
                  }
                />
              </div>
              <div>
                <Label>Curriculum Vitae (CV)</Label>
                <FileInput
                  onChange={(e) => handleFileChange(e, "Curriculum Vitae (CV)")}
                />
              </div>
              <div>
                <Label>Letters of Recommendation (2)</Label>
                <FileInput
                  onChange={(e) =>
                    handleFileChange(e, "Letters of Recommendation (2)")
                  }
                />
              </div>
              <div>
                <Label>National Service Certificate</Label>
                <FileInput
                  onChange={(e) =>
                    handleFileChange(e, "National Service Certificate")
                  }
                />
              </div>
              <div>
                <Label>Passport Picture</Label>
                <FileInput
                  onChange={(e) => handleFileChange(e, "Passport Picture")}
                />
              </div>
            </div>
          )}

          {level === "PHD" && (
            <div className="space-y-6">
              <div>
                <Label>Master's Degree Certificate</Label>
                <FileInput
                  onChange={(e) =>
                    handleFileChange(e, "Master's Degree Certificate")
                  }
                />
              </div>
              <div>
                <Label>Curriculum Vitae (CV)</Label>
                <FileInput
                  onChange={(e) => handleFileChange(e, "Curriculum Vitae (CV)")}
                />
              </div>
              <div>
                <Label>Research Proposal</Label>
                <FileInput
                  onChange={(e) => handleFileChange(e, "Research Proposal")}
                />
              </div>
              <div>
                <Label>Letters of Recommendation (3)</Label>
                <FileInput
                  onChange={(e) =>
                    handleFileChange(e, "Letters of Recommendation (3)")
                  }
                />
              </div>
              <div>
                <Label>National Service Certificate</Label>
                <FileInput
                  onChange={(e) =>
                    handleFileChange(e, "National Service Certificate")
                  }
                />
              </div>
              <div>
                <Label>Passport Picture</Label>
                <FileInput
                  onChange={(e) => handleFileChange(e, "Passport Picture")}
                />
              </div>
            </div>
          )}

          {/* Document upload errors */}
          {docErrors.length > 0 && (
            <div className="mt-4">
              {docErrors.map((docErr, i) => (
                <span key={i} className="text-error-500 text-xs block">
                  {docErr} is required
                </span>
              ))}
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
