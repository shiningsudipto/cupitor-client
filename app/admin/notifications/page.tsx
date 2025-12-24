"use client";

import { useEffect, useState } from "react";
import { getAllNotifications } from "@/app/actions/notification";
import { CustomTable } from "@/components/CustomTable";
import { TNotification } from "@/types/collections";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, Circle } from "lucide-react";

export default function NotificationsAdminPage() {
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAllNotifications();
        if (response?.success) {
          setNotifications(response.data);
        } else {
          toast.error(response?.message || "Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("An error occurred while fetching notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const columns = [
    {
      key: "isRead",
      label: "Status",
      render: (_value: unknown, row: TNotification) =>
        row.isRead ? (
          <span title="Read">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </span>
        ) : (
          <span title="Unread">
            <Circle className="w-5 h-5 text-purple-500 fill-purple-500/20" />
          </span>
        ),
    },
    {
      key: "title",
      label: "Title",
      render: (_value: unknown, row: TNotification) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">{row.title}</span>
          <span className="text-xs text-slate-400 max-w-xs truncate">
            {row.message}
          </span>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (_value: unknown, row: TNotification) => {
        const typeColors: Record<string, string> = {
          application: "bg-blue-600/20 text-blue-300",
          job: "bg-green-600/20 text-green-300",
          review: "bg-yellow-600/20 text-yellow-300",
          general: "bg-slate-700/50 text-slate-300",
        };
        return (
          <Badge
            className={typeColors[row.type] || typeColors.general}
          >
            {row.type}
          </Badge>
        );
      },
    },
    {
      key: "userType",
      label: "To User",
      render: (_value: unknown, row: TNotification) => (
        <span className="text-slate-300 capitalize">
          {row.userType}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (_value: unknown, row: TNotification) => (
        <span className="text-slate-400 text-xs text-right">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleString()
            : "N/A"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-slate-400">
            View and audit all system notifications.
          </p>
        </div>
        <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
          <Bell className="w-6 h-6 text-purple-400" />
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
        <CustomTable
          data={notifications}
          columns={columns}
          loading={loading}
          searchable
          searchPlaceholder="Search notifications..."
        />
      </div>
    </div>
  );
}
