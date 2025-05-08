import React, { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { useOnboarding } from "../../context/OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";

const FinalStep: React.FC = () => {
  const { data, setData } = useOnboarding();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    console.log("Changes saved:", data);
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(e.target.checked);
  };

  const handleSubmit = () => {
    if (isConfirmed) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <OnboardingLayout currentStep={5} totalSteps={5}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Summary Card */}
        <ComponentCard title="Summary of Your Information">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
            {/* Personal Information */}
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800">
                {data.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800">
                {data.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                Date of Birth
              </p>
              <p className="text-sm font-medium text-gray-800">{data.dob}</p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-800">{data.phone}</p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-800">{data.email}</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500">
              Program Name
            </p>
            <p className="text-sm font-medium text-gray-800">
              {data.programName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500">Level</p>
            <p className="text-sm font-medium text-gray-800">{data.level}</p>
          </div>
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500">
              Duration
            </p>
            <p className="text-sm font-medium text-gray-800">{data.duration}</p>
          </div>
          <button
            onClick={handleEdit}
            className="mt-4 flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
          >
            {" "}
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </ComponentCard>

        {/* Confirmation Section */}
        <ComponentCard title="Confirmation">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="confirm"
              className="w-5 h-5"
              checked={isConfirmed}
              onChange={handleConfirmChange}
            />
            <label htmlFor="confirm" className="text-gray-700">
              I confirm that the information provided is accurate.
            </label>
          </div>
        </ComponentCard>

        {/* Submit Button */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            disabled={!isConfirmed}
            className={`bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ${
              !isConfirmed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Submit
          </button>
        </div>

        {/* Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="max-w-[700px] m-4"
        >
          <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4">
            <h4 className="mb-4 text-2xl font-semibold text-gray-800">
              Edit Information
            </h4>
            <form className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
              <div>
                <Label>First Name</Label>
                <Input
                  type="text"
                  value={data.firstName}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  value={data.lastName}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                />
              </div>
              {/* Add other fields as needed */}
            </form>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </OnboardingLayout>
  );
};

export default FinalStep;
