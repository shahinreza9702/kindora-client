
import { Suspense } from "react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import EventDetailsClient from "./event-details-client";

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function EventDetailsContent({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  return <EventDetailsClient id={id} />;
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
