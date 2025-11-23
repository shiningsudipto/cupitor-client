"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Plus,
  X,
  Camera,
  Save,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  candidateProfileSchema,
  experienceSchema,
  type CandidateProfileFormData,
  type ExperienceFormData,
} from "@/lib/validations/candidate";
import {
  dummyCandidates,
  getCandidateExperiences,
  type TCandidateExperience,
} from "@/constants";

export default function CandidateProfilePage() {
  // TODO: Replace with actual authenticated user
  const currentCandidateId = "cand-1";
  const currentCandidate = dummyCandidates.find(
    (c) => c._id === currentCandidateId
  );
  const candidateExperiences = getCandidateExperiences(currentCandidateId);

  const [skillInput, setSkillInput] = useState("");
  const [experiences, setExperiences] =
    useState<TCandidateExperience[]>(candidateExperiences);
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<TCandidateExperience | null>(null);

  // Profile form
  const profileForm = useForm<CandidateProfileFormData>({
    resolver: zodResolver(candidateProfileSchema),
    defaultValues: {
      name: currentCandidate?.name || "",
      email: currentCandidate?.email || "",
      phone: currentCandidate?.phone || "",
      city: currentCandidate?.city || "",
      address: currentCandidate?.address || "",
      skills: currentCandidate?.skills || [],
      education: currentCandidate?.education || "",
      yearsOfExperience: currentCandidate?.yearsOfExperience || "",
      github: currentCandidate?.github || "",
      linkedin: currentCandidate?.linkedin || "",
    },
  });

  // Experience form
  const experienceForm = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      companyName: "",
      companyLocation: "",
      role: "",
      description: "",
      startDate: "",
      endDate: "",
      isCurrentRole: false,
    },
  });

  const onProfileSubmit = (data: CandidateProfileFormData) => {
    // TODO: API call to update profile
    console.log("Profile data:", data);
    toast.success("Profile updated successfully!");
  };

  const onExperienceSubmit = (data: ExperienceFormData) => {
    const newExperience: TCandidateExperience = {
      _id: `exp-${Date.now()}`,
      candidateId: currentCandidateId,
      companyName: data.companyName,
      companyLocation: data.companyLocation,
      role: data.role,
      description: data.description,
      startDate: data.startDate,
      endDate: data.isCurrentRole ? undefined : data.endDate,
    };

    if (editingExperience) {
      setExperiences(
        experiences.map((exp) =>
          exp._id === editingExperience._id
            ? { ...newExperience, _id: exp._id }
            : exp
        )
      );
      toast.success("Experience updated successfully!");
    } else {
      setExperiences([...experiences, newExperience]);
      toast.success("Experience added successfully!");
    }

    experienceForm.reset();
    setEditingExperience(null);
    setIsExperienceDialogOpen(false);
  };

  const addSkill = () => {
    if (
      skillInput.trim() &&
      !profileForm.getValues("skills").includes(skillInput.trim())
    ) {
      const currentSkills = profileForm.getValues("skills");
      profileForm.setValue("skills", [...currentSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = profileForm.getValues("skills");
    profileForm.setValue(
      "skills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleEditExperience = (experience: TCandidateExperience) => {
    setEditingExperience(experience);
    experienceForm.reset({
      companyName: experience.companyName,
      companyLocation: experience.companyLocation,
      role: experience.role,
      description: experience.description,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isCurrentRole: !experience.endDate,
    });
    setIsExperienceDialogOpen(true);
  };

  const handleDeleteExperience = (experienceId: string) => {
    setExperiences(experiences.filter((exp) => exp._id !== experienceId));
    toast.success("Experience deleted successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and work experience
        </p>
      </div>

      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload a professional photo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={currentCandidate?.avatar}
                  alt={currentCandidate?.name}
                />
                <AvatarFallback className="text-2xl">
                  {currentCandidate?.name.charAt(0)}
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
              <p className="text-sm font-medium mb-1">Change your avatar</p>
              <p className="text-xs text-muted-foreground mb-3">
                JPG, PNG or GIF. Max size of 2MB
              </p>
              <Button variant="outline" size="sm">
                Upload New Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <User className="h-4 w-4 inline mr-2" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Phone className="h-4 w-4 inline mr-2" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+1-555-0123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <MapPin className="h-4 w-4 inline mr-2" />
                        City
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={profileForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, San Francisco, CA 94103"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={profileForm.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <GraduationCap className="h-4 w-4 inline mr-2" />
                      Education
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Bachelor's in Computer Science - Stanford University"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your highest level of education and institution
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Years of Experience
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="5" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={profileForm.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill (e.g., React, Python)"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                          <Button type="button" onClick={addSkill}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="pl-3 pr-2"
                            >
                              {skill}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 ml-2"
                                onClick={() => removeSkill(skill)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add your technical and professional skills
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={profileForm.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Github className="h-4 w-4 inline mr-2" />
                        GitHub Profile (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Linkedin className="h-4 w-4 inline mr-2" />
                        LinkedIn Profile (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>
                Add your professional experience
              </CardDescription>
            </div>
            <Dialog
              open={isExperienceDialogOpen}
              onOpenChange={setIsExperienceDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingExperience(null);
                    experienceForm.reset();
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingExperience ? "Edit" : "Add"} Work Experience
                  </DialogTitle>
                  <DialogDescription>
                    Enter details about your professional experience
                  </DialogDescription>
                </DialogHeader>
                <Form {...experienceForm}>
                  <form
                    onSubmit={experienceForm.handleSubmit(onExperienceSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={experienceForm.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="TechCorp Inc" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={experienceForm.control}
                        name="companyLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="San Francisco, CA"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={experienceForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Senior Software Engineer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={experienceForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your responsibilities and achievements..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={experienceForm.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={experienceForm.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                disabled={experienceForm.watch("isCurrentRole")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={experienceForm.control}
                      name="isCurrentRole"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Current Role
                            </FormLabel>
                            <FormDescription>
                              I currently work in this role
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsExperienceDialogOpen(false);
                          setEditingExperience(null);
                          experienceForm.reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingExperience ? "Update" : "Add"} Experience
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.companyName}
                    {exp.companyLocation && ` • ${exp.companyLocation}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditExperience(exp)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteExperience(exp._id!)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              {exp.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {exp.description}
                </p>
              )}
            </div>
          ))}

          {experiences.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No work experience added yet</p>
              <p className="text-sm mt-1">
                Click "Add Experience" to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
