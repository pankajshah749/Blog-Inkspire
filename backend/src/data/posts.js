import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const postsFile = fileURLToPath(new URL("./posts.json", import.meta.url));

export function getPublishedPosts() {
  const posts = JSON.parse(readFileSync(postsFile, "utf8"));
  if (!Array.isArray(posts)) throw new TypeError("posts.json must contain an array");
  return posts.filter((post) => post.status === "published");
}
