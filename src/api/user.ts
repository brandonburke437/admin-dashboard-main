// Fetch current user profile
export const fetchUserProfile = async () => {
  const res = await API.get("/user/me");
  return res.data;
};

// Update user profile (info, address, etc.)
export const updateUserProfile = async (data: any) => {
  const res = await API.patch("/user/me", data);
  return res.data;
};

// Update user avatar
export const updateUserAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const res = await API.patch("/user/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

import API from "../utils/api";

export const fetchUserApplications = async (token: string) => {
  const res = await API.get("/applications/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
