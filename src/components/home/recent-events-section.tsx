
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  LoaderCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";

interface Event {
  _id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  eventDate: string;
}

interface EventsResponse {
  success: boolean;
  message: string;
  data: Event[];
}

export function RecentEventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchEvents() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await apiRequest<EventsResponse>(
          "/api/events",
          {
            method: "GET",
            authenticated: false,
            cache: "no-store",
          }
        );

        if (isMounted) {
          setEvents(response.data.slice(0, 3));
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Failed to load recent events."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              Make a Difference
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Upcoming Community Events
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Discover meaningful events happening around your
              community and find your next opportunity to help.
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/upcoming-events">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="mt-12 flex min-h-64 flex-col items-center justify-center gap-4">
            <LoaderCircle className="h-9 w-9 animate-spin text-emerald-600" />
            <p className="text-sm text-muted-foreground">
              Loading recent events...
            </p>
          </div>
        ) : errorMessage ? (
          /* Error State */
          <div className="mt-12 rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-lg font-semibold">
              Unable to load events
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {errorMessage}
            </p>
          </div>
        ) : events.length > 0 ? (
          /* Event Cards */
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/40 hover:shadow-lg"
              >
                {/* Event Image */}
                <Link
                  href={`/upcoming-events/${event._id}`}
                  className="relative block h-52 overflow-hidden bg-muted"
                >
                  <div
                    role="img"
                    aria-label={event.title}
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url("${event.image}")`,
                    }}
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {event.category}
                  </span>
                </Link>

                {/* Event Information */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-emerald-600">
                    {event.title}
                  </h3>

                  <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-emerald-600" />
                      <time dateTime={event.eventDate}>
                        {formatDate(event.eventDate)}
                      </time>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-5 border-t pt-4">
                    <Button
                      variant="ghost"
                      asChild
                      className="w-full justify-between text-emerald-700 hover:bg-emerald-600/10 hover:text-emerald-700 dark:text-emerald-400"
                    >
                      <Link href={`/upcoming-events/${event._id}`}>
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-12 rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-lg font-semibold">
              No upcoming events yet
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              There are currently no upcoming events. Please check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
