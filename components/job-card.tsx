import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/constants/jobs";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Bookmark,
  Star,
} from "lucide-react";

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export function JobCard({ job, featured = false }: JobCardProps) {
  const formattedDate = new Date(job.postedDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedSalary = `$${(job.salaryRange.min / 1000).toFixed(0)}k - $${(
    job.salaryRange.max / 1000
  ).toFixed(0)}k`;

  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${
        featured ? "border-2 border-purple-500/50" : ""
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-xs font-semibold rounded-bl-lg flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          Featured
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link
              href={`/jobs/${job.id}`}
              className="hover:text-purple-600 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                {job.title}
              </h3>
            </Link>
            <Link
              href={`/companies/${job.companyId}`}
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >
              {job.company}
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 hover:text-purple-600 hover:bg-purple-50"
          >
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Job Details */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{formattedSalary}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Skills/Tags */}
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 4} more
            </Badge>
          )}
        </div>

        {/* Remote Badge */}
        {job.remote && (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            🌍 Remote
          </Badge>
        )}

        {/* Description Preview */}
        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-500">
            {job.applicantsCount} applicants
          </span>
          <Link href={`/jobs/${job.id}`}>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
