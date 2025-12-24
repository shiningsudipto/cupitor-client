"use client";

import { useEffect, useState } from "react";
import { getAllReviews } from "@/app/actions/review";
import { CustomTable } from "@/components/CustomTable";
import { TReview } from "@/types/collections";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviews();
        if (response?.success) {
          setReviews(response.data);
        } else {
          toast.error(response?.message || "Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("An error occurred while fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const columns = [
    {
      key: "rating",
      label: "Rating",
      render: (_value: unknown, row: TReview) => (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "w-4 h-4",
                star <= row.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-600"
              )}
            />
          ))}
          <span className="ml-2 text-sm text-white font-bold">
            {row.rating}.0
          </span>
        </div>
      ),
    },
    {
      key: "comment",
      label: "Comment",
      render: (_value: unknown, row: TReview) => (
        <p className="text-slate-300 text-sm max-w-md truncate">
          {row.comment || "No comment"}
        </p>
      ),
    },
    {
      key: "reviewDate",
      label: "Date",
      render: (_value: unknown, row: TReview) => (
        <span className="text-slate-400 text-xs">
          {row.reviewDate
            ? new Date(row.reviewDate).toLocaleDateString()
            : "N/A"}
        </span>
      ),
    },
    {
      key: "companyId",
      label: "Company ID",
      render: (_value: unknown, row: TReview) => (
        <span className="text-[10px] font-mono text-slate-500">
          {row.companyId}
        </span>
      ),
    },
    {
      key: "candidateId",
      label: "Candidate ID",
      render: (_value: unknown, row: TReview) => (
        <span className="text-[10px] font-mono text-slate-500">
          {row.candidateId}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Reviews</h1>
        <p className="text-slate-400">
          Monitor all platform reviews and feedback.
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
        <CustomTable
          data={reviews}
          columns={columns}
          loading={loading}
          searchable
          searchPlaceholder="Search reviews..."
        />
      </div>
    </div>
  );
}
