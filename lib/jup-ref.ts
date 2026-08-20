/** Metasal Jupiter web referral (jup.ag query params). */
export const JUP_REF_ID = "yfgv2ibxy07v";

/**
 * Jupiter Mobile / Adjust app deep link (go.link).
 * Mobile: opens / attributes Jupiter app install.
 * Desktop fallback from Adjust → https://jupiter.global/
 */
export const JUP_GO_LINK = "https://jupiter.go.link/l6gxn";
export const JUP_GO_CODE = "l6gxn";

/**
 * Append referral to Jupiter product URLs.
 * Uses both common params: refId (canonical in sol.new) + ref (fallback).
 * Non-jup hosts returned unchanged unless force.
 * Does not rewrite jupiter.go.link / adjust hosts.
 */
export function jupRef(url: string, force = false): string {
  try {
    const u = new URL(url);
    if (
      u.hostname === "jupiter.go.link" ||
      u.hostname.endsWith(".go.link") ||
      u.hostname.includes("adjust")
    ) {
      return url;
    }
    const isJup =
      u.hostname === "jup.ag" ||
      u.hostname.endsWith(".jup.ag") ||
      force;
    if (!isJup) return url;
    if (!u.searchParams.has("refId")) u.searchParams.set("refId", JUP_REF_ID);
    if (!u.searchParams.has("ref")) u.searchParams.set("ref", JUP_REF_ID);
    return u.toString();
  } catch {
    return url;
  }
}
