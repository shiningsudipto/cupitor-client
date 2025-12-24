"use client";

import { useEffect, useState } from "react";
import { getAllCandidates } from "@/app/actions/candidate";
import { CustomTable } from "@/components/CustomTable";
import { TCandidate } from "@/types/collections";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function CandidatesAdminPage() {
  const [candidates, setCandidates] = useState<TCandidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await getAllCandidates();
        if (response?.success) {
          setCandidates(response.data);
        } else {
          toast.error(response?.message || "Failed to fetch candidates");
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
        toast.error("An error occurred while fetching candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const columns = [
    {
      key: "name",
      label: "Candidate",
      render: (_value: unknown, row: TCandidate) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.avatar} alt={row.name} />
            <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-white">{row.name}</span>
            <span className="text-xs text-slate-400">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "city",
      label: "Location",
      render: (_value: unknown, row: TCandidate) => (
        <span className="text-slate-300">{row.city || "Not specified"}</span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (_value: unknown, row: TCandidate) => (
        <span className="text-slate-300">{row.phone || "N/A"}</span>
      ),
    },
    {
      key: "skills",
      label: "Skills",
      render: (_value: unknown, row: TCandidate) => (
        <div className="flex flex-wrap gap-1">
          {row.skills?.slice(0, 3).map((skill: string) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-[10px] border-purple-500/30 text-purple-300"
            >
              {skill}
            </Badge>
          ))}
          {(row.skills?.length ?? 0) > 3 && (
            <span className="text-[10px] text-slate-500">
              +{(row.skills?.length ?? 0) - 3}
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Candidates</h1>
        <p className="text-slate-400">
          Manage all candidates registered on the platform.
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
        <CustomTable
          data={candidates}
          columns={columns}
          loading={loading}
          searchable
          searchPlaceholder="Search candidates..."
        />
      </div>
    </div>
  );
}
