import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function PostCard({ post, featured = false }) {
  return (
    <article className={`group ${featured ? "grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10" : ""}`}>
      <Link
        to={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}`}
        className={`relative block overflow-hidden rounded-[1.4rem] bg-[#e5e3dc] ${featured ? "aspect-[16/10]" : "aspect-[5/4]"}`}
      >
        {post.coverImage ? (
          <img src={post.coverImage} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_75%_25%,#dce4d8,transparent_42%),linear-gradient(135deg,#eeece4,#dce1d8)] text-5xl font-black tracking-tight text-[#84917f]">
            ink<span className="text-[#63826a]">.</span>
          </div>
        )}
        {featured && <span className="absolute left-4 top-4 rounded-full bg-[#f7f5f0]/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.15em] text-[#45644c]">Editor&apos;s pick</span>}
      </Link>
      <div className={`flex flex-col ${featured ? "justify-center" : ""}`}>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#65836c]">
          <span>{post.category}</span><span className="h-1 w-1 rounded-full bg-[#9eac9d]" /><span>{post.readingMinutes || 4} min read</span>
        </div>
        <Link to={`/blog/${post.slug}`} className="focus-visible:rounded-sm">
          <h2 className={`mt-3 font-black leading-[1.08] tracking-[-.045em] transition-colors group-hover:text-[#52745c] ${featured ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>
            {post.title}
          </h2>
        </Link>
        <p className={`mt-3 text-sm leading-6 text-stone-600 ${featured ? "max-w-xl md:text-base md:leading-7" : "line-clamp-3"}`}>
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-black/[.07] pt-4 text-xs text-stone-500">
          <span className="min-w-0 truncate">
            <span className="font-semibold text-stone-700">{post.author?.name || "Inkspire"}</span>
            <span className="px-1.5 text-stone-300">·</span>
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Journal"}
          </span>
          <span className="ml-3 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10 transition-all group-hover:border-[#2f5c46] group-hover:bg-[#2f5c46] group-hover:text-white">
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </article>
  );
}
