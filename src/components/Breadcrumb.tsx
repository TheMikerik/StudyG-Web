import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-2 text-[13px] font-medium tracking-wide">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-700" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-black transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
