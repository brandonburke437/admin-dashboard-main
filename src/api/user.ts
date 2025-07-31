// src/api/user.ts
import API from "../utils/api";

export const fetchUserApplications = async (token: string) => {
  const res = await API.get("/applications/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
