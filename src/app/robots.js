export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/popup-callback"],
      },
    ],
    sitemap: "https://image.soook.fr/sitemap.xml",
    host: "https://image.soook.fr",
  };
}
