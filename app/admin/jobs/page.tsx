"use client";

import { useEffect, useState } from "react";
import { getAllJobs } from "@/app/actions/job";
import { CustomTable } from "@/components/CustomTable";
import { TJob } from "@/types/collections";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase } from "lucide-react";

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        if (response?.success) {
          setJobs(response.data);
        } else {
          toast.error(response?.message || "Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("An error occurred while fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const columns = [
    {
      key: "title",
      label: "Job Title",
      render: (_value: unknown, row: TJob & { _id?: string }) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">{row.title}</span>
          {row._id && <span className="text-xs text-slate-400">ID: {row._id}</span>}
        </div>
      ),
    },
    {
      key: "jobType",
      label: "Job Type",
      render: (_value: unknown, row: TJob & { jobType: string | { _id: string; label: string } }) => {
        const jobTypeLabel = typeof row.jobType === 'string' ? row.jobType : row.jobType?.label || 'N/A';
        return (
          <Badge
            variant="outline"
            className="text-xs border-blue-500/30 text-blue-300"
          >
            <Briefcase className="w-3 h-3 mr-1" />
            {jobTypeLabel}
          </Badge>
        );
      },
    },
    {
      key: "salaryRange",
      label: "Salary",
      render: (_value: unknown, row: TJob) => (
        <span className="text-slate-300 font-medium">
          {row.salaryRange || "Not specified"}
        </span>
      ),
    },
    {
      key: "deadline",
      label: "Deadline",
      render: (_value: unknown, row: TJob) => (
        <div className="flex items-center text-slate-400 text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(row.deadline).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "experience_level",
      label: "Experience",
      render: (_value: unknown, row: TJob) => (
        <Badge
          variant="secondary"
          className="bg-slate-800 text-slate-300 border-none"
        >
          {row.experience_level}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Jobs</h1>
        <p className="text-slate-400">
          Manage all job postings across the platform.
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
        <CustomTable
          data={jobs}
          columns={columns}
          loading={loading}
          searchable
          searchPlaceholder="Search jobs..."
        />
      </div>
    </div>
  );
}
