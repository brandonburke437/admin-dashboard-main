import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table/index";
import Badge from "../../components/ui/badge/Badge";
// import { useNavigate } from "react-router-dom";
import { FileIcon } from "../../icons";
import { PencilIcon } from "@heroicons/react/24/solid";

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
  // const navigate = useNavigate();

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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.04] shadow-lg relative">
      {/* Edit & Delete Controls */}
      <div
        className={`flex justify-end gap-2 p-4 border-b border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-gray-900/40 ${
          popupActive
            ? "blur-sm pointer-events-none select-none opacity-60"
            : ""
        }`}
      >
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
            editMode
              ? "bg-black text-white hover:bg-gray-400"
              : "bg-black text-white hover:bg-gray-700"
          }`}
          onClick={handleEditMode}
        >
          <PencilIcon className="w-4 h-4" />
          {editMode ? "Cancel" : "Edit"}
        </button>
        {editMode && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400/40"
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
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl min-w-[320px] max-w-full border border-amber-100 dark:border-gray-700">
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
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-gray-900/40">
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
                className="px-5 py-3 font-semibold text-gray-700 text-start text-theme-xs dark:text-white/80"
              >
                Application Type
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-700 text-start text-theme-xs dark:text-white/80"
              >
                Institution
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-700 text-start text-theme-xs dark:text-white/80"
              >
                Program
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-700 text-start text-theme-xs dark:text-white/80"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-semibold text-gray-700 text-start text-theme-xs dark:text-white/80"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.07]">
            {applications.map((app, idx) => (
              <TableRow
                key={app.id}
                className={
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900/30 hover:bg-amber-50/60 dark:hover:bg-amber-900/10"
                    : "bg-amber-50/40 dark:bg-gray-800/30 hover:bg-amber-50/60 dark:hover:bg-amber-900/10"
                }
              >
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
                  <span className="flex font-semibold text-gray-800 text-theme-base dark:text-white/90 items-center gap-2">
                    <FileIcon className="w-5 h-5 text-amber-500" />
                    {app.applicationType}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-base dark:text-white/80">
                  {app.institution}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-base dark:text-white/80">
                  {app.program}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-600 text-start text-theme-base dark:text-gray-300">
                  {app.date.toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <Badge
                    size="md"
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
