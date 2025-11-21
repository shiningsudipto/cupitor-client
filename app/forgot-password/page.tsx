"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement forgot password logic with API
    console.log("Reset password for:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
            <p className="text-gray-600">
              {submitted
                ? "Check your email for reset instructions"
                : "Enter your email to reset your password"}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-11"
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Email Sent!</h3>
                <p className="text-sm text-gray-600">
                  We've sent a password reset link to{" "}
                  <span className="font-semibold">{email}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Please check your inbox and follow the instructions.
                </p>
              </div>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="mt-4"
              >
                Didn't receive the email? Try again
              </Button>
            </div>
          )}

          {/* Back to Login */}
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-purple-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
