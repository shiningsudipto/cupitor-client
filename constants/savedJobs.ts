import { TSavedJob } from "@/types/collections";

export const dummySavedJobs: TSavedJob[] = [
  {
    _id: "sj-1",
    jobId: "1",
    candidateId: "cand-1",
    savedAt: new Date("2025-11-16T10:30:00Z"),
  },
  {
    _id: "sj-2",
    jobId: "2",
    candidateId: "cand-3",
    savedAt: new Date("2025-11-18T15:00:00Z"),
  },
  {
    _id: "sj-3",
    jobId: "3",
    candidateId: "cand-2",
    savedAt: new Date("2025-11-12T09:00:00Z"),
  },
  {
    _id: "sj-4",
    jobId: "4",
    candidateId: "cand-5",
    savedAt: new Date("2025-11-14T11:20:00Z"),
  },
  {
    _id: "sj-5",
    jobId: "5",
    candidateId: "cand-4",
    savedAt: new Date("2025-11-15T14:45:00Z"),
  },
  {
    _id: "sj-6",
    jobId: "6",
    candidateId: "cand-7",
    savedAt: new Date("2025-11-17T08:30:00Z"),
  },
  {
    _id: "sj-7",
    jobId: "7",
    candidateId: "cand-8",
    savedAt: new Date("2025-11-19T13:15:00Z"),
  },
  {
    _id: "sj-8",
    jobId: "8",
    candidateId: "cand-6",
    savedAt: new Date("2025-11-20T16:00:00Z"),
  },
];
