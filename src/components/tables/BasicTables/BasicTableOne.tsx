import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";

// User application interface
interface UserApplication {
  id: number;
  applicationType: string;
  institution: string;
  program: string;
  status: string;
  date: Date;
}

const initialApplications: UserApplication[] = [
  {
    id: 1,
    applicationType: "Undergraduate",
    institution: "Harvard University",
    program: "Computer Science",
    status: "Submitted",
    date: new Date("2025-03-01"),
  },
  {
    id: 2,
    applicationType: "Postgraduate",
    institution: "MIT",
    program: "Mechanical Engineering",
    status: "Under Review",
    date: new Date("2025-03-05"),
  },
  {
    id: 3,
    applicationType: "PhD",
    institution: "Stanford University",
    program: "Physics",
    status: "Approved",
    date: new Date("2025-03-10"),
  },
  {
    id: 4,
    applicationType: "Undergraduate",
    institution: "Yale University",
    program: "Economics",
    status: "Rejected",
    date: new Date("2025-03-15"),
  },
];

export default function BasicTableOne() {
  const [applications, setApplications] =
    useState<UserApplication[]>(initialApplications);
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
    setSelectedIds([]);
  };

  const handleSelect = (id: number) => {
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
    setApplications((prev) =>
      prev.filter((app) => !selectedIds.includes(app.id))
    );
    setSelectedIds([]);
    setShowDeleteWarning(false);
    setEditMode(false);
  };

  const cancelDelete = () => {
    setShowDeleteWarning(false);
  };

  const popupActive = showDeleteWarning;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] relative">
      {/* Edit & Delete Controls */}
      <div
        className={`flex gap-2 p-4 ${
          popupActive
            ? "blur-sm pointer-events-none select-none opacity-60"
            : ""
        }`}
      >
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

      <div
        className={`max-w-full overflow-x-auto ${
          popupActive
            ? "blur-sm pointer-events-none select-none opacity-60"
            : ""
        }`}
      >
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {editMode && (
                <TableCell
                  isHeader
                  className="px-2 py-2 text-center font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Select
                </TableCell>
              )}
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Application Type
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Institution
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Program
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {applications.map((app) => (
              <TableRow key={app.id}>
                {editMode && (
                  <TableCell className="px-2 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(app.id)}
                      onChange={() => handleSelect(app.id)}
                      aria-label={`Select application ${app.id}`}
                      className="accent-amber-500 w-4 h-4"
                    />
                  </TableCell>
                )}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {app.applicationType}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {app.institution}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {app.program}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {app.date.toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      app.status === "Approved"
                        ? "success"
                        : app.status === "Rejected"
                        ? "error"
                        : app.status === "Under Review"
                        ? "warning"
                        : "info"
                    }
                  >
                    {app.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
