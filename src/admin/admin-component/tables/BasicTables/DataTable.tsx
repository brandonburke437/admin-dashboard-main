/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

const initialData = [
  {
    applicationId: "APP-001",
    applicationType: "Undergraduate",
    institution: "Harvard University",
    program: "Computer Science",
    submissionDate: "2024-05-01",
    status: "Submitted",
    // EligibilityStep
    eligibility: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "2000-01-01",
      phone: "+123456789",
      email: "john@example.com",
      birthPlace: "Accra",
      physicallyChallenged: "No",
      gender: "Male",
      region: "Greater Accra",
      district: "Accra Metropolis",
      residentAddressType: "Post Office Box",
      residentAddress: "P.O. Box 123",
      residentGPS: "",
    },
    // EmergencyContactInfo
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Mother",
      phone: "+987654321",
      email: "jane@example.com",
      addressType: "Post Office Box",
      address: "P.O. Box 456",
      region: "Greater Accra",
      district: "Accra Metropolis",
      occupation: "Teacher",
      employer: "Accra High School",
    },
    // EducationalHistory
    education: [
      {
        institution: "Harvard College",
        level: "Undergraduate",
        programme: "Computer Science",
        class: "First Class",
      },
    ],
    uploadedDocuments: [
      { name: "WAEC Certificate", url: "/docs/waec-app-001.pdf" },
      { name: "Passport Picture", url: "/docs/passport-app-001.jpg" },
    ],
    // AppliedProgram
    appliedProgram: {
      program: "Computer Science",
      level: "Undergraduate",
      institution: "Harvard University",
      stemType: "STEM",
      duration: "4 years",
      country: "Ghana",
      tuition: "10000",
      offerStatus: "Unconditional",
      onScholarship: "No",
      scholarshipName: "",
      scholarshipValue: "",
      scholarshipBody: "",
    },
    // PersonalStatement
    personalStatement:
      "I am passionate about technology and want to make a difference.",
    // FinalStep (Declaration)
    declaration: {
      name: "John Doe",
      confirmed: true,
    },
  },
  {
    applicationId: "APP-002",
    applicationType: "Postgraduate",
    institution: "MIT",
    program: "Mechanical Engineering",
    submissionDate: "2024-05-03",
    status: "Under Review",
  },
  {
    applicationId: "APP-003",
    applicationType: "PhD",
    institution: "Stanford University",
    program: "Physics",
    submissionDate: "2024-05-05",
    status: "Approved",
  },
  {
    applicationId: "APP-004",
    applicationType: "Undergraduate",
    institution: "Yale University",
    program: "Economics",
    submissionDate: "2024-05-07",
    status: "Rejected",
  },
  {
    applicationId: "APP-005",
    applicationType: "Postgraduate",
    institution: "Oxford University",
    program: "Philosophy",
    submissionDate: "2024-05-10",
    status: "Submitted",
  },
];

