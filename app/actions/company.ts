"use server";

import { fetchWithAuth } from "./shared";

export async function createCompany(data: any) {
  return await fetchWithAuth("/company", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllCompanies(query?: string) {
  const queryString = query ? `?${query}` : "";
  return await fetchWithAuth(`/company${queryString}`, {
    method: "GET",
  });
}

export async function getCompanyByUsername(username: string) {
  return await fetchWithAuth(`/company/${username}`, {
    method: "GET",
  });
}

export async function getCompanyBySlug(slug: string) {
  return await fetchWithAuth(`/company/slug/${slug}`, {
    method: "GET",
  });
}

export async function getCompanyById(id: string) {
  return await fetchWithAuth(`/company/${id}`, {
    method: "GET",
  });
}

export async function deleteCompany(id: string) {
  return await fetchWithAuth(`/company/${id}`, {
    method: "DELETE",
  });
}

export async function createCompanyType(data: any) {
  return await fetchWithAuth("/company/company-type", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllCompanyTypes() {
  return await fetchWithAuth("/company/company-type", {
    method: "GET",
  });
}
