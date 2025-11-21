import { CompanyCard } from "@/components/company-card";
import { dummyCompanies } from "@/constants";
import { Building2 } from "lucide-react";

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <Building2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Top Companies
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover amazing companies and find your perfect workplace
          </p>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {dummyCompanies.length} Companies Hiring
            </h2>
            <p className="text-gray-600">
              Browse through our curated list of top employers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-12 flex justify-center">
            <div className="text-gray-500 text-sm">
              Showing {dummyCompanies.length} of {dummyCompanies.length}{" "}
              companies
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
