import { getCookie, setCookie } from "../utils/cookie-store";

export default function useCookie() {
  return { getCookie, setCookie };
}
