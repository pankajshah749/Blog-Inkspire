import { Router } from "express";
import { getPublishedPosts } from "../data/posts.js";

export const postRouter = Router();

postRouter.get("/", (req, res, next) => {
  try {
    let posts = getPublishedPosts();
    const { category, tag, search, featured } = req.query;

    if (typeof category === "string" && category.trim()) {
      posts = posts.filter((post) => post.category === category.trim());
    }
    if (typeof tag === "string" && tag.trim()) {
      posts = posts.filter((post) => post.tags?.includes(tag.trim()));
    }
    if (typeof featured === "string" && featured === "true") {
      posts = posts.filter((post) => post.featured === true);
    }
    if (typeof search === "string" && search.trim()) {
      const query = search.trim().toLocaleLowerCase();
      posts = posts.filter((post) => [
        post.title,
        post.excerpt,
        post.content,
        ...(post.tags || []),
      ].some((value) => String(value || "").toLocaleLowerCase().includes(query)));
    }

    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(24, Math.max(1, Number(req.query.limit) || 9));
    const start = (page - 1) * limit;
    res.json({
      items: posts.slice(start, start + limit),
      page,
      pages: Math.ceil(posts.length / limit),
      total: posts.length,
    });
  } catch (error) {
    next(error);
  }
});

postRouter.get("/categories", (_req, res, next) => {
  try {
    res.json([...new Set(getPublishedPosts().map((post) => post.category))].sort());
  } catch (error) {
    next(error);
  }
});

postRouter.get("/tags", (_req, res, next) => {
  try {
    res.json([...new Set(getPublishedPosts().flatMap((post) => post.tags || []))].sort());
  } catch (error) {
    next(error);
  }
});

postRouter.get("/:slug", (req, res, next) => {
  try {
    const post = getPublishedPosts().find((item) => item.slug === req.params.slug);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ post, comments: [] });
  } catch (error) {
    next(error);
  }
});
