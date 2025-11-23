"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X, LayoutDashboard, Building2 } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // TODO: Get from authentication
  // For demo purposes, showing both dashboards
  const isAuthenticated = true; // Set to true to show dashboard links

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
            {isAuthenticated && (
              <>
                <Link
                  href="/candidate/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Candidate
                </Link>
                <Link
                  href="/company/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Building2 className="h-4 w-4" />
                  Company
                </Link>
              </>
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
                <Link href="/candidate/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-1" />
                    Candidate
                  </Button>
                </Link>
                <Link href="/company/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Building2 className="h-4 w-4 mr-1" />
                    Company
                  </Button>
                </Link>
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
            {isAuthenticated && (
              <>
                <Link
                  href="/candidate/dashboard"
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Candidate Dashboard
                </Link>
                <Link
                  href="/company/dashboard"
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Company Dashboard
                </Link>
              </>
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
                  <Link
                    href="/candidate/dashboard"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full border-primary">
                      Candidate Dashboard
                    </Button>
                  </Link>
                  <Link
                    href="/company/dashboard"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full border-primary">
                      Company Dashboard
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
