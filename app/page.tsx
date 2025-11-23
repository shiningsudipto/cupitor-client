import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { JobCard } from "@/components/job-card";
import { CompanyCard } from "@/components/company-card";
import { Badge } from "@/components/ui/badge";
import { dummyJobs, dummyCompanies, jobCategories } from "@/constants";
import {
  Briefcase,
  Building2,
  TrendingUp,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const featuredJobs = dummyJobs.filter((job) => job.isFeatured).slice(0, 4);
  const topCompanies = dummyCompanies.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700">
                Over 10,000+ jobs available
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your <span className="text-primary">Dream Job</span>
              <br />
              Today
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover amazing career opportunities from top companies. Your
              perfect job is just a search away.
            </p>

            {/* Hero Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">10K+</div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">
                  5K+
                </div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">50K+</div>
                <div className="text-sm text-gray-600">Candidates</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar showFilters={false} />
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-gray-600">Explore jobs by category</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {jobCategories.slice(0, 10).map((category) => (
              <Link
                key={category}
                href={`/jobs?category=${encodeURIComponent(category)}`}
                className="group"
              >
                <div className="p-6 rounded-xl border-2 border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Jobs</h2>
              <p className="text-gray-600">
                Hand-picked opportunities from top companies
              </p>
            </div>
            <Link href="/jobs">
              <Button variant="outline" className="group">
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Top Companies Hiring</h2>
              <p className="text-gray-600">
                Get hired by the best companies in the industry
              </p>
            </div>
            <Link href="/companies">
              <Button variant="outline" className="group">
                View All Companies
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of job seekers who have found their dream careers
            through Cupitor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 font-semibold text-lg px-8"
              >
                Get Started For Free
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-black text-black hover:bg-black/10 font-semibold text-lg px-8"
              >
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Cupitor?</h2>
            <p className="text-gray-600">
              Everything you need to find your perfect job
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Opportunities</h3>
              <p className="text-gray-600">
                All job postings are verified and from legitimate companies
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Top Companies</h3>
              <p className="text-gray-600">
                Connect with leading companies across various industries
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Application</h3>
              <p className="text-gray-600">
                Apply to multiple jobs with one click using your profile
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
