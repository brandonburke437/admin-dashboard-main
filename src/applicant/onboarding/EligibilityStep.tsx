import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponentCard from "../../admin/admin-component/common/ComponentCard";
import Label from "../../components/form/Label";
import Radio from "../../components/form/input/Radio";
import OnboardingLayout from "./OnboardingLayout";
import Flatpickr from "react-flatpickr";
import { CalenderIcon } from "../../icons";
import toast from "react-hot-toast";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleDateChange = (date: Date[]) => {
    setDateOfBirth(date[0]?.toLocaleDateString() || "");
  };

  const districtOptions = region ? districtsByRegion[region] || [] : [];

  const handleProceed = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!dateOfBirth.trim())
      newErrors.dateOfBirth = "Date of birth is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!birthPlace.trim()) newErrors.birthPlace = "Birth place is required";
    if (!physicallyChallenged.trim())
      newErrors.physicallyChallenged = "Select an option";
    if (!gender.trim()) newErrors.gender = "Gender is required";
    if (!region.trim()) newErrors.region = "Region is required";
    if (!district.trim()) newErrors.district = "District is required";
    if (!residentAddress.trim())
      newErrors.residentAddress = "Resident address is required";
    if (residentAddressType === "GPS" && !residentGPS.trim())
      newErrors.residentGPS = "GPS is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required eligibility fields.");
      return;
    }

    // Save data logic here
    navigate("/user-dashboard/onboarding/emergency-contact");
  };

  return (
    <OnboardingLayout currentStep={1} totalSteps={6}>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto p-10 space-y-8">
          <ComponentCard title="Eligibility Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <Label>First Name</Label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder:text-white/30"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                />
                {errors.firstName && (
                  <span className="text-error-500 text-xs">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div>
                <Label>Last Name</Label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder:text-white/30"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                />
                {errors.lastName && (
                  <span className="text-error-500 text-xs">
                    {errors.lastName}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="datePicker">Date of Birth</Label>
                <div className="relative w-full flatpickr-wrapper">
                  <Flatpickr
                    value={dateOfBirth}
                    onChange={handleDateChange}
                    options={{
                      dateFormat: "Y-m-d",
                    }}
                    placeholder="Select an option"
                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-white text-gray-800 border-gray-300 focus:border-amber-300 focus:ring-amber-500/20 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/30 dark:border-gray-700 dark:focus:border-amber-800"
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <CalenderIcon className="size-6" />
                  </span>
                </div>
                {errors.dateOfBirth && (
                  <span className="text-error-500 text-xs">
                    {errors.dateOfBirth}
                  </span>
                )}
              </div>
              <div>
                <Label>Phone</Label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder:text-white/30"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone Number"
                />
                {errors.phone && (
                  <span className="text-error-500 text-xs">{errors.phone}</span>
                )}
              </div>
              <div>
                <Label>Email</Label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder:text-white/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <span className="text-error-500 text-xs">{errors.email}</span>
                )}
              </div>
              <div>
                <Label>Birth Place</Label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder:text-white/30"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  placeholder="Enter Birth Place"
                />
                {errors.birthPlace && (
                  <span className="text-error-500 text-xs">
                    {errors.birthPlace}
                  </span>
                )}
              </div>
              <div>
                <Label>Physically Challenged</Label>
                <div className="flex space-x-4 w-full">
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
                {errors.physicallyChallenged && (
                  <span className="text-error-500 text-xs">
                    {errors.physicallyChallenged}
                  </span>
                )}
              </div>
              <div>
                <Label>Gender</Label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                {errors.gender && (
                  <span className="text-error-500 text-xs">
                    {errors.gender}
                  </span>
                )}
              </div>
              <div>
                <Label>Region</Label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                {errors.region && (
                  <span className="text-error-500 text-xs">
                    {errors.region}
                  </span>
                )}
              </div>
              <div>
                <Label>District</Label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="">Select District</option>
                  {districtOptions.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                {errors.district && (
                  <span className="text-error-500 text-xs">
                    {errors.district}
                  </span>
                )}
              </div>
              <div>
                <Label>Resident Address Type</Label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white dark:border-gray-700"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder:text-white/30"
                  value={residentAddress}
                  onChange={(e) => setResidentAddress(e.target.value)}
                  placeholder={
                    residentAddressType === "GPS"
                      ? "Enter GPS Address"
                      : "Enter Post Office Box"
                  }
                />
                {errors.residentAddress && (
                  <span className="text-error-500 text-xs">
                    {errors.residentAddress}
                  </span>
                )}
              </div>
              {residentAddressType === "GPS" && (
                <div>
                  <Label>GPS</Label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder:text-white/30"
                    value={residentGPS}
                    onChange={(e) => setResidentGPS(e.target.value)}
                    placeholder="Enter GPS"
                  />
                  {errors.residentGPS && (
                    <span className="text-error-500 text-xs">
                      {errors.residentGPS}
                    </span>
                  )}
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
      </div>
    </OnboardingLayout>
  );
};

export default EligibilityStep;
