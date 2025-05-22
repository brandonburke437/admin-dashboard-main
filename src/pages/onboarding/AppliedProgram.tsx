import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import { useNavigate } from "react-router-dom";

const stemOptions = ["STEM", "Non-STEM"];
const offerStatusOptions = ["Conditional", "Unconditional"];
const countries = ["Ghana", "Nigeria", "South Africa", "Other"];

const AppliedProgram = () => {
  const navigate = useNavigate();

  const [appliedProgram, setAppliedProgram] = useState("");
  const [appliedLevel, setAppliedLevel] = useState("");
  const [appliedInstitution, setAppliedInstitution] = useState("");
  const [stemType, setStemType] = useState("");
  const [duration, setDuration] = useState("");
  const [country, setCountry] = useState("");
  const [tuition, setTuition] = useState("");
  const [offerStatus, setOfferStatus] = useState("");
  const [onScholarship, setOnScholarship] = useState("");
  const [scholarshipName, setScholarshipName] = useState("");
  const [scholarshipValue, setScholarshipValue] = useState("");
  const [scholarshipBody, setScholarshipBody] = useState("");

  const handleProceed = () => {
    navigate("/onboarding/personal-statement");
  };

  const handleReturn = () => {
    navigate("/onboarding/educational-history");
  };

  return (
    <OnboardingLayout currentStep={4} totalSteps={6}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ComponentCard title="Applied Program">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Applied Program</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={appliedProgram}
                onChange={(e) => setAppliedProgram(e.target.value)}
                placeholder="Enter Applied Program"
              />
            </div>
            <div>
              <Label>Level</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={appliedLevel}
                onChange={(e) => setAppliedLevel(e.target.value)}
                placeholder="Enter Level"
              />
            </div>
            <div>
              <Label>Applied Institution</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={appliedInstitution}
                onChange={(e) => setAppliedInstitution(e.target.value)}
                placeholder="Enter Institution"
              />
            </div>
            <div>
              <Label>STEM/Non-STEM</Label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={stemType}
                onChange={(e) => setStemType(e.target.value)}
              >
                <option value="">Select</option>
                {stemOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Duration</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter Duration"
              />
            </div>
            <div>
              <Label>Country</Label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Tuition</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={tuition}
                onChange={(e) => setTuition(e.target.value)}
                placeholder="Enter Tuition"
              />
            </div>
            <div>
              <Label>Offer Status</Label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={offerStatus}
                onChange={(e) => setOfferStatus(e.target.value)}
              >
                <option value="">Select Offer Status</option>
                {offerStatusOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>On Scholarship?</Label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={onScholarship}
                onChange={(e) => setOnScholarship(e.target.value)}
              >
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            {onScholarship === "Yes" && (
              <>
                <div>
                  <Label>If yes, name the scholarship</Label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={scholarshipName}
                    onChange={(e) => setScholarshipName(e.target.value)}
                    placeholder="Enter Scholarship Name"
                  />
                </div>
                <div>
                  <Label>Scholarship Value</Label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={scholarshipValue}
                    onChange={(e) => setScholarshipValue(e.target.value)}
                    placeholder="Enter Scholarship Value"
                  />
                </div>
                <div>
                  <Label>Scholarship Awarding Body</Label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={scholarshipBody}
                    onChange={(e) => setScholarshipBody(e.target.value)}
                    placeholder="Enter Awarding Body"
                  />
                </div>
              </>
            )}
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

export default AppliedProgram;
