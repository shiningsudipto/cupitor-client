import {
  Bell,
  Briefcase,
  Building2,
  Users,
  FileText,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Replace with actual authenticated company
  const currentCompany = {
    name: "TechCorp Solutions",
    email: "contact@techcorp.example.com",
    logo: "/company-logos/techcorp.png",
  };

  const navItems = [
    { href: "/company/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/company/jobs", label: "Posted Jobs", icon: Briefcase },
    { href: "/company/applicants", label: "Applicants", icon: Users },
    { href: "/company/profile", label: "Company Profile", icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Cupitor</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
                  5
                </Badge>
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={currentCompany.logo}
                    alt={currentCompany.name}
                  />
                  <AvatarFallback>
                    {currentCompany.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{currentCompany.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentCompany.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-24 space-y-2 bg-white rounded-xl p-4 shadow-sm border">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary group"
                  >
                    <Icon className="h-5 w-5 text-slate-500 group-hover:text-primary transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
