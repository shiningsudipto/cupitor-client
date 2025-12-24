import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Cupitor",
  description: "Cupitor Admin Panel - Manage your platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
