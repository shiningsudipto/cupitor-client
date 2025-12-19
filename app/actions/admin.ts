"use server";

import { fetchWithAuth } from "./shared";

export async function createAdmin(data: any) {
  return await fetchWithAuth("/admin", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllAdmins() {
  return await fetchWithAuth("/admin", {
    method: "GET",
  });
}

export async function getAdminById(id: string) {
  return await fetchWithAuth(`/admin/${id}`, {
    method: "GET",
  });
}

export async function updateAdmin(id: string, data: any) {
  return await fetchWithAuth(`/admin/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdmin(id: string) {
  return await fetchWithAuth(`/admin/${id}`, {
    method: "DELETE",
  });
}
