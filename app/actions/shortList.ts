"use server";

import { fetchWithAuth } from "./shared";

export async function createShortList(data: any) {
  return await fetchWithAuth("/shortList", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllShortLists() {
  return await fetchWithAuth("/shortList", {
    method: "GET",
  });
}

export async function getShortListById(id: string) {
  return await fetchWithAuth(`/shortList/${id}`, {
    method: "GET",
  });
}

export async function getShortListsByJob(jobId: string) {
  return await fetchWithAuth(`/shortList/job/${jobId}`, {
    method: "GET",
  });
}

export async function getShortListsByCompany(companyId: string) {
  return await fetchWithAuth(`/shortList/company/${companyId}`, {
    method: "GET",
  });
}

export async function getShortListsByCandidate(candidateId: string) {
  return await fetchWithAuth(`/shortList/candidate/${candidateId}`, {
    method: "GET",
  });
}

export async function deleteShortList(id: string) {
  return await fetchWithAuth(`/shortList/${id}`, {
    method: "DELETE",
  });
}
