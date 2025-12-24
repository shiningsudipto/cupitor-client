"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/app/actions/auth";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "superadmin@cupitor.com",
    password: "SuperAdmin@123!",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loginUser(formData);

      if (res.success) {
        const role = res.data?.role;
        const user = res.data?.user;
        const accessToken = res.data?.accessToken;

        // Check if user is an admin (super_admin, admin, or moderator)
        if (
          role === "super_admin" ||
          role === "admin" ||
          role === "moderator"
        ) {
          // Store auth data in Zustand with role included
          login({ ...user, role }, accessToken);

          // Set token in cookies
          Cookies.set("cupitorToken", accessToken, {
            expires: 7, // 7 days
            secure: true, // only send over HTTPS
            sameSite: "strict",
          });

          toast.success("Admin login successful!");
          router.push("/admin/dashboard");
          router.refresh();
        } else {
          toast.error("Access denied. Admin credentials required.");
        }
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md border-purple-500/20 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-white">Admin Panel</h1>
            <p className="text-gray-400">
              Sign in to access the admin dashboard
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="admin@cupitor.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 pr-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-11 text-white font-semibold shadow-lg shadow-purple-500/30"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Back to Main Site */}
          <div className="text-center text-sm">
            <Link
              href="/"
              className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
            >
              ← Back to Main Site
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <p className="text-xs text-center text-gray-500">
              This area is restricted to authorized administrators only.
              <br />
              All access attempts are logged and monitored.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
