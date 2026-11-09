
"use client";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    Search,
    ArrowUpRight,
    HeartHandshake,
} from "lucide-react";

import { mockEvents } from "@/constants/mock-events";

const categories = [
    "All Events",
    "Donation",
    "Plantation",
    "Cleanup",
    "Awareness",
];

export default function UpcomingEventsPage() {
    const [activeCategory, setActiveCategory] = useState("All Events");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEvents = useMemo(() => {
        return mockEvents.filter((event) => {
            const matchesCategory =
                activeCategory === "All Events" ||
                event.category === activeCategory;

            const matchesSearch =
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(`${date}T00:00:00`));
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background text-foreground">
                {/* Page Hero */}
                <section className="relative overflow-hidden border-b border-border bg-muted/40">
                    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                <HeartHandshake className="h-4 w-4" />
                                Make a Difference Together
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                Discover Events.
                                <span className="mt-2 block text-emerald-600 dark:text-emerald-400">
                                    Create Real Impact.
                                </span>
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                Explore meaningful community events, connect with passionate
                                people, and become part of something that makes a difference.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Events Section */}
                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    {/* Section Heading */}
                    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                Find Your Opportunity
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Upcoming Events
                            </h2>

                            <p className="mt-3 text-muted-foreground">
                                Find an event that matches your passion.
                            </p>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-semibold text-foreground">
                                {filteredEvents.length}
                            </span>{" "}
                            {filteredEvents.length === 1 ? "event" : "events"}
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-10 space-y-5">
                        <div className="relative max-w-xl">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search by event name or location..."
                                className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${activeCategory === category
                                            ? "bg-emerald-700 text-white shadow-sm"
                                            : "border border-border bg-background text-muted-foreground hover:border-emerald-600 hover:text-emerald-600"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Event Grid */}
                    {filteredEvents.length > 0 ? (
                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredEvents.map((event) => (
                                <article
                                    key={event.id}
                                    className="group overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {/* Event Image */}
                                    <Link
                                        href={`/upcoming-events/${event.id}`}
                                        className="relative block h-56 overflow-hidden bg-muted"
                                    >
                                        <div
                                            className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                                            style={{
                                                backgroundImage: `url(${event.image})`,
                                            }}
                                        />

                                        <span className="absolute left-4 top-4 rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white">
                                            {event.category}
                                        </span>
                                    </Link>

                                    {/* Event Information */}
                                    <div className="p-6">
                                        <h3 className="line-clamp-2 text-xl font-semibold transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                            {event.title}
                                        </h3>

                                        <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-3">
                                                <CalendarDays className="h-4 w-4 shrink-0 text-emerald-600" />
                                                <span>{formatDate(event.date)}</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 border-t border-border pt-5">
                                            <Link
                                                href={`/upcoming-events/${event.id}`}
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:gap-3 dark:text-emerald-400"
                                            >
                                                View Details
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border py-20 text-center">
                            <Search className="mx-auto h-10 w-10 text-muted-foreground" />

                            <h3 className="mt-4 text-xl font-semibold">
                                No events found
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Try another search term or select a different category.
                            </p>

                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveCategory("All Events");
                                }}
                                className="mt-5 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
