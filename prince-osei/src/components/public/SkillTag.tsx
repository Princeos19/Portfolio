interface SkillTagProps {
  label: string;
}

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="px-5 py-2.5 bg-surface-variant/50 rounded-full text-on-surface-variant text-sm font-medium cursor-default hover:bg-surface-variant transition-colors">
      {label}
    </span>
  );
}
