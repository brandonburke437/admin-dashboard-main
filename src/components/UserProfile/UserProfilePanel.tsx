import React, { useState } from "react";
import Badge from "../ui/badge/Badge";

// Mock data for demonstration
const user = {
  fullName: "Lindsey Curtis",
  email: "lindsey.curtis@example.com",
  phone: "+1 555-123-4567",
  registrationDate: "2025-03-01",
  accountType: "Student",
  status: "Active",
};

const applications = [
  {
    id: "APP-001",
    type: "UG",
    submissionDate: "2025-03-10",
    status: "Pending",
  },
  {
    id: "APP-002",
    type: "PG",
    submissionDate: "2025-04-01",
    status: "Approved",
  },
];

const documents = [
  { name: "Transcript.pdf", url: "/docs/transcript.pdf" },
  { name: "ID Card.jpg", url: "/docs/idcard.jpg" },
];

const loginHistory = [
  "2025-08-01 09:15:23",
  "2025-07-30 18:42:10",
  "2025-07-28 14:05:55",
];

type UserProfilePanelProps = {
  onClose?: () => void;
};

const UserProfilePanel: React.FC<UserProfilePanelProps> = ({ onClose }) => {
  const [status, setStatus] = useState(user.status);
  const [showConfirm, setShowConfirm] = useState<null | string>(null);
  const [feedback, setFeedback] = useState("");

  // Handlers for admin actions
  const handleSuspendActivate = () => {
    setShowConfirm("suspend");
  };
  const handleResetPassword = () => {
    setShowConfirm("reset");
  };
  const handleDelete = () => {
    setShowConfirm("delete");
  };

  const confirmAction = () => {
    if (showConfirm === "suspend") {
      setStatus(status === "Active" ? "Suspended" : "Active");
      setFeedback(
        status === "Active" ? "Account suspended." : "Account activated."
      );
    } else if (showConfirm === "reset") {
      setFeedback("Password reset link sent.");
    } else if (showConfirm === "delete") {
      setFeedback("Account deleted.");
    }
    setShowConfirm(null);
    setTimeout(() => setFeedback(""), 2000);
  };
  const cancelAction = () => setShowConfirm(null);

  return (
    <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
        >
          &times;
        </button>
      )}
      {/* User Account Info */}
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
            <img
              src="/images/user/user-17.jpg"
              alt={user.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
              {user.fullName}
            </div>
            <Badge
              size="sm"
              color={
                status === "Active"
                  ? "success"
                  : status === "Suspended"
                  ? "warning"
                  : "error"
              }
            >
              {status}
            </Badge>
          </div>
        </div>
        <div className="text-theme-sm text-gray-600 dark:text-gray-300 mb-1">
          {user.email}
        </div>
        <div className="text-theme-sm text-gray-600 dark:text-gray-300 mb-1">
          {user.phone}
        </div>
        <div className="text-theme-xs text-gray-400 mb-1">
          Registered: {user.registrationDate}
        </div>
        <div className="text-theme-xs text-gray-400">
          Account Type: {user.accountType}
        </div>
      </div>

      {/* Admin Controls */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-theme-xs font-medium transition-colors"
          onClick={handleSuspendActivate}
        >
          {status === "Active" ? "Suspend Account" : "Activate Account"}
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 text-theme-xs font-medium transition-colors"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-red-100 text-red-800 hover:bg-red-200 text-theme-xs font-medium transition-colors"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-xs text-center">
            <div className="mb-4 text-gray-800 dark:text-white font-semibold">
              {showConfirm === "suspend" &&
                (status === "Active"
                  ? "Suspend this account?"
                  : "Activate this account?")}
              {showConfirm === "reset" &&
                "Send password reset link to this user?"}
              {showConfirm === "delete" &&
                "Delete this account? This cannot be undone."}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-theme-xs font-medium"
                onClick={cancelAction}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-theme-xs font-medium"
                onClick={confirmAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Message */}
      {feedback && (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-theme-xs font-medium">
          {feedback}
        </div>
      )}

      {/* Applications Overview */}
      <div className="mb-6">
        <div className="font-semibold text-gray-700 dark:text-white mb-2">
          Applications Overview
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-theme-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Submitted</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b last:border-0 border-gray-100 dark:border-gray-800"
                >
                  <td className="py-2 pr-4">{app.id}</td>
                  <td className="py-2 pr-4">{app.type}</td>
                  <td className="py-2 pr-4">{app.submissionDate}</td>
                  <td className="py-2 pr-4">
                    <Badge
                      size="sm"
                      color={
                        app.status === "Approved"
                          ? "success"
                          : app.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {app.status}
                    </Badge>
                  </td>
                  <td className="py-2">
                    <button className="text-blue-500 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="mb-6">
        <div className="font-semibold text-gray-700 dark:text-white mb-2">
          Uploaded Documents
        </div>
        <ul className="space-y-1">
          {documents.map((doc) => (
            <li key={doc.name} className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-300 text-theme-sm">
                {doc.name}
              </span>
              <a
                href={doc.url}
                download
                className="text-blue-500 hover:underline text-theme-xs"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Login History */}
      <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
        <div className="font-semibold text-gray-700 dark:text-white mb-2 text-theme-sm">
          Recent Logins
        </div>
        <ul className="space-y-1">
          {loginHistory.map((ts, i) => (
            <li
              key={i}
              className="text-gray-500 dark:text-gray-400 text-theme-xs"
            >
              {ts}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfilePanel;
