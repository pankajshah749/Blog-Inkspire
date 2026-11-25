import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import api from "../api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [data, setData] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    api.get("/posts?page=1&limit=7")
      .then((response) => setData(response.data))
      .catch((error) => {
        if (controller.signal.aborted) return;
        setData({ items: [] });
        setLoadError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const [hero, ...more] = data.items;

  return (
    <main className="page-enter">
      <section className="relative overflow-hidden border-b border-black/[.06]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d9e0d6] bg-white/70 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#55745d]">
              <Sparkles size={14} /> An independent journal
            </div>
            <h1 className="max-w-3xl text-[clamp(3.2rem,7.5vw,6.6rem)] font-black leading-[.94] tracking-[-.075em]">
              Stories for a <span className="font-serif font-normal italic tracking-[-.065em] text-[#64836b]">more curious</span> world.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-stone-600 md:text-lg md:leading-8">
              Thoughtful ideas, creative work, and fresh perspectives for a life well observed.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/search" className="inline-flex items-center gap-2 rounded-full bg-[#2f5c46] px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(47,92,70,.16)] transition hover:-translate-y-0.5 hover:bg-[#244b38]">
                Explore the journal <ArrowRight size={16} />
              </Link>
              <span className="text-xs font-medium text-stone-500">A slower kind of reading.</span>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/10 pt-5 text-[11px] font-semibold uppercase tracking-[.12em] text-stone-500">
              <span>Ideas</span><span className="text-[#9ca69a]">/</span>
              <span>Design</span><span className="text-[#9ca69a]">/</span>
              <span>Technology</span><span className="text-[#9ca69a]">/</span>
              <span>Culture</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute -right-7 -top-8 h-28 w-28 rounded-full border border-[#ccd7ca] md:-right-10 md:-top-10 md:h-36 md:w-36" />
            <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-[#d8e2d4]" />
            <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] bg-[#dfe7dc] p-6 sm:min-h-[390px] sm:p-8">
              <div className="flex items-start justify-between text-[10px] font-bold uppercase tracking-[.2em] text-[#56725b]">
                <span>INKSPIRE JOURNAL</span><span>VOL. 01</span>
              </div>
              <div aria-hidden="true" className="absolute -right-12 top-16 h-64 w-64 rounded-full border border-[#b8c8b6] sm:h-80 sm:w-80" />
              <div aria-hidden="true" className="absolute right-8 top-28 h-44 w-44 rounded-full bg-[#c4d2c0] sm:right-12 sm:top-32 sm:h-56 sm:w-56" />
              <div aria-hidden="true" className="absolute right-20 top-40 h-28 w-28 rounded-full bg-[#aebfae] sm:right-28 sm:top-48 sm:h-36 sm:w-36" />
              <div className="absolute bottom-7 left-6 right-6 flex items-end justify-between sm:bottom-9 sm:left-8 sm:right-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#55745d]">A little more wonder</p>
                  <p className="mt-2 max-w-[230px] font-serif text-3xl italic leading-tight text-[#23372b] sm:text-4xl">Look closer.<br />Think deeper.</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#2f5c46] text-white shadow-lg">
                  <BookOpen size={18} />
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[.18em] text-stone-400">Curiosity, collected.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-black/10 pb-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#66846d]">From the journal</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.045em] sm:text-4xl">Latest stories</h2>
          </div>
          <Link to="/search" className="group inline-flex items-center gap-1 pb-1 text-sm font-bold text-[#41654d]">
            Browse all <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        {more.length ? (
          <div className="grid gap-x-8 gap-y-12 py-9 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((post) => <PostCard key={post._id || post.slug} post={post} />)}
          </div>
        ) : loading ? (
          <div className="grid gap-6 py-9 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-[5/4] rounded-2xl bg-[#e9e8e1]" />
                <div className="mt-5 h-3 w-24 rounded bg-[#e9e8e1]" />
                <div className="mt-3 h-6 w-4/5 rounded bg-[#e9e8e1]" />
                <div className="mt-2 h-4 w-full rounded bg-[#e9e8e1]" />
              </div>
            ))}
          </div>
        ) : loadError ? (
          <div role="alert" className="mt-8 rounded-2xl border border-[#ead8cb] bg-[#fff9f4] p-6 text-sm text-[#76503c]">
            We couldn&apos;t load the journal right now. Please refresh to try again.
          </div>
        ) : (
          <div className="grid gap-6 py-9 md:grid-cols-[1.1fr_.9fr]">
            <div className="flex min-h-64 flex-col justify-between rounded-[1.75rem] bg-[#e9e7df] p-7 sm:p-9">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-[#41654d]">
                <BookOpen size={19} />
              </div>
              <div className="mt-10">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#66846d]">The next chapter</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Good reads are worth the wait.</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-stone-600">We&apos;re putting together thoughtful stories for curious minds.</p>
              </div>
            </div>
            <div className="flex min-h-64 flex-col justify-center rounded-[1.75rem] border border-black/10 bg-white/55 p-7 sm:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-stone-500">Start exploring</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Design", "Technology", "Culture", "Ideas"].map((category) => (
                  <Link key={category} to={`/category/${category}`} className="rounded-full border border-[#dfe3dc] bg-white px-4 py-2.5 text-xs font-semibold text-[#405847] transition hover:border-[#9db09d] hover:bg-[#f4f7f2]">
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
