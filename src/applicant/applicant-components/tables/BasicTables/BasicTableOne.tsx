import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
// import Badge from "../../ui/badge/Badge";
import Badge from "../../../../components/ui/badge/Badge";

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
  const [viewedApp, setViewedApp] = useState<UserApplication | null>(null);
  const [editApp, setEditApp] = useState<UserApplication | null>(null);

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

  // Handler for saving edits
  const handleSaveEdit = () => {
    if (editApp) {
      setApplications((prev) =>
        prev.map((app) => (app.id === editApp.id ? editApp : app))
      );
      setEditApp(null);
      setViewedApp(null);
    }
  };

  // Handler for canceling view/edit
  const handleCloseModal = () => {
    setViewedApp(null);
    setEditApp(null);
  };

  const popupActive = showDeleteWarning;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] relative">
      {/* Edit & Delete Controls */}
      <div
        className={`flex gap-2 p-4 justify-end ${
          popupActive
            ? "blur-sm pointer-events-none select-none opacity-60"
            : ""
        }`}
      >
        <button
          className={`px-3 py-2  text-xs font-semibold rounded-2xl ${
            editMode
              ? "bg-black text-white hover:bg-gray-400"
              : "bg-black text-white hover:bg-gray-700"
          }`}
          onClick={handleEditMode}
        >
          {editMode ? "Cancel" : "Select"}
        </button>
        {editMode && (
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-2xlcreate text-xs font-semibold hover:bg-red-600"
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

      {/* View/Edit Modal */}
      {(viewedApp || editApp) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg min-w-[320px] max-w-full">
            <h3 className="text-lg font-semibold mb-4 text-amber-500">
              {editApp ? "Edit Application" : "View Application"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
              className="flex flex-col gap-3"
            >
              <label>
                <span className="block text-xs mb-1">Application Type</span>
                <input
                  className="border px-2 py-1 rounded w-full"
                  value={
                    editApp
                      ? editApp.applicationType
                      : viewedApp?.applicationType || ""
                  }
                  onChange={(e) =>
                    editApp &&
                    setEditApp({
                      ...editApp,
                      applicationType: e.target.value,
                    })
                  }
                  disabled={!editApp}
                />
              </label>
              <label>
                <span className="block text-xs mb-1">Institution</span>
                <input
                  className="border px-2 py-1 rounded w-full"
                  value={
                    editApp ? editApp.institution : viewedApp?.institution || ""
                  }
                  onChange={(e) =>
                    editApp &&
                    setEditApp({ ...editApp, institution: e.target.value })
                  }
                  disabled={!editApp}
                />
              </label>
              <label>
                <span className="block text-xs mb-1">Program</span>
                <input
                  className="border px-2 py-1 rounded w-full"
                  value={editApp ? editApp.program : viewedApp?.program || ""}
                  onChange={(e) =>
                    editApp &&
                    setEditApp({ ...editApp, program: e.target.value })
                  }
                  disabled={!editApp}
                />
              </label>
              <label>
                <span className="block text-xs mb-1">Date</span>
                <input
                  type="date"
                  className="border px-2 py-1 rounded w-full"
                  value={
                    editApp
                      ? editApp.date.toISOString().split("T")[0]
                      : viewedApp
                      ? viewedApp.date.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    editApp &&
                    setEditApp({
                      ...editApp,
                      date: new Date(e.target.value),
                    })
                  }
                  disabled={!editApp}
                />
              </label>
              <label>
                <span className="block text-xs mb-1">Status</span>
                <input
                  className="border px-2 py-1 rounded w-full"
                  value={editApp ? editApp.status : viewedApp?.status || ""}
                  onChange={(e) =>
                    editApp &&
                    setEditApp({ ...editApp, status: e.target.value })
                  }
                  disabled={!editApp}
                />
              </label>
              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                {editApp && (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                )}
                {!editApp &&
                  (viewedApp?.status === "Submitted" ||
                    viewedApp?.status === "Under Review") && (
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => setEditApp(viewedApp)}
                    >
                      Edit
                    </button>
                  )}
              </div>
            </form>
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
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
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
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => setViewedApp(app)}
                    >
                      View
                    </button>
                    {(app.status === "Submitted" ||
                      app.status === "Under Review") && (
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => setEditApp(app)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
