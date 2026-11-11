
import { authClient } from "@/lib/auth-client";

interface ApiRequestOptions extends RequestInit {
  authenticated?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    authenticated = true,
    headers: customHeaders,
    ...requestOptions
  } = options;

  const headers = new Headers(customHeaders);

  if (requestOptions.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (authenticated) {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error("Authentication required. Please log in.");
    }

    headers.set("Authorization", `Bearer ${data.token}`);
  }

  const response = await fetch(path, {
    ...requestOptions,
    headers,
    credentials: "include",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Something went wrong. Please try again."
    );
  }

  return result as T;
}
