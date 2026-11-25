import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock3 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../api";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    setPost(null);
    setStatus("loading");
    api.get(`/posts/${slug}`, { signal: controller.signal })
      .then((response) => {
        setPost(response.data.post);
        setStatus("ready");
        document.title = `${response.data.post.title} — Inkspire`;
      })
      .catch((error) => {
        if (!controller.signal.aborted) setStatus(error.response?.status === 404 ? "notFound" : "error");
      });
    return () => {
      controller.abort();
      document.title = "Inkspire — Stories worth your time";
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <main className="mx-auto min-h-[70vh] max-w-4xl animate-pulse px-5 py-12 lg:py-16" aria-label="Loading story">
        <div className="h-3 w-24 rounded bg-[#e5e5dd]" />
        <div className="mt-7 h-12 max-w-2xl rounded bg-[#e5e5dd]" />
        <div className="mt-3 h-12 max-w-xl rounded bg-[#e5e5dd]" />
        <div className="mt-7 h-4 max-w-lg rounded bg-[#e5e5dd]" />
        <div className="mt-10 aspect-[16/8] rounded-3xl bg-[#e5e5dd]" />
      </main>
    );
  }

  if (status === "notFound" || status === "error") {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#e9eee7] text-[#41654d]"><BookOpen size={22} /></div>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#66846d]">
          {status === "notFound" ? "404 · Not found" : "A little pause"}
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">
          {status === "notFound" ? "This story wandered off." : "We couldn’t load this story."}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-stone-600">
          {status === "notFound" ? "It may have moved, or the link may be out of date." : "Check your connection and try again."}
        </p>
        <Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2f5c46] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#244b38]">
          <ArrowLeft size={16} /> Back to the journal
        </Link>
      </main>
    );
  }

  return (
    <article className="page-enter mx-auto max-w-5xl px-5 py-10 sm:py-14 lg:px-8 lg:py-16">
      <Link to="/search" className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 transition hover:text-[#41654d]">
        <ArrowLeft size={14} /> Back to stories
      </Link>
      <header className="mx-auto mt-10 max-w-4xl text-center">
        <Link to={`/category/${encodeURIComponent(post.category)}`} className="inline-flex rounded-full bg-[#e9eee7] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#41654d] transition hover:bg-[#dce7dc]">
          {post.category}
        </Link>
        <h1 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-.06em] sm:text-5xl lg:text-6xl">{post.title}</h1>
        {post.excerpt && <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">{post.excerpt}</p>}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-stone-500">
          <span className="font-semibold text-stone-700">{post.author?.name || "Inkspire Editorial"}</span>
          <span className="hidden h-1 w-1 rounded-full bg-stone-300 sm:block" />
          <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</time>
          <span className="hidden h-1 w-1 rounded-full bg-stone-300 sm:block" />
          <span className="inline-flex items-center gap-1"><Clock3 size={13} /> {post.readingMinutes || 4} min read</span>
        </div>
      </header>
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="mt-9 max-h-[600px] w-full rounded-[1.75rem] object-cover shadow-[0_24px_70px_rgba(34,35,31,.1)] sm:mt-12" />
      )}
      <div className="prose-blog mx-auto mt-10 max-w-3xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
      {post.tags?.length > 0 && (
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center gap-2 border-t border-black/10 pt-6">
          <span className="mr-1 text-[10px] font-bold uppercase tracking-[.15em] text-stone-500">Filed under</span>
          {post.tags.map((tag) => <Link key={tag} to={`/tag/${encodeURIComponent(tag)}`} className="rounded-full border border-[#dfe3dc] bg-white/70 px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:border-[#9db09d] hover:text-[#41654d]">#{tag}</Link>)}
        </div>
      )}
      <div className="mx-auto mt-12 max-w-3xl rounded-[1.5rem] bg-[#e9e7df] p-6 sm:flex sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#66846d]">Keep exploring</p>
          <p className="mt-2 text-xl font-black tracking-tight">There&apos;s always another point of view.</p>
        </div>
        <Link to="/search" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2f5c46] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#244b38] sm:mt-0">
          Find a story <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
