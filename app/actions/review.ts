"use server";

import { fetchWithAuth } from "./shared";

export async function createReview(data: any) {
  return await fetchWithAuth("/review", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllReviews() {
  return await fetchWithAuth("/review", {
    method: "GET",
  });
}

export async function getReviewById(id: string) {
  return await fetchWithAuth(`/review/${id}`, {
    method: "GET",
  });
}

export async function getReviewsByCompany(companyId: string) {
  return await fetchWithAuth(`/review/company/${companyId}`, {
    method: "GET",
  });
}

export async function getReviewsByCandidate(candidateId: string) {
  return await fetchWithAuth(`/review/candidate/${candidateId}`, {
    method: "GET",
  });
}

export async function updateReview(id: string, data: any) {
  return await fetchWithAuth(`/review/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteReview(id: string) {
  return await fetchWithAuth(`/review/${id}`, {
    method: "DELETE",
  });
}
