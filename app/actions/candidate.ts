"use server";

import { fetchWithAuth } from "./shared";

export async function getAllCandidates(query?: string) {
  const queryString = query ? `?${query}` : "";
  return await fetchWithAuth(`/candidate${queryString}`, {
    method: "GET",
  });
}

export async function getCandidateById(id: string) {
  return await fetchWithAuth(`/candidate/${id}`, {
    method: "GET",
  });
}

export async function getCandidateBySlug(slug: string) {
  return await fetchWithAuth(`/candidate/slug/${slug}`, {
    method: "GET",
  });
}

export async function updateCandidate(id: string, data: any) {
  return await fetchWithAuth(`/candidate/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Note: Avatar update typically requires FormData handling which might need different headers logic
// For now, assuming JSON if `data` contains image URL, or if it's FormData we need to adjust `fetchWithAuth`
export async function updateCandidateAvatar(id: string, formData: FormData) {
  // We need to bypass the default JSON header for FormData
  // We'll implementation valid custom fetch here
  const { getAuthToken, BASE_URL } = await import("./shared");
  const token = await getAuthToken();

  const res = await fetch(`${BASE_URL}/candidate/avatar/${id}`, {
    method: "PUT",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  return res.json();
}
