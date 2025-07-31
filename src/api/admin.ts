// src/api/admin.ts
import API from "../utils/api";

export const fetchRecentApplications = async (token: string) => {
  const res = await API.get("/applications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
