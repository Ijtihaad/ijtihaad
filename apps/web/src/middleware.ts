import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "../locales/config/navigation";

export default createMiddleware({
  defaultLocale: "en",
  localePrefix,
  locales,
  pathnames,
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
