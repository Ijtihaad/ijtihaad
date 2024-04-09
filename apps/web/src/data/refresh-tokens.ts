"use server";

import { server_host } from "@app/web/constants/host.config";
import { cookies } from "next/headers";

export default async function refreshTokens() {
  const cookieStore = cookies();
  if (!cookieStore.has("refreshToken")) {
    return null;
  }
  const url = `${server_host}/auth/token/refresh`;
  const res = await fetch(url, {
    body: JSON.stringify({
      refresh: cookieStore.get("refreshToken")?.value ?? "",
    }),
    next: {
      revalidate: 15 * 3600,
    },
  });

  if (!res.ok) {
    return null;
  }

  const { accessToken, refreshToken } = await res.json();
  cookieStore.set({
    name: "accessToken",
    value: accessToken,
    expires: new Date(Date.now() + 15 * 3600 * 1000),
    secure: process.env.NODE_ENV === "production",
  });
  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    expires: new Date(Date.now() + 15 * 3600 * 1000),
    secure: process.env.NODE_ENV === "production",
  });

  return accessToken
}
