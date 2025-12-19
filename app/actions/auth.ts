"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "./shared";

export async function registerCandidate(data: any) {
  const res = await fetch(`${BASE_URL}/auth/register/candidate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (result.success && result.data?.accessToken) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      path: "/",
    });
  }
  return result;
}

export async function registerCompany(data: any) {
  const res = await fetch(`${BASE_URL}/auth/register/company`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (result.success && result.data?.accessToken) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      path: "/",
    });
  }
  return result;
}

export async function loginUser(data: any) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success && result.data?.accessToken) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      path: "/",
    });
  }

  return result;
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  return { success: true };
}
