import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Inkspire home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2f5c46] font-serif text-lg font-bold text-white transition-transform group-hover:rotate-[-5deg]">
        i
      </span>
      <span className="text-xl font-black tracking-tight">
        inkspire<span className="text-[#6c8d73]">.</span>
      </span>
    </Link>
  );
}