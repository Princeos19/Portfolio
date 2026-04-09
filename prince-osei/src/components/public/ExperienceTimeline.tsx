interface ExperienceTimelineProps {
  period: string;
  role: string;
  company: string;
}

export function ExperienceTimeline({ period, role, company }: ExperienceTimelineProps) {
  return (
    <div className="relative border-t border-outline/20 py-8 flex items-center justify-between group">
      <div className="flex items-center gap-12 flex-1">
        <span className="px-4 py-1.5 border border-outline/40 text-[11px] rounded-full group-hover:border-primary transition-colors font-bold">
          {period}
        </span>
        <h4 className="font-bold text-base">{role}</h4>
      </div>
      <span className="text-[11px] text-on-surface-variant font-bold uppercase tracking-widest">
        {company}
      </span>
    </div>
  );
}
