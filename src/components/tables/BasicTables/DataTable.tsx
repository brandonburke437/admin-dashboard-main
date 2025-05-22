import React, { useState } from "react";

export default function DataTable() {
  const tableData = [
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

  const [search, setSearch] = useState("");

  // Filter data based on search input (case-insensitive, checks all fields)
  const filteredData = tableData.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-2 w-full max-w-xs dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
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
          {filteredData.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 dark:border-gray-700"
            >
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
                <button className="bg-black text-white px-2 py-1 rounded text-xs hover:bg-gray-700">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
