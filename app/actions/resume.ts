"use server";

import { fetchWithAuth, getAuthToken, BASE_URL } from "./shared";

export async function createResume(formData: FormData) {
  const token = await getAuthToken();
  const res = await fetch(`${BASE_URL}/resume`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  return res.json();
}

export async function getAllResumes() {
  return await fetchWithAuth("/resume", {
    method: "GET",
  });
}

export async function getResumeById(id: string) {
  return await fetchWithAuth(`/resume/${id}`, {
    method: "GET",
  });
}

export async function getResumesByCandidate(candidateId: string) {
  return await fetchWithAuth(`/resume/candidate/${candidateId}`, {
    method: "GET",
  });
}

export async function updateResume(id: string, formData: FormData) {
  const token = await getAuthToken();
  const res = await fetch(`${BASE_URL}/resume/${id}`, {
    method: "PUT",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  return res.json();
}

export async function deleteResume(id: string) {
  return await fetchWithAuth(`/resume/${id}`, {
    method: "DELETE",
  });
}
