
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { mockEvents } from "@/constants/mock-events";

export function RecentEventsSection() {
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

        {/* Event Cards */}
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {mockEvents.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/40 hover:shadow-lg"
            >
              {/* Event Image */}
              <div className="relative h-52 overflow-hidden bg-muted">
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
              </div>

              {/* Event Information */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-emerald-600">
                  {event.title}
                </h3>

                <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-emerald-600" />
                    <time dateTime={event.date}>
                      {new Date(event.date + "T00:00:00").toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
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
                    <Link href={`/upcoming-events/${event.id}`}>
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
