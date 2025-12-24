"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Shield, Bell, Palette, Globe } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminSettingsPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your administrative preferences and system configuration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Security
            </CardTitle>
            <CardDescription className="text-slate-400">
              Manage your password and account security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start border-slate-700 text-white hover:bg-slate-800">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start border-slate-700 text-white hover:bg-slate-800">
              Two-Factor Authentication
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-400" />
              Notifications
            </CardTitle>
            <CardDescription className="text-slate-400">
              Configure how you receive system alerts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start border-slate-700 text-white hover:bg-slate-800">
              Email Notifications
            </Button>
            <Button variant="outline" className="w-full justify-start border-slate-700 text-white hover:bg-slate-800">
              Push Notifications
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              Appearance
            </CardTitle>
            <CardDescription className="text-slate-400">
              Customize the admin panel look and feel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start border-slate-700 text-white hover:bg-slate-800">
              Dark Mode Settings
            </Button>
            <Button variant="outline" className="w-full justify-start border-slate-700 text-white hover:bg-slate-800">
              Theme Selection
            </Button>
          </CardContent>
        </Card>

        {user?.role === "super_admin" && (
          <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-red-400" />
                System Configuration
              </CardTitle>
              <CardDescription className="text-slate-400">
                Global platform settings and maintenance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start border-red-500/20 text-red-300 hover:bg-red-500/10">
                Maintenance Mode
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-700 text-white hover:bg-slate-800">
                API Key Management
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
