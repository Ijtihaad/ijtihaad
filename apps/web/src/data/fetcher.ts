import { server_host } from "@app/web/constants/host.config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import refreshTokens from "./refresh-tokens";

export default async function fetcher<T = any>(
  pathname: string,
  options?: RequestInit
): Promise<T> {
  const cookieStore = cookies();
  const headers: Record<string, any> = options?.headers ?? {};
  if (cookieStore.has("accessToken")) {
    const accessToken = cookieStore.get("accessToken")?.value;
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  const url = `${server_host}/${pathname}`;
  let response = await fetch(url, {
    ...options,
    headers: headers,
    next: {
      ...options?.next,
      tags: [...(options?.next?.tags ?? []), "ALL"],
    },
  });

  if (response.status === 403) {
    const accessToken = await refreshTokens();
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
      response = await fetch(url, {
        ...options,
        headers: headers,
        next: {
          ...options?.next,
          tags: [...(options?.next?.tags ?? []), "ALL"],
        },
      });
    }
  }

  if (!response.ok) {
    if (response.status === 404) {
      return redirect("/not-found");
    }
    if (response.status === 403) {
      return redirect("/forbidden");
    }
    throw new Error("Failed to fetch data");
  }

  return (await response.json()) as T;
}
