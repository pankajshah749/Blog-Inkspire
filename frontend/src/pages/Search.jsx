import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ArrowRight, Search as SearchIcon, X } from "lucide-react";
import api from "../api";
import PostCard from "../components/PostCard";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const { category: routeCategory, tag: routeTag } = useParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [category, setCategory] = useState(routeCategory || "");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setCategory(routeCategory || "");
    setPage(1);
  }, [routeCategory]);

  useEffect(() => {
    api.get("/posts/categories").then((response) => setCategories(response.data)).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const search = new URLSearchParams({ page, limit: 9 });
    if (query) search.set("search", query);
    if (routeCategory || category) search.set("category", routeCategory || category);
    if (routeTag) search.set("tag", routeTag);
    setLoading(true);
    setLoadError(false);
    api.get(`/posts?${search}`, { signal: controller.signal })
      .then((response) => {
        setItems(response.data.items);
        setPages(response.data.pages);
        setTotal(response.data.total);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setItems([]);
        setPages(1);
        setTotal(0);
        setLoadError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [query, page, category, routeCategory, routeTag]);

  const submit = (event) => {
    event.preventDefault();
    setPage(1);
    setParams(query ? { q: query } : {});
  };

  const selectCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const hasFilters = Boolean(query || routeCategory || routeTag || category);

  return (
    <main className="page-enter mx-auto min-h-[65vh] max-w-7xl px-5 py-12 sm:py-16 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#66846d]">The Inkspire index</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-.055em] sm:text-5xl">Find your next read.</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">
          Search thoughtful writing across design, technology, culture, and ideas.
        </p>
      </div>
      <form onSubmit={submit} role="search" className="mt-8 flex max-w-3xl items-center gap-3 rounded-2xl border border-[#d9dcd4] bg-white px-4 py-3 shadow-[0_8px_30px_rgba(34,35,31,.04)] transition focus-within:border-[#829985] focus-within:ring-4 focus-within:ring-[#829985]/10 sm:px-5">
        <SearchIcon className="shrink-0 text-[#65836c]" size={19} />
        <input
          aria-label="Search stories"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search ideas, stories, topics…"
          className="min-w-0 w-full bg-transparent py-1 text-sm outline-none placeholder:text-stone-400 sm:text-base"
        />
        {query && (
          <button type="button" onClick={() => { setQuery(""); setPage(1); setParams({}); }} aria-label="Clear search" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-stone-500 hover:bg-stone-100">
            <X size={16} />
          </button>
        )}
        <button type="submit" aria-label="Search stories" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#2f5c46] text-white transition hover:bg-[#244b38] sm:hidden">
          <ArrowRight size={16} />
        </button>
        <button type="submit" className="hidden items-center gap-1 rounded-xl bg-[#2f5c46] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#244b38] sm:flex">
          Search <ArrowRight size={15} />
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[.16em] text-stone-500">Topics</span>
        <button
          type="button"
          aria-pressed={!category}
          onClick={() => selectCategory("")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${!category ? "bg-[#2f5c46] text-white" : "border border-[#dfe3dc] bg-white/60 text-stone-600 hover:bg-white"}`}
        >
          All topics
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => selectCategory(item)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${category === item ? "bg-[#2f5c46] text-white" : "border border-[#dfe3dc] bg-white/60 text-stone-600 hover:bg-white"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5">
        <h2 className="text-sm font-bold">
          {loading ? "Finding stories…" : loadError ? "Stories unavailable" : `${total} ${total === 1 ? "story" : "stories"} found`}
        </h2>
        {!loading && !loadError && <p className="text-xs text-stone-500">{total} {total === 1 ? "result" : "results"}</p>}
      </div>
      {loadError ? (
        <div role="alert" className="mt-5 rounded-2xl border border-[#ead8cb] bg-[#fff9f4] p-6 text-sm text-[#76503c]">
          We couldn&apos;t load stories. Please refresh and try again.
        </div>
      ) : loading ? (
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading stories">
          {[0, 1, 2].map((item) => <div key={item} className="animate-pulse"><div className="aspect-[5/4] rounded-2xl bg-[#e9e8e1]" /><div className="mt-5 h-3 w-24 rounded bg-[#e9e8e1]" /><div className="mt-3 h-6 w-4/5 rounded bg-[#e9e8e1]" /></div>)}
        </div>
      ) : items.length ? (
        <>
          <div className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => <PostCard key={post._id || post.slug} post={post} />)}
          </div>
          {pages > 1 && (
            <nav aria-label="Search results pages" className="mt-12 flex items-center justify-center gap-3">
              <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-white disabled:opacity-30">
                Previous
              </button>
              <span className="px-3 text-sm text-stone-600">Page {page} of {pages}</span>
              <button type="button" disabled={page >= pages} onClick={() => setPage((current) => current + 1)} className="rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-white disabled:opacity-30">
                Next
              </button>
            </nav>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-[1.75rem] border border-[#e4e4dc] bg-white/60 px-6 py-12 text-center sm:px-10">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#e9eee7] text-[#41654d]"><SearchIcon size={20} /></div>
          <h3 className="mt-5 text-xl font-black tracking-tight">Nothing on this page just yet.</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600">
            {hasFilters ? "Try a different search or clear your filters to explore all stories." : "New stories will appear here as they join the journal."}
          </p>
          {hasFilters && (
            <button type="button" onClick={() => { setQuery(""); setCategory(""); setPage(1); setParams({}); }} className="mt-5 rounded-full bg-[#2f5c46] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#244b38]">
              Clear filters
            </button>
          )}
        </div>
      )}
    </main>
  );
}
