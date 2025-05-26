import React, { useState } from "react";

export default function DataTable() {
  const initialData = [
    {
      applicationId: "APP-001",
      applicationType: "Undergraduate",
      institution: "Harvard University",
      program: "Computer Science",
      submissionDate: "2024-05-01",
      status: "Submitted",
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

  const [tableData, setTableData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: "All",
    submissionDate: "",
    program: "All",
    institution: "All",
    applicationType: "All",
    applicationId: "",
  });

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
    setTableData((prev) =>
      prev.filter((item) => !selectedIds.includes(item.applicationId))
    );
    setSelectedIds([]);
  };

  // UI
  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-2 w-full max-w-xs dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Application ID"
          className="border rounded px-3 py-2 w-36 text-sm dark:bg-gray-800 dark:text-white"
          value={filters.applicationId}
          onChange={(e) =>
            setFilters((f) => ({ ...f, applicationId: e.target.value }))
          }
        />
        <select
          className="border rounded px-3 py-2 w-36 text-sm dark:bg-gray-800 dark:text-white"
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
        <select
          className="border rounded px-3 py-2 w-36 text-sm dark:bg-gray-800 dark:text-white"
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
        <select
          className="border rounded px-3 py-2 w-36 text-sm dark:bg-gray-800 dark:text-white"
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
        <select
          className="border rounded px-3 py-2 w-36 text-sm dark:bg-gray-800 dark:text-white"
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
        <input
          type="date"
          className="border rounded px-3 py-2 w-44 text-sm dark:bg-gray-800 dark:text-white"
          value={filters.submissionDate}
          onChange={(e) =>
            setFilters((f) => ({ ...f, submissionDate: e.target.value }))
          }
        />
        <button
          className={`px-3 py-2 rounded text-xs font-semibold ${
            editMode
              ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
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
      <div className="overflow-x-auto">
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
                    <button className="bg-amber-500 text-white px-2 py-1 rounded text-xs hover:bg-amber-600">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
