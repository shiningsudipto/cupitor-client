import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Company } from "@/constants/companies";
import { MapPin, Users, Star, Briefcase } from "lucide-react";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Company Logo */}
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl shrink-0 group-hover:scale-110 transition-transform">
              {company.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              {/* Company Name */}
              <h3 className="text-lg font-bold mb-1 group-hover:text-purple-600 transition-colors truncate">
                {company.name}
              </h3>

              {/* Industry */}
              <p className="text-sm text-gray-600 mb-3">{company.industry}</p>

              {/* Company Info */}
              <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  <span>{company.activeJobs} jobs</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">
                    {company.rating}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  ({company.reviewCount} reviews)
                </span>
              </div>

              {/* Culture Tags */}
              <div className="flex flex-wrap gap-1">
                {company.culture.slice(0, 2).map((culture) => (
                  <Badge key={culture} variant="secondary" className="text-xs">
                    {culture}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
