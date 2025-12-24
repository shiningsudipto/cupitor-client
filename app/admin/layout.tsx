"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  // If it's the login page, don't show the sidebar or check auth in the same way
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      const role = user.role;
      if (role !== "super_admin" && role !== "admin" && role !== "moderator") {
        router.push("/admin/login");
        return;
      }
    }
  }, [user, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
