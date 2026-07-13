export function isIOSWebKitUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();

  const isIOSDevice =
    ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod");
  const isWebKit = ua.includes("webkit");

  return isIOSDevice && isWebKit;
}
