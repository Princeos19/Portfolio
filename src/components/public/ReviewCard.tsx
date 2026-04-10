interface ReviewCardProps {
  text: string;
  author: string;
  role: string;
}

export function ReviewCard({ text, author, role }: ReviewCardProps) {
  return (
    <div className="space-y-10">
      <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: 'FILL 1' }}>
        format_quote
      </span>
      <p className="text-base text-on-surface-variant leading-loose italic">
        "{text}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-surface-variant border border-outline-20"></div>
        <div>
          <h5 className="text-sm font-bold">{author}</h5>
          <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}
