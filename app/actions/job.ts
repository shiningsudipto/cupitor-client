"use server";

import { fetchWithAuth } from "./shared";

export async function createJob(data: any) {
  return await fetchWithAuth("/job", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllJobs(query?: string) {
  const queryString = query ? `?${query}` : "";
  return await fetchWithAuth(`/job${queryString}`, {
    method: "GET",
  });
}

export async function getJobById(id: string) {
  return await fetchWithAuth(`/job/${id}`, {
    method: "GET",
  });
}

export async function getJobsByCompany(companyId: string) {
  return await fetchWithAuth(`/job/company/${companyId}`, {
    method: "GET",
  });
}

export async function updateJob(id: string, data: any) {
  return await fetchWithAuth(`/job/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteJob(id: string) {
  return await fetchWithAuth(`/job/${id}`, {
    method: "DELETE",
  });
}

export async function createJobType(data: any) {
  return await fetchWithAuth("/job/job-type", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllJobTypes() {
  return await fetchWithAuth("/job/job-type", {
    method: "GET",
  });
}
