import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Brand from "./Brand";

const navClass = ({ isActive }) => (
  `rounded-full px-3 py-2 transition-colors hover:text-[#2f5c46] ${isActive ? "bg-[#e9eee7] text-[#2f5c46]" : "text-stone-600"}`
);

function Navigation({ onNavigate }) {
  return (
    <>
      <NavLink className={navClass} onClick={onNavigate} to="/search">Explore</NavLink>
      <NavLink className={navClass} onClick={onNavigate} to="/category/Design">Design</NavLink>
      <NavLink className={navClass} onClick={onNavigate} to="/category/Technology">Technology</NavLink>
      <NavLink className={navClass} onClick={onNavigate} to="/about">About</NavLink>
    </>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/[.07] bg-[#f7f5f0]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-1 text-sm font-semibold md:flex">
          <Navigation />
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/search"
            className="hidden items-center gap-1 rounded-full bg-[#2f5c46] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#244b38] sm:flex"
          >
            Discover <ArrowUpRight size={15} />
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 transition-colors hover:bg-black/5 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${menuOpen ? "flex" : "hidden"} flex-col gap-2 border-t border-black/5 bg-[#f7f5f0] px-5 py-4 text-sm font-semibold md:hidden`}
      >
        <Navigation onNavigate={() => setMenuOpen(false)} />
      </nav>
    </header>
  );
}
