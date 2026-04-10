interface CertificationCardProps {
  title: string;
  provider: string;
  category: string;
  icon: string;
  credentialUrl?: string;
}

export function CertificationCard({ title, provider, category, icon, credentialUrl = '#' }: CertificationCardProps) {
  return (
    <div className="flex items-start gap-6">
      <div className="w-12 h-12 shrink-0 rounded bg-surface-variant/30 flex items-center justify-center p-2">
        <img alt={provider} className="w-full h-full object-contain" src={icon} />
      </div>
      <div>
        <h3 className="font-bold text-lg leading-tight mb-1 text-on-background">{title}</h3>
        <p className="text-on-surface-variant text-sm mb-2">{category}</p>
        <a
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors group"
          href={credentialUrl}
        >
          <span className="underline decoration-outline/50 underline-offset-4">Show credentials</span>
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </a>
      </div>
    </div>
  );
}