export default function DataTable() {
  const location = useLocation();
  const [tableData, setTableData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "All",
    submissionDate: "",
    program: "All",
    institution: "All",
    applicationType: "All",
    applicationId: "",
  });

  // Read status from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get("status");
    if (statusParam) {
      setFilters((prev) => ({
        ...prev,
        status: statusParam.charAt(0).toUpperCase() + statusParam.slice(1),
      }));
    }
  }, [location.search]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [viewedApplication, setViewedApplication] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningAppId, setAssigningAppId] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  // Unique options for dropdowns
  const statusOptions = [
    "All",
    ...Array.from(new Set(tableData.map((item) => item.status))),
  ];
  const programOptions = [
    "All",
    ...Array.from(new Set(tableData.map((item) => item.program))),
  ];
  const institutionOptions = [
    "All",
    ...Array.from(new Set(tableData.map((item) => item.institution))),
  ];
  const applicationTypeOptions = [
    "All",
    ...Array.from(new Set(tableData.map((item) => item.applicationType))),
  ];
  const staffOptions = ["Staff A", "Staff B", "Staff C", "Staff D"];

  // Filtering logic
  const filteredData = tableData.filter((item) => {
    const matchesSearch =
      search === "" ||
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filters.status === "All" ? true : item.status === filters.status;

    const matchesProgram =
      filters.program === "All" ? true : item.program === filters.program;

    const matchesInstitution =
      filters.institution === "All"
        ? true
        : item.institution === filters.institution;

    const matchesApplicationType =
      filters.applicationType === "All"
        ? true
        : item.applicationType === filters.applicationType;

    const matchesApplicationId =
      filters.applicationId === "" ||
      item.applicationId
        .toLowerCase()
        .includes(filters.applicationId.toLowerCase());

    const matchesSubmissionDate =
      filters.submissionDate === "" ||
      item.submissionDate === filters.submissionDate;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesProgram &&
      matchesInstitution &&
      matchesApplicationType &&
      matchesApplicationId &&
      matchesSubmissionDate
    );
  });

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
    setSelectedIds([]);
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = () => {
    setShowDeleteWarning(true);
  };

  const confirmDelete = () => {
    setTableData((prev) =>
      prev.filter((item) => !selectedIds.includes(item.applicationId))
    );
    setSelectedIds([]);
    setShowDeleteWarning(false);
  };

  const cancelDelete = () => {
    setShowDeleteWarning(false);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "All",
      submissionDate: "",
      program: "All",
      institution: "All",
      applicationType: "All",
      applicationId: "",
    });
  };

  // Handler for view button
  const handleView = (application: any) => {
    setViewedApplication(application);
  };

  // Handler to close the view modal
  const closeViewModal = () => setViewedApplication(null);

  // Handler to open assign modal
  const handleAssign = (applicationId: string) => {
    setAssigningAppId(applicationId);
    setShowAssignModal(true);
    setSelectedStaff("");
  };

  // Handler to assign application
  const handleAssignConfirm = () => {
    setShowAssignModal(false);
    setAssigningAppId(null);
    setSelectedStaff("");
  };

  // Handler to cancel assign
  const handleAssignCancel = () => {
    setShowAssignModal(false);
    setAssigningAppId(null);
    setSelectedStaff("");
  };

  // Determine if a popup/modal is active
  const popupActive = showFilters || showDeleteWarning || viewedApplication;

  // UI
  return (
    <div className="relative min-h-screen">
      {/* Header and controls */}
      <div
        className={`mb-4 flex flex-wrap items-center gap-2 transition-all duration-200 ${
          popupActive
            ? "blur-sm pointer-events-none select-none opacity-60"
            : ""
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-2 w-full max-w-xs dark:bg-gray-800 dark:text-white dark:border-gray-700 "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="flex items-center justify-center px-3 py-2 rounded text-xs font-semibold bg-gray-200 text-gray-800 hover:text-white hover:bg-amber-400 border dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700  dark:border-gray-700"
          onClick={() => setShowFilters(true)}
          aria-label="Show filters"
          type="button"
        >
          {/* Filter Icon from Flowbite */}
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
            />
          </svg>
        </button>
        <button
          className={`px-3 py-2 rounded text-xs font-semibold ${
            editMode
              ? "bg-black text-white hover:bg-gray-400"
              : "bg-black text-white hover:bg-gray-700"
          }`}
          onClick={handleEditMode}
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
        {editMode && (
          <button
            className="bg-red-500 text-white px-3 py-2 rounded text-xs font-semibold hover:bg-red-600"
            onClick={handleDelete}
            disabled={selectedIds.length === 0}
          >
            Delete
          </button>
        )}
      </div>

      {/* Table */}
      <div
        className={`overflow-x-auto transition-all duration-200 ${
          popupActive
            ? "blur-sm pointer-events-none select-none opacity-60"
            : ""
        }`}
      >
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {editMode && (
                <th className="px-2 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select
                </th>
              )}
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Application ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Application Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Institution
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Program
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Submission Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={editMode ? 8 : 7}
                  className="text-center py-6 text-gray-400"
                >
                  No applications found.
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr
                  key={item.applicationId}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  {editMode && (
                    <td className="px-2 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.applicationId)}
                        onChange={() => handleSelect(item.applicationId)}
                        aria-label={`Select application ${item.applicationId}`}
                        className="accent-amber-500 w-4 h-4"
                      />
                    </td>
                  )}
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                    {item.applicationId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {item.applicationType}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {item.institution}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {item.program}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {item.submissionDate}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm ${
                      item.status === "Approved"
                        ? "text-green-500"
                        : item.status === "Rejected"
                        ? "text-red-500"
                        : item.status === "Under Review"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-4 py-2 text-sm flex flex-wrap gap-1">
                    <button
                      className="bg-amber-500 text-white px-2 py-1 rounded text-xs hover:bg-amber-600"
                      onClick={() => handleView(item)}
                    >
                      View
                    </button>
                    {editMode && (
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-black"
                        onClick={() => handleAssign(item.applicationId)}
                      >
                        Assign
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Filter Popup */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg min-w-[320px] max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg dark:text-white font-semibold">
                Filter Applications
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
                onClick={() => setShowFilters(false)}
                aria-label="Close filter popup"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Application ID"
                className="border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                value={filters.applicationId}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, applicationId: e.target.value }))
                }
              />
              <label
                className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-2"
                htmlFor="status-filter"
              >
                Status
              </label>
              <select
                className="border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                value={filters.status}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, status: e.target.value }))
                }
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <label
                className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-2"
                htmlFor="program-filter"
              >
                Program
              </label>
              <select
                className="border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                value={filters.program}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, program: e.target.value }))
                }
              >
                {programOptions.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
              <label
                className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-2"
                htmlFor="institution-filter"
              >
                Institution
              </label>
              <select
                className="border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                value={filters.institution}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, institution: e.target.value }))
                }
              >
                {institutionOptions.map((institution) => (
                  <option key={institution} value={institution}>
                    {institution}
                  </option>
                ))}
              </select>
              <label
                className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-2"
                htmlFor="application-type-filter"
              >
                Application Type
              </label>
              <select
                className="border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                value={filters.applicationType}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, applicationType: e.target.value }))
                }
              >
                {applicationTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label
                className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-2"
                htmlFor="submission-date-filter"
              >
                Submission Date
              </label>
              <input
                type="date"
                className="border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                value={filters.submissionDate}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, submissionDate: e.target.value }))
                }
              />
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  onClick={handleClearFilters}
                  type="button"
                >
                  Clear
                </button>
                <button
                  className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
                  onClick={() => setShowFilters(false)}
                  type="button"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Warning Popup */}
      {showDeleteWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg min-w-[320px] max-w-full">
            <h3 className="text-lg font-semibold mb-4 text-amber-500">
              Warning
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Are you sure you want to delete the selected application(s)? This
              action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-amber-400 relative animate-fade-in">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-amber-500 text-2xl font-bold transition"
              onClick={closeViewModal}
              aria-label="Close details popup"
            >
              &times;
            </button>
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-amber-200 dark:border-amber-700 px-8 py-6 bg-gradient-to-r from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900 rounded-t-xl">
              <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  Applicant Details
                </h2>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  Application ID:{" "}
                  <span className="font-semibold">
                    {viewedApplication.applicationId}
                  </span>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="px-8 py-6 space-y-6 text-gray-800 dark:text-gray-200">
              {/* Personal Info */}
              <section>
                <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  Personal Information
                </h3>
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-900 mb-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        First Name
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.firstName}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Last Name
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Email address
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.email}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.phone}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Date of Birth
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.dateOfBirth}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Birth Place
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.birthPlace}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Gender
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.gender}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Physically Challenged
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.physicallyChallenged}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Region
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.region}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        District
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.district}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Address Type
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.residentAddressType}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Address
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.eligibility?.residentAddress}
                      </p>
                    </div>
                    {viewedApplication.eligibility?.residentGPS && (
                      <div className="col-span-2">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          GPS
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {viewedApplication.eligibility?.residentGPS}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
              {/* Emergency Contact */}
              <section>
                <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  Emergency Contact
                </h3>
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-900 mb-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Name
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.name}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Relationship
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.relationship}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.phone}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.email}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Address Type
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.addressType}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Address
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.address}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Region
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.region}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        District
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.district}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Occupation
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.occupation}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Employer
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.emergencyContact?.employer}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              {/* Educational History */}
              <section>
                <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  Educational History
                </h3>
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-900 mb-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                    {viewedApplication.education?.map(
                      (ed: any, idx: number) => (
                        <div key={idx} className="bg-transparent">
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Institution
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {ed.institution}
                          </p>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400 mt-2">
                            Level
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {ed.level}
                          </p>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400 mt-2">
                            Programme
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {ed.programme}
                          </p>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400 mt-2">
                            Class
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {ed.class}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>
              {/* Uploaded Documents */}
              <section>
                <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  Uploaded Documents
                </h3>
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-900 mb-4">
                  <ul className="space-y-2">
                    {viewedApplication.uploadedDocuments?.map((doc: any) => (
                      <li key={doc.name}>
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          {doc.name}
                        </p>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200 underline font-medium transition"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Download
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
              {/* Applied Program */}
              <section>
                <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  Applied Program
                </h3>
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-900 mb-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Program
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.appliedProgram?.program}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Level
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.appliedProgram?.level}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Institution
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.appliedProgram?.institution}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        STEM/Non-STEM
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.appliedProgram?.stemType}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Duration
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.appliedProgram?.duration}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Country
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.appliedProgram?.country}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Tuition
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.appliedProgram?.tuition}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Offer Status
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.appliedProgram?.offerStatus}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        On Scholarship
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.appliedProgram?.onScholarship}
                      </p>
                    </div>
                    {viewedApplication.appliedProgram?.onScholarship ===
                      "Yes" && (
                      <>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Scholarship Name
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {viewedApplication.appliedProgram?.scholarshipName}
                          </p>
                        </div>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Scholarship Value
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {viewedApplication.appliedProgram?.scholarshipValue}
                          </p>
                        </div>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Scholarship Body
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {viewedApplication.appliedProgram?.scholarshipBody}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </section>
              {/* Personal Statement */}
              <section>
                <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  Personal Statement
                </h3>
                <div className="bg-amber-50 dark:bg-gray-800 rounded p-3 border border-amber-100 dark:border-amber-900 text-gray-700 dark:text-gray-200 whitespace-pre-line">
                  {viewedApplication.personalStatement}
                </div>
              </section>
              {/* Declaration */}
              <section>
                <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  Declaration
                </h3>
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-900 mb-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Name
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.declaration?.name}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Confirmed
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {viewedApplication.declaration?.confirmed
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="flex justify-end px-8 pb-6">
              <button
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded shadow transition"
                onClick={closeViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg min-w-[320px] max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-amber-500">
                Assign Application
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
                onClick={handleAssignCancel}
                aria-label="Close assign popup"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Select Staff
              </label>
              <select
                className="border rounded px-3 py-2 w-full text-sm dark:bg-gray-800 dark:text-white"
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
              >
                <option value="">-- Select Staff --</option>
                {staffOptions.map((staff) => (
                  <option key={staff} value={staff}>
                    {staff}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                onClick={handleAssignCancel}
              >
                Cancel
              </button>
              <button
                className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600 disabled:opacity-50"
                onClick={handleAssignConfirm}
                disabled={!selectedStaff}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
