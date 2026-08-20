/** Metasal Jupiter referral — always attach on jup.ag outbound. */
export const JUP_REF_ID = "yfgv2ibxy07v";

/**
 * Append referral to Jupiter product URLs.
 * Uses both common params: refId (canonical in sol.new) + ref (fallback).
 * Non-jup hosts returned unchanged unless force.
 */
export function jupRef(url: string, force = false): string {
  try {
    const u = new URL(url);
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
