"use server";

import { fetchWithAuth, getAuthToken, BASE_URL } from "./shared";

export async function analyzeResume(formData: FormData) {
  const token = await getAuthToken();
  const res = await fetch(`${BASE_URL}/resumeAnalysis/analyze`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  return res.json();
}

export async function analyzeResumeForJob(data: any) {
  return await fetchWithAuth("/resumeAnalysis/analyze-for-job", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllAnalyses() {
  return await fetchWithAuth("/resumeAnalysis", {
    method: "GET",
  });
}

export async function getAnalysisById(id: string) {
  return await fetchWithAuth(`/resumeAnalysis/${id}`, {
    method: "GET",
  });
}

export async function getCandidateAnalyses(candidateId: string) {
  return await fetchWithAuth(`/resumeAnalysis/candidate/${candidateId}`, {
    method: "GET",
  });
}

export async function deleteAnalysis(id: string) {
  return await fetchWithAuth(`/resumeAnalysis/${id}`, {
    method: "DELETE",
  });
}

export async function updateAnalysisTitle(id: string, data: any) {
  return await fetchWithAuth(`/resumeAnalysis/${id}/title`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
