"use server";

import { fetchWithAuth } from "./shared";

export async function createSavedJob(data: any) {
  return await fetchWithAuth("/savedJob", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllSavedJobs() {
  return await fetchWithAuth("/savedJob", {
    method: "GET",
  });
}

export async function getSavedJobById(id: string) {
  return await fetchWithAuth(`/savedJob/${id}`, {
    method: "GET",
  });
}

export async function getSavedJobsByCandidate(candidateId: string) {
  return await fetchWithAuth(`/savedJob/candidate/${candidateId}`, {
    method: "GET",
  });
}

export async function deleteSavedJob(id: string) {
  return await fetchWithAuth(`/savedJob/${id}`, {
    method: "DELETE",
  });
}

export async function unsaveJob(data: any) {
  return await fetchWithAuth("/savedJob/unsave", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
