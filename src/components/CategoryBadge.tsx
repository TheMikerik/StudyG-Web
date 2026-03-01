// Light-theme category badges — clean colored tints
const categoryStyles: Record<string, string> = {
  "Study Tips": "bg-blue-500/10 text-blue-700 ring-blue-500/30",
  "Memory Science": "bg-violet-500/10 text-violet-700 ring-violet-500/30",
  Flashcards: "bg-amber-500/10 text-amber-700 ring-amber-500/30",
  Productivity: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/30",
  "Learning Languages": "bg-rose-500/10 text-rose-700 ring-rose-500/30",
  Exams: "bg-red-500/10 text-red-700 ring-red-500/30",
};

export default function CategoryBadge({ category }: { category: string }) {
  const style =
    categoryStyles[category] ?? "bg-black/5 text-gray-700 ring-black/10";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {category}
    </span>
  );
}
