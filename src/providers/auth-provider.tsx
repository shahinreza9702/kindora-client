"use client";

import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext<typeof authClient | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={authClient}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}