
import { ArrowRight, Images } from "lucide-react";
import Link from "next/link";

const galleryImages = [
  {
    title: "Community Clean-up",
    category: "Environment",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    position: "center",
  },
  {
    title: "Helping Hands",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8",
    position: "center",
  },
  {
    title: "Growing Together",
    category: "Plantation",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
    position: "center",
  },
  {
    title: "Sharing Kindness",
    category: "Donation",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
    position: "center",
  },
  {
    title: "Stronger Together",
    category: "Volunteering",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
    position: "center",
  },
  {
    title: "Making a Difference",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433",
    position: "center",
  },
];

export function GallerySection() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <Images className="h-4 w-4" />
              Moments That Matter
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Together, We Make
              <span className="block text-emerald-600">
                A Better Tomorrow.
              </span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Every small action creates a meaningful story.
              Explore moments of kindness, teamwork, and
              positive change from our communities.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
          >
            Explore Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item) => (
            <div
              key={item.title}
              className="group relative h-64 overflow-hidden rounded-2xl bg-muted sm:h-72"
            >
              <div
                role="img"
                aria-label={item.title}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("${item.image}")`,
                  backgroundPosition: item.position,
                }}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {item.category}
                </span>

                <h3 className="mt-3 text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
