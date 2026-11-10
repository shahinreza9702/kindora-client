"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  HeartHandshake,
  ArrowUpRight,
  LoaderCircle,
  Clock,
} from "lucide-react";

import { apiRequest } from "@/lib/api";

interface JoinedEvent {
  _id: string;
  eventId: string;
  userId: string;
  userEmail: string;
  joinedAt: string;
  event: {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    location: string;
    eventDate: string;
    organizerEmail: string;
  };
}

interface JoinedEventsResponse {
  success: boolean;
  message: string;
  data: JoinedEvent[];
}

export default function JoinedEventsPage() {
  const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchJoinedEvents() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await apiRequest<JoinedEventsResponse>(
          "/api/event-participants/my-events",
          {
            method: "GET",
          }
        );

        if (isMounted) {
          setJoinedEvents(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Failed to load your joined events."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchJoinedEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600">
              <HeartHandshake className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Your Participation
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Joined Events
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Keep track of the community initiatives you have joined
            and stay updated on your upcoming volunteering activities.
          </p>
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
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
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
              Unable to Load Joined Events
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading &&
          !errorMessage &&
          joinedEvents.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-600">
                <HeartHandshake className="h-8 w-8" />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                No Joined Events Yet
              </h2>

              <p className="mt-3 max-w-md leading-7 text-muted-foreground">
                You haven't joined any community events yet.
                Explore upcoming events and find an opportunity
                to make a positive impact.
              </p>

              <Link
                href="/upcoming-events"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Explore Events
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}

        {/* Joined Events Grid */}
        {!isLoading &&
          !errorMessage &&
          joinedEvents.length > 0 && (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  You have joined{" "}
                  <span className="font-semibold text-foreground">
                    {joinedEvents.length}
                  </span>{" "}
                  {joinedEvents.length === 1 ? "event" : "events"}.
                </p>

                <Link
                  href="/upcoming-events"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
                >
                  Explore More Events
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {joinedEvents.map((item) => {
                  const event = item.event;

                  return (
                    <article
                      key={item._id}
                      className="group overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* Event Image */}
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

                      {/* Event Information */}
                      <div className="p-5">
                        <h2 className="line-clamp-2 text-lg font-bold transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
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

                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 shrink-0 text-emerald-600" />
                            <span>
                              Joined on {formatDate(item.joinedAt)}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/upcoming-events/${event._id}`}
                          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-700 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-700 hover:text-white dark:text-emerald-400 dark:hover:text-white"
                        >
                          View Event Details
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
      </div>
    </main>
  );
}
