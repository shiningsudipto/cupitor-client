import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { dummyJobs, dummyCompanies } from "@/constants";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  Bookmark,
  Share2,
  Building2,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = dummyJobs.find((j) => j.id === params.id);
  const company = job
    ? dummyCompanies.find((c) => c.id === job.companyId)
    : null;

  if (!job || !company) {
    notFound();
  }

  const formattedDate = new Date(job.postedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedSalary = `$${(job.salaryRange.min / 1000).toFixed(0)}k - $${(
    job.salaryRange.max / 1000
  ).toFixed(0)}k ${job.salaryRange.currency}/year`;

  // Get related jobs (same category, excluding current)
  const relatedJobs = dummyJobs
    .filter((j) => j.category === job.category && j.id !== job.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl shrink-0">
                  {company.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {job.title}
                  </h1>
                  <Link
                    href={`/companies/${company.id}`}
                    className="text-lg text-purple-600 hover:underline font-medium"
                  >
                    {company.name}
                  </Link>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Overview Card */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Job Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Location</span>
                    </div>
                    <p className="font-semibold">{job.location}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">Job Type</span>
                    </div>
                    <p className="font-semibold">{job.jobType}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Salary</span>
                    </div>
                    <p className="font-semibold text-sm">{formattedSalary}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Posted</span>
                    </div>
                    <p className="font-semibold text-sm">{formattedDate}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-wrap gap-2">
                  {job.remote && (
                    <Badge className="bg-green-100 text-green-800">
                      🌍 Remote
                    </Badge>
                  )}
                  <Badge variant="secondary">{job.category}</Badge>
                  <Badge variant="secondary">{job.experienceLevel} Level</Badge>
                  <Badge variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    {job.applicantsCount} applicants
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Benefits</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-3">
                  Apply for this Position
                </Button>
                <Button variant="outline" className="w-full">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Job
                </Button>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Application Deadline</span>
                    <p className="font-semibold">
                      {new Date(job.applicationDeadline).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Experience Level</span>
                    <p className="font-semibold">{job.experienceLevel}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {company.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{company.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{company.rating}</span>
                      <span className="text-gray-500">
                        ({company.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {company.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{company.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{company.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{company.location}</span>
                  </div>
                </div>

                <Link href={`/companies/${company.id}`}>
                  <Button variant="outline" className="w-full">
                    View Company Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Jobs (Mobile only shows count) */}
            {relatedJobs.length > 0 && (
              <Card className="hidden lg:block">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Similar Jobs</h3>
                  <div className="space-y-4">
                    {relatedJobs.map((relatedJob) => (
                      <Link
                        key={relatedJob.id}
                        href={`/jobs/${relatedJob.id}`}
                        className="block group"
                      >
                        <div className="border rounded-lg p-3 hover:border-purple-500 transition-colors">
                          <h4 className="font-semibold text-sm mb-1 group-hover:text-purple-600">
                            {relatedJob.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {relatedJob.company}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <span>{relatedJob.location}</span>
                            <span>•</span>
                            <span>{relatedJob.jobType}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
