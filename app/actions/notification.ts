"use server";

import { fetchWithAuth } from "./shared";

export async function createNotification(data: any) {
  return await fetchWithAuth("/notification", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllNotifications() {
  return await fetchWithAuth("/notification", {
    method: "GET",
  });
}

export async function getNotificationById(id: string) {
  return await fetchWithAuth(`/notification/${id}`, {
    method: "GET",
  });
}

export async function getNotificationsByUser(userId: string) {
  return await fetchWithAuth(`/notification/user/${userId}`, {
    method: "GET",
  });
}

export async function getUnreadNotificationsByUser(userId: string) {
  return await fetchWithAuth(`/notification/user/${userId}/unread`, {
    method: "GET",
  });
}

export async function markNotificationAsRead(id: string) {
  return await fetchWithAuth(`/notification/${id}/read`, {
    method: "PUT",
  });
}

export async function markAllNotificationsAsRead(userId: string) {
  return await fetchWithAuth(`/notification/user/${userId}/read-all`, {
    method: "PUT",
  });
}

export async function deleteNotification(id: string) {
  return await fetchWithAuth(`/notification/${id}`, {
    method: "DELETE",
  });
}
