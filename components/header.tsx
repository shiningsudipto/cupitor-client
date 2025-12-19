"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X, LayoutDashboard, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { logoutUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logoutUser(); // Server-side logout
    logout(); // Client-side logout
    Cookies.remove("cupitorToken");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-black" />
              </div>
              <span className="text-primary">Cupitor</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-black" />
            </div>
            <span className="text-primary">Cupitor</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/jobs"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/companies"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Companies
            </Link>
            {isAuthenticated && user?.role === "candidate" && (
              <Link
                href="/candidate/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === "company" && (
              <Link
                href="/company/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
              >
                <Building2 className="h-4 w-4" />
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hover:text-primary">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-primary text-black hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium hidden lg:block">
                  Hi, {user?.name || user?.email}
                </span>
                {user?.role === "candidate" ? (
                  <Link href="/candidate/dashboard">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-1" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/company/dashboard">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      <Building2 className="h-4 w-4 mr-1" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link
              href="/jobs"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              href="/companies"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Companies
            </Link>
            {isAuthenticated && user?.role === "candidate" && (
              <Link
                href="/candidate/dashboard"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Candidate Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === "company" && (
              <Link
                href="/company/dashboard"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Company Dashboard
              </Link>
            )}
            <div className="pt-3 space-y-2">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-primary text-black hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="space-y-2">
                  <span className="block text-sm font-medium mb-2">
                    Hi, {user?.name || user?.email}
                  </span>
                  {user?.role === "candidate" ? (
                    <Link
                      href="/candidate/dashboard"
                      className="block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-primary"
                      >
                        Candidate Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href="/company/dashboard"
                      className="block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-primary"
                      >
                        Company Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
