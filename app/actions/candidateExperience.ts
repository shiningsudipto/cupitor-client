"use server";

import { fetchWithAuth } from "./shared";
import { TCandidateExperience } from "@/types/collections";

export async function createCandidateExperience(data: Omit<TCandidateExperience, "_id">) {
  return await fetchWithAuth("/candidateExperience", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllCandidateExperiences() {
  return await fetchWithAuth("/candidateExperience", {
    method: "GET",
  });
}

export async function getCandidateExperienceById(id: string) {
  return await fetchWithAuth(`/candidateExperience/${id}`, {
    method: "GET",
  });
}

export async function getCandidateExperiencesByCandidate(candidateId: string) {
  return await fetchWithAuth(`/candidateExperience/candidate/${candidateId}`, {
    method: "GET",
  });
}

export async function updateCandidateExperience(id: string, data: Partial<Omit<TCandidateExperience, "_id">>) {
  return await fetchWithAuth(`/candidateExperience/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCandidateExperience(id: string) {
  return await fetchWithAuth(`/candidateExperience/${id}`, {
    method: "DELETE",
  });
}
