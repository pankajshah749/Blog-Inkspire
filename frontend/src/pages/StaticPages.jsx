import { Link } from "react-router-dom";

export function About() {
  return (
    <main className="page-enter">
      <section className="border-b border-black/[.06] bg-[#efede6]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#66846d]">Our purpose</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.03] tracking-[-.06em] sm:text-6xl">
            Good ideas deserve <span className="font-serif font-normal italic text-[#64836b]">room to grow.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
            Inkspire is an independent journal for curious people. We publish thoughtful stories about creativity,
            technology, design, and the everyday moments that shape how we see the world.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:py-20 lg:px-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#66846d]">A different pace</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight">Less noise. More meaning.</h2>
        </div>
        <div className="space-y-4 text-sm leading-7 text-stone-600 sm:text-base">
          <p>We believe the internet can be slower, kinder, and more meaningful—a space to pause and discover new perspectives.</p>
          <p>Every story is an invitation to look closer, ask better questions, and leave with an idea worth carrying forward.</p>
          <Link to="/search" className="inline-flex items-center gap-2 pt-2 text-sm font-bold text-[#41654d] transition hover:gap-3">
            Explore the journal <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export function Contact() {
  return (
    <main className="page-enter mx-auto min-h-[65vh] max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
      <div className="grid gap-10 rounded-[2rem] border border-black/[.06] bg-white/60 p-7 sm:p-10 md:grid-cols-[.8fr_1.2fr] md:gap-16 md:p-14">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#66846d]">Say hello</p>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-.055em] sm:text-5xl">Good things start with a note.</h1>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-base leading-7 text-stone-600">
            Have a story idea, a question, or a collaboration in mind? We&apos;d be glad to hear from you.
          </p>
          <a className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#2f5c46] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#244b38]" href="mailto:hello@inkspire.example">
            hello@inkspire.example <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-4 text-xs text-stone-500">Replace this placeholder email before launch.</p>
        </div>
      </div>
    </main>
  );
}

export function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#66846d]">404 · Page not found</p>
      <h1 className="mt-4 text-5xl font-black">This page wandered off.</h1>
      <p className="mt-4 text-stone-500">The link may be old or the page may have moved.</p>
      <Link to="/" className="mt-8 inline-block rounded-full bg-[#2f5c46] px-6 py-3 font-bold text-white">Return home</Link>
    </main>
  );
}
