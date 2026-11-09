import { Navbar } from "@/components/layout/navbar";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">
            Welcome to Kindora
          </h1>

          <p className="text-muted-foreground">
            Connect People. Create Change. Build Communities.
          </p>

          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </main>
    </>
  );
}