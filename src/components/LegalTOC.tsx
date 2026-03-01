"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  href: string;
  label: string;
}

export default function LegalTOC({ items }: { items: TOCItem[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = items.map((item) =>
      document.querySelector(item.href)
    ) as (Element | null)[];

    function onScroll() {
      let current = "";
      for (const section of sections) {
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 150) current = section.id;
        }
      }
      setActive(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav className="flex flex-col space-y-1">
      {items.map((item) => {
        const id = item.href.replace("#", "");
        const isActive = active === id;
        return (
          <a
            key={item.href}
            href={item.href}
            className={`text-sm border-l-2 py-2 transition-all ${isActive
                ? "text-black border-black pl-5"
                : "text-gray-500 border-transparent pl-4 hover:text-black"
              }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
