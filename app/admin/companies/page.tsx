"use client";

import { useEffect, useState } from "react";
import { getAllCompanies } from "@/app/actions/company";
import { CustomTable } from "@/components/CustomTable";
import { TCompany } from "@/types/collections";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function CompaniesAdminPage() {
  const [companies, setCompanies] = useState<TCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompanies();
        if (response?.success) {
          setCompanies(response.data);
        } else {
          toast.error(response?.message || "Failed to fetch companies");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("An error occurred while fetching companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const columns = [
    {
      key: "name",
      label: "Company",
      render: (_value: unknown, row: TCompany) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={row.logo} alt={row.name} />
            <AvatarFallback className="rounded-lg">
              {row.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-white">{row.name}</span>
            <span className="text-xs text-slate-400">@{row.username}</span>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (_value: unknown, row: TCompany) => (
        <span className="text-slate-300">{row.email}</span>
      ),
    },
    {
      key: "companyType",
      label: "Type",
      render: (
        _value: unknown,
        row: TCompany & { companyType: string | { _id: string; label: string } }
      ) => {
        const companyTypeLabel =
          typeof row.companyType === "string"
            ? row.companyType
            : row.companyType?.label || "N/A";
        return (
          <Badge
            variant="secondary"
            className="bg-purple-600/20 text-purple-300 border-none"
          >
            {companyTypeLabel}
          </Badge>
        );
      },
    },
    {
      key: "location",
      label: "Location",
      render: (_value: unknown, row: TCompany) => (
        <span className="text-slate-300">{row.location || "N/A"}</span>
      ),
    },
    {
      key: "employee_len",
      label: "Employees",
      render: (_value: unknown, row: TCompany) => (
        <span className="text-slate-300">{row.employee_len || "N/A"}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Companies</h1>
        <p className="text-slate-400">
          Manage all registered companies and their details.
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
        <CustomTable
          data={companies}
          columns={columns}
          loading={loading}
          searchable
          searchPlaceholder="Search companies..."
        />
      </div>
    </div>
  );
}
