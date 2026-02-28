// Dark-theme category badges — muted colored tints that work on dark backgrounds
const categoryStyles: Record<string, string> = {
  "Study Tips": "bg-blue-500/10 text-blue-300 ring-blue-500/20",
  "Memory Science": "bg-violet-500/10 text-violet-300 ring-violet-500/20",
  Flashcards: "bg-amber-500/10 text-amber-300 ring-amber-500/20",
  Productivity: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
  "Learning Languages": "bg-rose-500/10 text-rose-300 ring-rose-500/20",
  Exams: "bg-red-500/10 text-red-300 ring-red-500/20",
};

export default function CategoryBadge({ category }: { category: string }) {
  const style =
    categoryStyles[category] ?? "bg-white/5 text-gray-400 ring-white/10";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {category}
    </span>
  );
}
