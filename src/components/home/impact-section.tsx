
import {
  HeartHandshake,
  MapPin,
  Sprout,
  Users,
} from "lucide-react";

const impactItems = [
  {
    icon: Users,
    title: "People First",
    description:
      "Bringing together individuals who care about making their communities better.",
  },
  {
    icon: HeartHandshake,
    title: "Shared Purpose",
    description:
      "Connecting passionate volunteers with meaningful social initiatives.",
  },
  {
    icon: MapPin,
    title: "Local Action",
    description:
      "Encouraging people to create positive change right in their neighborhoods.",
  },
  {
    icon: Sprout,
    title: "Lasting Change",
    description:
      "Supporting small actions that contribute to a stronger and kinder future.",
  },
];

export function ImpactSection() {
  return (
    <section className="bg-emerald-700 py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-50">
            Our Community Impact
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Together, We Can Create
            <span className="block text-emerald-200">
              Meaningful Change.
            </span>
          </h2>

          <p className="mt-5 leading-7 text-emerald-100">
            Real change begins when people come together.
            Kindora makes it easier to turn compassion into
            meaningful community action.
          </p>
        </div>

        {/* Impact Items */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/15 bg-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <Icon className="h-7 w-7 text-emerald-100" />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-emerald-100">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-14 border-t border-white/20 pt-8 text-center">
          <p className="text-lg font-medium text-emerald-50">
            Every act of kindness matters. Every volunteer
            makes a difference.
          </p>
        </div>

      </div>
    </section>
  );
}
