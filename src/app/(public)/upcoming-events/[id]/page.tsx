
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  HeartHandshake,
  UserRound,
  Clock,
} from "lucide-react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mockEvents } from "@/constants/mock-events";

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function EventDetailsContent({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  const event = mockEvents.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${event.date}T00:00:00`));

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-emerald-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Upcoming Events
        </Link>
      </div>

      {/* Event Banner */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative h-[280px] overflow-hidden rounded-2xl bg-muted sm:h-[400px] lg:h-[480px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${event.image})`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <span className="inline-flex rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white">
              {event.category}
            </span>

            <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {formattedDate}
              </span>

              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              About This Event
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Be Part of Something Meaningful
            </h2>

            <p className="mt-5 text-base leading-8 text-muted-foreground">
              {event.description}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600">
                <HeartHandshake className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-semibold">Why Join This Event?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Connect with people and contribute to your community.
                </p>
              </div>
            </div>

            <p className="mt-5 leading-7 text-muted-foreground">
              Your participation can help create positive change.
              Join other community members, share your time, and
              contribute to a meaningful initiative.
            </p>
          </div>
        </div>

        {/* Event Information */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold">Event Information</h2>

          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <CalendarDays className="h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">Event Date</p>
                <p className="mt-1 font-medium">{formattedDate}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="mt-1 font-medium">{event.location}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="mt-1 font-medium">{event.category}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <UserRound className="h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm text-muted-foreground">Organized By</p>
                <p className="mt-1 font-medium">{event.organizer}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white opacity-70"
            >
              Join Event — Coming Soon
            </button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Event registration will be available after authentication
              is implemented.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

function EventDetailsFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="h-64 animate-pulse rounded-2xl bg-muted sm:h-96" />
      <div className="mt-8 h-8 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-4 w-full animate-pulse rounded bg-muted" />
      <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-muted" />
    </div>
  );
}

export default function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-foreground">
        <Suspense fallback={<EventDetailsFallback />}>
          <EventDetailsContent params={params} />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
