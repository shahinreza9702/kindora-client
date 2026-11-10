
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, LoaderCircle, MapPin, Plus } from "lucide-react";
import { toast } from "sonner";

import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";

const categories = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Awareness",
  "Education",
  "Other",
] as const;

interface CreateEventResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
  };
}

export default function CreateEventForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    location: "",
    eventDate: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category ||
      !formData.image.trim() ||
      !formData.location.trim() ||
      !formData.eventDate
    ) {
      toast.error("Please complete all fields.");
      return;
    }

    if (new Date(formData.eventDate).getTime() <= Date.now()) {
      toast.error("Please select a future event date.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await apiRequest<CreateEventResponse>(
        "/api/events",
        {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            eventDate: new Date(formData.eventDate).toISOString(),
          }),
        }
      );

      if (response.success) {
        toast.success("Your event has been created successfully!");

        router.push("/upcoming-events");
        router.refresh();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create event."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            <Plus className="h-4 w-4" />
            Create an Event
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Bring Your Community Together
          </h1>

          <p className="mt-3 text-muted-foreground">
            Create a meaningful opportunity and invite people
            to make a positive difference together.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-8"
        >
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Event Title
            </label>

            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Winter Clothes Distribution"
              maxLength={100}
              minLength={5}
              required
              className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Event Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event, its purpose and how people can participate..."
              rows={5}
              minLength={20}
              maxLength={2000}
              required
              className="w-full resize-y rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            />

            <p className="text-right text-xs text-muted-foreground">
              {formData.description.length}/2000
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Event Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              >
                <option value="">Select a category</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Event Location
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Chattogram, Bangladesh"
                  maxLength={150}
                  required
                  className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Event Thumbnail URL
            </label>

            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/event-image.jpg"
              required
              className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="eventDate" className="text-sm font-medium">
              Event Date
            </label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                id="eventDate"
                name="eventDate"
                type="datetime-local"
                value={formData.eventDate}
                onChange={handleChange}
                min={new Date(Date.now() + 60000)
                  .toISOString()
                  .slice(0, 16)}
                required
                className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Creating Event...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
