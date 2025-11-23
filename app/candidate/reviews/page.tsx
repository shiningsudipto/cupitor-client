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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Star,
  Building2,
  MessageSquare,
  Plus,
  ThumbsUp,
  CheckCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { reviewSchema, type ReviewFormData } from "@/lib/validations/review";
import { dummyReviews, dummyCompanies } from "@/constants";

export default function CandidateReviewsPage() {
  // TODO: Replace with actual authenticated user
  const currentUserId = "user-1";

  // Filter reviews by current user (mock data uses different user IDs)
  const userReviews = dummyReviews.filter(
    (review) => review.userId === currentUserId
  );

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      companyId: "",
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    // TODO: API call to submit review
    console.log("Review data:", data);
    toast.success("Review submitted successfully!");
    form.reset();
    setSelectedRating(0);
    setIsReviewDialogOpen(false);
  };

  const handleDeleteReview = (reviewId: string) => {
    // TODO: API call to delete review
    toast.success("Review deleted successfully!");
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= (interactive ? hoverRating || selectedRating : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && setSelectedRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Company Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Share your experience • {userReviews.length} reviews written
          </p>
        </div>
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-lg">
              <Plus className="mr-2 h-5 w-5" />
              Write Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Write a Company Review</DialogTitle>
              <DialogDescription>
                Share your honest experience to help other job seekers
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="companyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a company" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dummyCompanies.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the company you want to review
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div>
                          {renderStars(selectedRating, true)}
                          <input
                            type="hidden"
                            {...field}
                            value={selectedRating}
                            onChange={(e) => {
                              field.onChange(parseInt(e.target.value));
                              setSelectedRating(parseInt(e.target.value));
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Rate your overall experience (1-5 stars)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Review</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your experience working at or interviewing with this company..."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value.length}/500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsReviewDialogOpen(false);
                      form.reset();
                      setSelectedRating(0);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Review</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{userReviews.length}</p>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">
                {userReviews.length > 0
                  ? (
                      userReviews.reduce((sum, r) => sum + r.rating, 0) /
                      userReviews.length
                    ).toFixed(1)
                  : "0.0"}
              </p>
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Helpful Votes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">
                {userReviews.reduce((sum, r) => sum + r.helpful, 0)}
              </p>
              <ThumbsUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      {userReviews.length > 0 ? (
        <div className="space-y-4">
          {userReviews.map((review) => {
            const company = dummyCompanies.find(
              (c) => c.id === review.companyId
            );
            return (
              <Card
                key={review.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {company?.name}
                          </h3>
                          {review.verified && (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <Badge variant="outline">{review.workStatus}</Badge>
                        </div>
                        <div className="flex items-center space-x-3 mb-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.reviewDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {review.position}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">
                        {review.title}
                      </h4>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-1">
                        Pros:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {review.pros}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-700 mb-1">
                        Cons:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {review.cons}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{review.helpful} people found this helpful</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-16">
            <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground mb-6">
              Share your experience to help other job seekers make informed
              decisions
            </p>
            <Button onClick={() => setIsReviewDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Write Your First Review
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Guidelines */}
      <Card className="bg-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            Review Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>Be honest and constructive in your feedback</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>
                Focus on your personal experience and specific examples
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>Avoid personal attacks or inappropriate language</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>
                Include both positive aspects and areas for improvement
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              <span>
                Remember that your review helps others make career decisions
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
