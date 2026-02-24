const categoryStyles: Record<string, string> = {
  "Study Tips": "bg-blue-50 text-blue-700 ring-blue-100",
  "Memory Science": "bg-violet-50 text-violet-700 ring-violet-100",
  Flashcards: "bg-amber-50 text-amber-700 ring-amber-100",
  Productivity: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "Learning Languages": "bg-rose-50 text-rose-700 ring-rose-100",
  Exams: "bg-red-50 text-red-700 ring-red-100",
};

export default function CategoryBadge({ category }: { category: string }) {
  const style =
    categoryStyles[category] ?? "bg-slate-50 text-slate-600 ring-slate-100";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {category}
    </span>
  );
}
