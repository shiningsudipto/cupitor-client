"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Mail,
  MapPin,
  Globe,
  Users,
  Camera,
  Save,
  Linkedin,
  Twitter,
  Facebook,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import {
  companyProfileSchema,
  type CompanyProfileFormData,
} from "@/lib/validations/company";
import { dummyCompanies, companyIndustries, companySizes } from "@/constants";

export default function CompanyProfilePage() {
  // TODO: Replace with actual authenticated company
  const currentCompanyId = "comp-1";
  const currentCompany = dummyCompanies.find((c) => c.id === currentCompanyId);

  const form = useForm<CompanyProfileFormData>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      name: currentCompany?.name || "",
      email: currentCompany?.email || "",
      website: currentCompany?.website || "",
      location: currentCompany?.location || "",
      companyType: currentCompany?.industry || "",
      employeeCount: currentCompany?.size || "",
      description: currentCompany?.description || "",
      founded: currentCompany?.founded
        ? new Date(currentCompany.founded).toISOString().split("T")[0]
        : "",
      industry: currentCompany?.industry || "",
      linkedin: "",
      twitter: "",
      facebook: "",
    },
  });

  const onSubmit = (data: CompanyProfileFormData) => {
    // TODO: API call to update company profile
    console.log("Company profile data:", data);
    toast.success("Company profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your company information and branding
        </p>
      </div>

      {/* Logo Section */}
      <Card>
        <CardHeader>
          <CardTitle>Company Logo</CardTitle>
          <CardDescription>Upload your company logo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 rounded-lg">
                <AvatarImage
                  src={currentCompany?.logo}
                  alt={currentCompany?.name}
                />
                <AvatarFallback className="text-2xl rounded-lg bg-primary/10">
                  {currentCompany?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-lg"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Change your logo</p>
              <p className="text-xs text-muted-foreground mb-3">
                JPG, PNG or SVG. Max size of 2MB
              </p>
              <Button variant="outline" size="sm">
                Upload New Logo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your company details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Building2 className="h-4 w-4 inline mr-2" />
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="TechCorp Solutions" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Mail className="h-4 w-4 inline mr-2" />
                        Contact Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contact@company.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Globe className="h-4 w-4 inline mr-2" />
                        Website
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <MapPin className="h-4 w-4 inline mr-2" />
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companyIndustries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employeeCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Users className="h-4 w-4 inline mr-2" />
                        Company Size
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="founded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Founded Year
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        When was your company established?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Startup">Startup</SelectItem>
                          <SelectItem value="SME">
                            Small/Medium Enterprise
                          </SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                          <SelectItem value="Public">Public Company</SelectItem>
                          <SelectItem value="Private">
                            Private Company
                          </SelectItem>
                          <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell candidates about your company, culture, and mission..."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be displayed on your company profile page
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Social Media Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Linkedin className="h-4 w-4 inline mr-2" />
                          LinkedIn
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/company/..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Twitter className="h-4 w-4 inline mr-2" />
                          Twitter
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://twitter.com/..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Facebook className="h-4 w-4 inline mr-2" />
                          Facebook
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://facebook.com/..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary text-black hover:bg-primary/90"
                >
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Company Stats */}
      <Card className="bg-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Profile Strength</span>
                <span className="text-sm font-bold text-primary">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                Complete your profile to attract more candidates:
              </p>
              <ul className="space-y-1 ml-4">
                <li>✅ Basic information added</li>
                <li>✅ Company logo uploaded</li>
                <li>✅ Description provided</li>
                <li>⬜ Add social media links</li>
                <li>⬜ Post your first job</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
