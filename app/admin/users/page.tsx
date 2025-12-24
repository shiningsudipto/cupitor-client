"use client";

import { useEffect, useState } from "react";
import { getAllAdmins } from "@/app/actions/admin";
import { CustomTable } from "@/components/CustomTable";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Shield, UserCheck, ShieldCheck, Mail } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface TAdmin {
  _id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "moderator";
}

export default function AdminsAdminPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [admins, setAdmins] = useState<TAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "super_admin") {
      router.push("/admin/dashboard");
      return;
    }

    const fetchAdmins = async () => {
      try {
        const response = await getAllAdmins();
        if (response?.success) {
          setAdmins(response.data);
        } else {
          toast.error(response?.message || "Failed to fetch admins");
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
        toast.error("An error occurred while fetching admins");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [user, router]);

  const columns = [
    {
      key: "name",
      label: "Admin User",
      render: (_value: unknown, row: TAdmin) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">{row.name}</span>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Mail className="w-3 h-3" />
            {row.email}
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (_value: unknown, row: TAdmin) => {
        const roleConfig: Record<
          string,
          { color: string; icon: typeof ShieldCheck }
        > = {
          super_admin: {
            color: "bg-red-600/20 text-red-300 border-red-500/30",
            icon: ShieldCheck,
          },
          admin: {
            color: "bg-purple-600/20 text-purple-300 border-purple-500/30",
            icon: UserCheck,
          },
          moderator: {
            color: "bg-blue-600/20 text-blue-300 border-blue-500/30",
            icon: Shield,
          },
        };
        const config = roleConfig[row.role] || roleConfig.moderator;
        const Icon = config.icon;
        return (
          <Badge className={config.color} variant="outline">
            <Icon className="w-3 h-3 mr-1" />
            {row.role.replace("_", " ").toUpperCase()}
          </Badge>
        );
      },
    },
    {
      key: "_id",
      label: "Admin ID",
      render: (_value: unknown, row: TAdmin) => (
        <span className="text-[10px] font-mono text-slate-500">{row._id}</span>
      ),
    },
  ];

  if (!user || user.role !== "super_admin") return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Management
          </h1>
          <p className="text-slate-400">
            Manage administrative users and their permissions.
          </p>
        </div>
        <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center border border-red-500/30">
          <ShieldCheck className="w-6 h-6 text-red-400" />
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
        <CustomTable
          data={admins}
          columns={columns}
          loading={loading}
          searchable
        />
      </div>
    </div>
  );
}
