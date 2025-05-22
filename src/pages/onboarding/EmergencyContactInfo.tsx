import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
// import Radio from "../../components/form/input/Radio";
import { useNavigate } from "react-router-dom";

const regions = [
  "Greater Accra",
  "Ashanti",
  "Eastern",
  "Western",
  "Northern",
  "Volta",
  "Central",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
  "Savannah",
  "North East",
  "Oti",
  "Western North",
];
const districtsByRegion: Record<string, string[]> = {
  "Greater Accra": ["Accra Metropolis", "Tema", "Ga East"],
  Ashanti: ["Kumasi", "Obuasi", "Ejisu"],
  // ...add all regions and their districts
};

const EmergencyContact = () => {
  const navigate = useNavigate();

  // Emergency Contact fields
  const [emName, setEmName] = useState("");
  const [emRelationship, setEmRelationship] = useState("");
  const [emPhone, setEmPhone] = useState("");
  const [emEmail, setEmEmail] = useState("");
  const [emAddressType, setEmAddressType] = useState("Post Office Box");
  const [emAddress, setEmAddress] = useState("");
  const [emRegion, setEmRegion] = useState("");
  const [emDistrict, setEmDistrict] = useState("");
  const [emOccupation, setEmOccupation] = useState("");
  const [emEmployer, setEmEmployer] = useState("");

  const emDistrictOptions = emRegion ? districtsByRegion[emRegion] || [] : [];

  const handleProceed = () => {
    navigate("/onboarding/educational-history");
  };

  const handleReturn = (): void => {
    navigate("/onboarding/eligibility");
  };

  return (
    <OnboardingLayout currentStep={2} totalSteps={6}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ComponentCard title="Emergency Contact Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name of Emergency Contact</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emName}
                onChange={(e) => setEmName(e.target.value)}
                placeholder="Enter Name"
              />
            </div>
            <div>
              <Label>Relationship</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emRelationship}
                onChange={(e) => setEmRelationship(e.target.value)}
                placeholder="Enter Relationship"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emPhone}
                onChange={(e) => setEmPhone(e.target.value)}
                placeholder="Enter Phone Number"
              />
            </div>
            <div>
              <Label>Email</Label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emEmail}
                onChange={(e) => setEmEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>
            <div>
              <Label>Resident Address Type</Label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emAddressType}
                onChange={(e) => setEmAddressType(e.target.value)}
              >
                <option>Post Office Box</option>
                <option>GPS</option>
              </select>
            </div>
            <div>
              <Label>Resident Address</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emAddress}
                onChange={(e) => setEmAddress(e.target.value)}
                placeholder={
                  emAddressType === "GPS"
                    ? "Enter GPS Address"
                    : "Enter Post Office Box"
                }
              />
            </div>

            <div>
              <Label>Region</Label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emRegion}
                onChange={(e) => setEmRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>District</Label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emDistrict}
                onChange={(e) => setEmDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {emDistrictOptions.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Occupation</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emOccupation}
                onChange={(e) => setEmOccupation(e.target.value)}
                placeholder="Enter Occupation"
              />
            </div>
            <div>
              <Label>Employer Name</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={emEmployer}
                onChange={(e) => setEmEmployer(e.target.value)}
                placeholder="Enter Employer Name"
              />
            </div>
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

export default EmergencyContact;
