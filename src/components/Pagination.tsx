import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-14">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-colors"
        >
          ← Prev
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-violet-600 text-white"
              : "border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-colors"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
