import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
// import TextArea from "../../components/form/input/TextArea";
import Radio from "../../components/form/input/Radio";
import Switch from "../../components/form/switch/Switch";
import OnboardingLayout from "./OnboardingLayout";

const EligibilityStep = () => {
  // const { setData } = useOnboarding();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("+233");
  const [email, setEmail] = useState("");
  const [isGhanaian, setIsGhanaian] = useState<boolean | null>(null);
  const [admissionType, setAdmissionType] = useState("");
  const [institution, setInstitution] = useState("");
  const [isNursingCollege, setIsNursingCollege] = useState<boolean | null>(
    null
  );
  const [isStemLecturer, setIsStemLecturer] = useState<boolean | null>(null);
  const [nationalId, setNationalId] = useState("");
  const [passportPreview, setPassportPreview] = useState<string | null>(null);

  const handlePassportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setPassportPreview(URL.createObjectURL(file));
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  const handleProceed = () => {
    // setData((prev) => ({
    //   ...prev,
    //   firstName,
    //   lastName,
    //   dob,
    //   phone,
    //   email,
    // }));
    navigate("/onboarding/application-type");
  };

  return (
    <OnboardingLayout currentStep={2} totalSteps={5}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ComponentCard title="Eligibility Information">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          {/* DOB */}
          <div>
            <Label>Date of Birth</Label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Phone Number</Label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Are you Ghanaian */}
          <div>
            <Label>Are you a Ghanaian?</Label>
            <div className="flex space-x-4">
              <Radio
                id="ghanaian-yes"
                name="isGhanaian"
                value="Yes"
                checked={isGhanaian === true}
                onChange={() => setIsGhanaian(true)}
                label="Yes"
              />
              <Radio
                id="ghanaian-no"
                name="isGhanaian"
                value="No"
                checked={isGhanaian === false}
                onChange={() => setIsGhanaian(false)}
                label="No"
              />
            </div>
          </div>

          {/* Admission Type */}
          <div>
            <Label>Admission Type</Label>
            <div className="flex space-x-4">
              <Radio
                id="undergraduate"
                name="admissionType"
                value="Undergraduate"
                checked={admissionType === "Undergraduate"}
                onChange={(value) => setAdmissionType(value)}
                label="Undergraduate"
              />
              <Radio
                id="postgraduate"
                name="admissionType"
                value="Postgraduate"
                checked={admissionType === "Postgraduate"}
                onChange={(value) => setAdmissionType(value)}
                label="Postgraduate"
              />
            </div>
          </div>

          {/* Institution Name */}
          <div>
            <Label>Institution Name</Label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Start typing institution name..."
            />
          </div>

          {/* Is it Nursing/Teacher Training? */}
          <div>
            <Label>
              Is your institution a Nursing/Teacher Training College?
            </Label>
            <div className="flex space-x-4">
              <Switch
                label="Yes"
                defaultChecked={isNursingCollege === true}
                onChange={() => setIsNursingCollege(true)}
              />
              <Switch
                label="No"
                defaultChecked={isNursingCollege === false}
                onChange={() => setIsNursingCollege(false)}
              />
            </div>
          </div>

          {/* Are you STEM Lecturer (PG only) */}
          {admissionType === "Postgraduate" && (
            <div>
              <Label>Are you a teacher/lecturer in STEM or TVET?</Label>
              <div className="flex space-x-4">
                <Switch
                  label="Yes"
                  defaultChecked={isStemLecturer === true}
                  onChange={() => setIsStemLecturer(true)}
                />
                <Switch
                  label="No"
                  defaultChecked={isStemLecturer === false}
                  onChange={() => setIsStemLecturer(false)}
                />
              </div>
            </div>
          )}

          {/* National ID */}
          <div>
            <Label>Ghanaian National ID / Birth Cert No.</Label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="Enter National ID or Birth Cert No."
            />
          </div>

          {/* Passport Upload */}
          <div>
            <Label>Passport Picture Upload</Label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={handlePassportUpload}
            />
            {passportPreview && (
              <img
                src={passportPreview}
                alt="Passport Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full border"
              />
            )}
          </div>
        </ComponentCard>

        {/* Proceed Button */}
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
