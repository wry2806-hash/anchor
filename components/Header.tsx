"use client";

import Image from "next/image";

export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-transparent bg-paper/90 shadow-soft backdrop-blur">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm">
      <div className="flex items-center gap-3">
        <Image
          src="/images/anchor-logo.png"
          alt="ANCHOR logo"
          width={28}
          height={28}
          className="h-7 w-7"
        />
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-deep">
          ANCHOR
        </span>
      </div>
      <div className="flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-mute">
        <a className="hover:text-blue" href="#solution">
          HOW IT WORKS
        </a>
        <a className="hover:text-blue" href="#testimony">
          PROOF
        </a>
        <a className="btn-primary px-4 py-2 text-xs" href="#buy">
          BUY
        </a>
      </div>
    </nav>
  </header>
);
