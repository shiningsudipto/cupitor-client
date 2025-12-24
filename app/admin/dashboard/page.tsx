"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  Briefcase,
  FileText,
  Shield,
  Settings,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">
          Welcome back, {user.name}. Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Candidates</p>
                <p className="text-3xl font-bold text-white">
                  {stats.totalCandidates}
                </p>
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Companies</p>
                <p className="text-3xl font-bold text-white">
                  {stats.totalCompanies}
                </p>
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Active Jobs</p>
                <p className="text-3xl font-bold text-white">
                  {stats.totalJobs}
                </p>
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-pink-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Applications</p>
                <p className="text-3xl font-bold text-white">
                  {stats.totalApplications}
                </p>
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +20% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/candidates">
              <Button
                className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-white border border-slate-700 mb-2"
                variant="outline"
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Candidates
              </Button>
            </Link>
            <Link href="/admin/companies">
              <Button
                className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-white border border-slate-700 mb-2"
                variant="outline"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Manage Companies
              </Button>
            </Link>
            <Link href="/admin/jobs">
              <Button
                className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-white border border-slate-700 mb-2"
                variant="outline"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Manage Jobs
              </Button>
            </Link>
            {user.role === "super_admin" && (
              <Link href="/admin/users">
                <Button
                  className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-white border border-slate-700"
                  variant="outline"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Manage Admins
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-slate-700">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">New candidate registered</p>
                  <p className="text-xs text-gray-400">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-slate-700">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">New job posted</p>
                  <p className="text-xs text-gray-400">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-slate-700">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Company verified</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Application submitted</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Info */}
      <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Admin Email</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Role</p>
              <p className="text-white font-medium">
                {user.role?.replace("_", " ").toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Last Login</p>
              <p className="text-white font-medium">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
