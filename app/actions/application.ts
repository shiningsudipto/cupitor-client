"use server";

import { fetchWithAuth, getAuthToken, BASE_URL } from "./shared";

// FormData upload
export async function createApplication(formData: FormData) {
  const token = await getAuthToken();
  const res = await fetch(`${BASE_URL}/application`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  return res.json();
}

export async function getAllApplications(query?: string) {
  const queryString = query ? `?${query}` : "";
  return await fetchWithAuth(`/application${queryString}`, {
    method: "GET",
  });
}

export async function getApplicationById(id: string) {
  return await fetchWithAuth(`/application/${id}`, {
    method: "GET",
  });
}

export async function getApplicationsByCandidate(candidateId: string) {
  return await fetchWithAuth(`/application/candidate/${candidateId}`, {
    method: "GET",
  });
}

export async function getApplicationsByJob(jobId: string) {
  return await fetchWithAuth(`/application/job/${jobId}`, {
    method: "GET",
  });
}

export async function updateApplication(id: string, data: any) {
  return await fetchWithAuth(`/application/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteApplication(id: string) {
  return await fetchWithAuth(`/application/${id}`, {
    method: "DELETE",
  });
}
