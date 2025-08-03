import PageBreadcrumb from "../admin/admin-component/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import { useEffect, useState } from "react";
import {
  fetchUserProfile,
  updateUserProfile,
  updateUserAvatar,
} from "../api/user";
import PageMeta from "../admin/admin-component/common/PageMeta";

export default function UserProfiles() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile()
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  // Save handler for info/address
  const handleProfileUpdate = async (updates) => {
    try {
      const updated = await updateUserProfile(updates);
      setProfile((prev) => ({ ...prev, ...updated }));
    } catch {
      setError("Failed to update profile");
    }
  };

  // Save handler for avatar
  const handleAvatarUpdate = async (file) => {
    try {
      const updated = await updateUserAvatar(file);
      setProfile((prev) => ({ ...prev, avatar: updated.avatar }));
    } catch {
      setError("Failed to update avatar");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <PageMeta
        title="Profile | GNPC Scholarship Portal"
        description="View and manage your user profile on the GNPC Scholarship Portal. Update your personal information, address, and account details."
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard profile={profile} onAvatarUpdate={handleAvatarUpdate} />
          <UserInfoCard profile={profile} onSave={handleProfileUpdate} />
          <UserAddressCard profile={profile} onSave={handleProfileUpdate} />
        </div>
      </div>
    </>
  );
}
