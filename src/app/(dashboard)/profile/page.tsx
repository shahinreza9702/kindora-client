
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Save, UserRound } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type ProfileUser = NonNullable<
  ReturnType<typeof authClient.useSession>["data"]
>["user"];

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-emerald-600" />
      </main>
    );
  }

  if (!session?.user) return null;

  return <ProfileForm key={session.user.id} user={session.user} />;
}

function ProfileForm({ user }: { user: ProfileUser }) {
  const router = useRouter();

  const [name, setName] = useState(user.name ?? "");
  const [image, setImage] = useState(user.image ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const isValidImageUrl = (value: string) => {
    if (!value.trim()) return true;

    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedImage = image.trim();

    if (trimmedName.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return;
    }

    if (trimmedName.length > 50) {
      toast.error("Name cannot exceed 50 characters.");
      return;
    }

    if (!isValidImageUrl(trimmedImage)) {
      toast.error("Please enter a valid HTTP or HTTPS image URL.");
      return;
    }

    if (
      trimmedName === user.name &&
      trimmedImage === (user.image ?? "")
    ) {
      toast.info("No changes to save.");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || null,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
        return;
      }

      toast.success("Profile updated successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const previewImage = image.trim() && isValidImageUrl(image);

  return (
    <main className="min-h-[70vh] bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Account Settings
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your personal information and profile picture.
          </p>
        </div>

        <section className="rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex flex-col items-center gap-4 border-b pb-8 sm:flex-row">
            {previewImage ? (
              <div
                role="img"
                aria-label="Profile picture preview"
                className="h-24 w-24 shrink-0 rounded-full border bg-cover bg-center"
                style={{ backgroundImage: `url("${image.trim()}")` }}
              />
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <UserRound className="h-10 w-10" />
              </div>
            )}

            <div className="text-center sm:text-left">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Manage your Kindora account information.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="profile-name" className="text-sm font-medium">
                Display Name
              </label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                minLength={2}
                maxLength={50}
                required
                autoComplete="name"
                placeholder="Enter your name"
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="profile-image" className="text-sm font-medium">
                Profile Picture URL
              </label>

              <input
                id="profile-image"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />

              <p className="text-xs text-muted-foreground">
                Enter an image URL. Leave it empty to remove your current picture.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="profile-email" className="text-sm font-medium">
                Email Address
              </label>

              <input
                id="profile-email"
                type="email"
                value={user.email}
                readOnly
                className="h-11 w-full cursor-not-allowed rounded-lg border bg-muted px-3 text-sm text-muted-foreground outline-none"
              />

              <p className="text-xs text-muted-foreground">
                Email address cannot be changed from this page.
              </p>
            </div>

            <div className="flex justify-end border-t pt-5">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {isSaving ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}

                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
