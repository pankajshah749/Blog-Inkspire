import { Link } from "react-router-dom";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/[.07] bg-[#efede6]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-8 lg:py-12">
        <div>
          <Brand />
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-600">
            A quiet corner of the internet for thoughtful ideas, creative work and stories worth sharing.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-stone-600">
          <Link className="transition-colors hover:text-[#2f5c46]" to="/about">About</Link>
          <Link className="transition-colors hover:text-[#2f5c46]" to="/contact">Contact</Link>
          <a className="transition-colors hover:text-[#2f5c46]" href={`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/seo/rss`}>RSS feed</a>
        </nav>
      </div>
      <div className="border-t border-black/[.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 text-[11px] text-stone-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} Inkspire Journal</span>
          <span>Made for the curious.</span>
        </div>
      </div>
    </footer>
  );
}
