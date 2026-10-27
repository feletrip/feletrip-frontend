import axios from "axios";

export const api = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

// export default api; 

export const updateProfile = async (
  userId: string,
  payload: {
    name: string
    phone: string
    avatar: string
    nidFront?: string
    nidBack?: string
    tradeLicense?: string
  }
) => { 
  const res = await fetch(`/auth/update-profile/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Update failed")
  }

  return data
}