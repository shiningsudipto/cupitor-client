import { Bell, Briefcase, FileText, User, Heart, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Replace with actual authenticated user data
  const currentCandidate = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/avatars/sarah.jpg",
  };

  const navItems = [
    { href: "/candidate/dashboard", label: "Dashboard", icon: Briefcase },
    { href: "/candidate/profile", label: "Profile", icon: User },
    { href: "/candidate/resumes", label: "Resumes", icon: FileText },
    { href: "/candidate/saved-jobs", label: "Saved Jobs", icon: Heart },
    { href: "/candidate/reviews", label: "Reviews", icon: Star },
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
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={currentCandidate.avatar}
                    alt={currentCandidate.name}
                  />
                  <AvatarFallback>
                    {currentCandidate.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{currentCandidate.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentCandidate.email}
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
