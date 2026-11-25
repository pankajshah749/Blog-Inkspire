import { Router } from "express";
import { getPublishedPosts } from "../data/posts.js";

export const seoRouter = Router();

const siteUrl = () => (process.env.CLIENT_URL || "http://localhost:5173").split(",")[0].trim().replace(/\/$/, "");
const escapeXml = (value) => String(value || "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

seoRouter.get("/rss", (_req, res, next) => {
  try {
    const site = siteUrl();
    const posts = getPublishedPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 50);
    res.type("application/rss+xml").send(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Inkspire</title><link>${escapeXml(site)}</link><description>Stories for a curious world</description>${posts.map((post) => {
      const link = `${site}/blog/${post.slug}`;
      return `<item><title>${escapeXml(post.title)}</title><link>${escapeXml(link)}</link><guid>${escapeXml(link)}</guid><description>${escapeXml(post.excerpt)}</description><pubDate>${new Date(post.createdAt).toUTCString()}</pubDate></item>`;
    }).join("")}</channel></rss>`);
  } catch (error) {
    next(error);
  }
});

seoRouter.get("/sitemap.xml", (_req, res, next) => {
  try {
    const site = siteUrl();
    const posts = getPublishedPosts();
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${posts.map((post) => `<url><loc>${escapeXml(`${site}/blog/${post.slug}`)}</loc><lastmod>${new Date(post.updatedAt || post.createdAt).toISOString()}</lastmod></url>`).join("")}</urlset>`);
  } catch (error) {
    next(error);
  }
});
