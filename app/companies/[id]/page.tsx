import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JobCard } from "@/components/job-card";
import { dummyCompanies, dummyJobs, dummyReviews } from "@/constants";
import {
  MapPin,
  Users,
  Building2,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Star,
  Briefcase,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default function CompanyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const company = dummyCompanies.find((c) => c.id === params.id);
  const companyJobs = dummyJobs.filter((j) => j.companyId === params.id);
  const companyReviews = dummyReviews.filter((r) => r.companyId === params.id);

  if (!company) {
    notFound();
  }

  // Calculate average rating from reviews (if needed for more detail)
  const avgRating = company.rating;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Company Logo */}
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-purple-600 font-bold text-4xl shadow-lg">
              {company.name.charAt(0)}
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {company.name}
              </h1>
              <p className="text-xl opacity-90 mb-4">{company.industry}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Founded {company.founded}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{company.activeJobs} open positions</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="text-3xl font-bold">{company.rating}</span>
              </div>
              <p className="text-sm opacity-90">
                {company.reviewCount} reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Company */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  About {company.name}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {company.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {company.activeJobs}
                    </div>
                    <div className="text-sm text-gray-600">Open Jobs</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600 mb-1">
                      {company.rating}
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {company.reviewCount}
                    </div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {company.founded}
                    </div>
                    <div className="text-sm text-gray-600">Founded</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Culture & Values */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Culture & Values</h2>
                <div className="flex flex-wrap gap-2">
                  {company.culture.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="text-sm px-4 py-2"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits & Perks */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Benefits & Perks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {company.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Open Positions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Open Positions ({companyJobs.length})
                </h2>
                {companyJobs.length > 0 ? (
                  <div className="space-y-4">
                    {companyJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">
                    No open positions at the moment
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Employee Reviews ({companyReviews.length})
                </h2>
                {companyReviews.length > 0 ? (
                  <div className="space-y-6">
                    {companyReviews.slice(0, 5).map((review) => (
                      <div
                        key={review.id}
                        className="border-b last:border-0 pb-6 last:pb-0"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-bold">{review.title}</h4>
                            <p className="text-sm text-gray-600">
                              {review.position} • {review.workStatus}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.reviewDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-semibold text-green-600">
                              Pros:
                            </span>
                            <p className="text-gray-700 text-sm">
                              {review.pros}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-red-600">
                              Cons:
                            </span>
                            <p className="text-gray-700 text-sm">
                              {review.cons}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 text-sm text-gray-600">
                          {review.helpful} people found this helpful
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">
                    No reviews yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Company Links</h3>

                <div className="space-y-3">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Globe className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">Website</span>
                  </a>

                  {company.socialLinks.linkedin && (
                    <a
                      href={company.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}

                  {company.socialLinks.twitter && (
                    <a
                      href={company.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-blue-400" />
                      <span className="text-sm">Twitter</span>
                    </a>
                  )}

                  {company.socialLinks.facebook && (
                    <a
                      href={company.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-blue-700" />
                      <span className="text-sm">Facebook</span>
                    </a>
                  )}
                </div>

                <Separator className="my-4" />

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  View All Jobs
                </Button>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Company Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Industry</span>
                    <p className="font-semibold">{company.industry}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Company Size</span>
                    <p className="font-semibold">{company.size}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Headquarters</span>
                    <p className="font-semibold">{company.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Founded</span>
                    <p className="font-semibold">{company.founded}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
