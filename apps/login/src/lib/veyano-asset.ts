// Veyano: URLs of bundled assets under the login's base path (/ui/v2/login).
// Next's static import gives { src }, vitest a string; whether Next's src already carries
// the base path is not relied on: withBasePath adds it once.
export function withBasePath(url: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!base || !url.startsWith("/") || url === base || url.startsWith(base + "/")) return url;
  return base + url;
}

export function assetUrl(imported: string | { src: string }): string {
  return withBasePath(typeof imported === "string" ? imported : imported.src);
}
