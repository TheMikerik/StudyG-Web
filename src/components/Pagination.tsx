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
    <nav className="flex items-center justify-center gap-1.5 mt-16">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 rounded-lg border border-black/10 text-sm text-gray-500 hover:border-black/30 hover:text-black transition-all"
        >
          ← Prev
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${page === currentPage
              ? "bg-black text-white font-bold"
              : "border border-black/10 text-gray-500 hover:border-black/30 hover:text-black"
            }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-lg border border-black/10 text-sm text-gray-500 hover:border-black/30 hover:text-black transition-all"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
