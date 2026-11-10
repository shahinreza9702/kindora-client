
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  ArrowUpRight,
  HeartHandshake,
  LoaderCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { apiRequest } from "@/lib/api";

interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  location: string;
  eventDate: string;
  organizerEmail: string;
  createdAt: string;
  updatedAt: string;
}

interface EventsResponse {
  success: boolean;
  message: string;
  data: Event[];
}

interface EventResponse {
  success: boolean;
  message: string;
  data: Event;
}

interface EventFormData {
  title: string;
  description: string;
  category: string;
  image: string;
  location: string;
  eventDate: string;
}

const categories = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Awareness",
  "Education",
  "Other",
];

const initialFormData: EventFormData = {
  title: "",
  description: "",
  category: "Donation",
  image: "",
  location: "",
  eventDate: "",
};

function toLocalDateTime(date: string) {
  const value = new Date(date);
  const offset = value.getTimezoneOffset() * 60000;

  return new Date(value.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

export default function ManageEventsClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] =
    useState<EventFormData>(initialFormData);

  const [isSaving, setIsSaving] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState("");

  // Fetch Current User's Events
  const fetchMyEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await apiRequest<EventsResponse>(
        "/api/events/my-events",
        {
          method: "GET",
        }
      );

      setEvents(response.data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to load your events."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMyEvents();
  }, [fetchMyEvents]);

  // Open Edit Form
  function handleEdit(event: Event) {
    setEditingEvent(event);

    setFormData({
      title: event.title,
      description: event.description,
      category: event.category,
      image: event.image,
      location: event.location,
      eventDate: toLocalDateTime(event.eventDate),
    });
  }

  // Update Form Fields
  function handleInputChange(
    field: keyof EventFormData,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // Update Event
  async function handleUpdateEvent(
    formEvent: React.FormEvent<HTMLFormElement>
  ) {
    formEvent.preventDefault();

    if (!editingEvent || isSaving) return;

    const selectedDate = new Date(formData.eventDate);

    if (
      !formData.eventDate ||
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate.getTime() <= Date.now()
    ) {
      toast.error("Please select a future event date.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        ...formData,
        eventDate: selectedDate.toISOString(),
      };

      const response = await apiRequest<EventResponse>(
        `/api/events/${editingEvent._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
        }
      );

      toast.success(response.message || "Event updated successfully.");

      setEditingEvent(null);
      setFormData(initialFormData);

      await fetchMyEvents();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update event."
      );
    } finally {
      setIsSaving(false);
    }
  }

  // Delete Event
  async function handleDeleteEvent(eventId: string) {
    if (deletingEventId) return;

    try {
      setDeletingEventId(eventId);

      const response = await apiRequest<{
        success: boolean;
        message: string;
      }>(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      toast.success(response.message || "Event deleted successfully.");

      setConfirmDeleteId("");
      await fetchMyEvents();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete event."
      );
    } finally {
      setDeletingEventId("");
    }
  }

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600">
                <HeartHandshake className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Event Management
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                  Manage Events
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Manage your community events, update information,
              and keep your initiatives organized.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Create New Event
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="h-52 animate-pulse bg-muted" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-10 w-full animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && errorMessage && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 text-center">
            <HeartHandshake className="h-12 w-12 text-muted-foreground" />

            <h2 className="mt-5 text-xl font-bold">
              Unable to Load Your Events
            </h2>

            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() => void fetchMyEvents()}
              className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !errorMessage && events.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-600">
              <HeartHandshake className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No Events Created Yet
            </h2>

            <p className="mt-3 max-w-md leading-7 text-muted-foreground">
              You haven't created any community events.
              Start an initiative and invite people to make
              a positive impact.
            </p>

            <Link
              href="/create-event"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Create Your First Event
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && !errorMessage && events.length > 0 && (
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                You have created{" "}
                <span className="font-semibold text-foreground">
                  {events.length}
                </span>{" "}
                {events.length === 1 ? "event" : "events"}.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${event.image})`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    <span className="absolute bottom-4 left-4 rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white">
                      {event.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="line-clamp-2 text-lg font-bold">
                      {event.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-border pt-4">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{formatDate(event.eventDate)}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="line-clamp-1">
                          {event.location}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(event)}
                        disabled={
                          Boolean(deletingEventId) || Boolean(confirmDeleteId)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-700 px-3 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-400 dark:hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(event._id)}
                        disabled={
                          Boolean(deletingEventId) || Boolean(confirmDeleteId)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>

                    {/* Delete Confirmation */}
                    {confirmDeleteId === event._id && (
                      <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
                        <p className="text-sm font-medium">
                          Are you sure you want to delete this event?
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          This action cannot be undone.
                        </p>

                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(event._id)}
                            disabled={deletingEventId === event._id}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                          >
                            {deletingEventId === event._id ? (
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            Confirm Delete
                          </button>

                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId("")}
                            disabled={Boolean(deletingEventId)}
                            className="rounded-lg border border-border px-3 py-2 text-xs font-semibold transition hover:bg-muted"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/upcoming-events/${event._id}`}
                      className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-emerald-600"
                    >
                      View Event Details
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-border bg-background shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-bold">Update Event</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Update your event information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                disabled={isSaving}
                className="rounded-lg p-2 transition hover:bg-muted"
                aria-label="Close edit form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Edit Form */}
            <form
              onSubmit={handleUpdateEvent}
              className="max-h-[75vh] space-y-5 overflow-y-auto p-5 sm:p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Event Title
                </label>

                <input
                  type="text"
                  required
                  minLength={5}
                  maxLength={100}
                  value={formData.title}
                  onChange={(event) =>
                    handleInputChange("title", event.target.value)
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  required
                  minLength={20}
                  maxLength={2000}
                  rows={5}
                  value={formData.description}
                  onChange={(event) =>
                    handleInputChange("description", event.target.value)
                  }
                  className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald-600"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Category
                  </label>

                  <select
                    required
                    value={formData.category}
                    onChange={(event) =>
                      handleInputChange("category", event.target.value)
                    }
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-emerald-600"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Location
                  </label>

                  <input
                    type="text"
                    required
                    minLength={3}
                    maxLength={150}
                    value={formData.location}
                    onChange={(event) =>
                      handleInputChange("location", event.target.value)
                    }
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Event Image URL
                </label>

                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(event) =>
                    handleInputChange("image", event.target.value)
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Event Date
                </label>

                <input
                  type="datetime-local"
                  required
                  min={toLocalDateTime(new Date().toISOString())}
                  value={formData.eventDate}
                  onChange={(event) =>
                    handleInputChange("eventDate", event.target.value)
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  disabled={isSaving}
                  className="rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
