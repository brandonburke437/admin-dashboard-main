import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Radio from "../../components/form/input/Radio";
import OnboardingLayout from "./OnboardingLayout";
import Flatpickr from "react-flatpickr";
import { CalenderIcon } from "../../icons";

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

const EligibilityStep = () => {
  const navigate = useNavigate();

  // Profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [physicallyChallenged, setPhysicallyChallenged] = useState<string>("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [residentAddressType, setResidentAddressType] =
    useState("Post Office Box");
  const [residentAddress, setResidentAddress] = useState("");
  const [residentGPS, setResidentGPS] = useState("");

  const handleDateChange = (date: Date[]) => {
    setDateOfBirth(date[0].toLocaleDateString()); // Handle selected date and format it
  };

  const districtOptions = region ? districtsByRegion[region] || [] : [];

  const handleProceed = () => {
    // Save data logic here
    navigate("/onboarding/emergency-contact");
  };

  return (
    <OnboardingLayout currentStep={1} totalSteps={6}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ComponentCard title="Eligibility Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
              />
            </div>
            <div>
              <Label htmlFor="datePicker">Date of Birth</Label>
              <div className="relative w-full flatpickr-wrapper">
                <Flatpickr
                  value={dateOfBirth} // Set the value to the state
                  onChange={handleDateChange} // Handle the date change
                  options={{
                    dateFormat: "Y-m-d", // Set the date format
                  }}
                  placeholder="Select an option"
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-amber-300 focus:ring-amber-500/20 dark:border-gray-700  dark:focus:border-amber-800"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <CalenderIcon className="size-6" />
                </span>
              </div>
            </div>
            <div>
              <Label>Phone</Label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone Number"
              />
            </div>
            <div>
              <Label>Email</Label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>
            <div>
              <Label>Birth Place</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="Enter Birth Place"
              />
            </div>
            <div>
              <Label>Physically Challenged</Label>
              <div className="flex space-x-4">
                <Radio
                  id="physicallyChallengedYes"
                  name="physicallyChallenged"
                  value="Yes"
                  checked={physicallyChallenged === "Yes"}
                  onChange={() => setPhysicallyChallenged("Yes")}
                  label="Yes"
                />
                <Radio
                  id="physicallyChallengedNo"
                  name="physicallyChallenged"
                  value="No"
                  checked={physicallyChallenged === "No"}
                  onChange={() => setPhysicallyChallenged("No")}
                  label="No"
                />
              </div>
            </div>
            <div>
              <Label>Gender</Label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <Label>Region</Label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
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
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {districtOptions.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Resident Address Type</Label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={residentAddressType}
                onChange={(e) => setResidentAddressType(e.target.value)}
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
                value={residentAddress}
                onChange={(e) => setResidentAddress(e.target.value)}
                placeholder={
                  residentAddressType === "GPS"
                    ? "Enter GPS Address"
                    : "Enter Post Office Box"
                }
              />
            </div>
            {residentAddressType === "GPS" && (
              <div>
                <Label>GPS</Label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={residentGPS}
                  onChange={(e) => setResidentGPS(e.target.value)}
                  placeholder="Enter GPS"
                />
              </div>
            )}
          </div>
        </ComponentCard>
        <div className="text-right">
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

export default EligibilityStep;
