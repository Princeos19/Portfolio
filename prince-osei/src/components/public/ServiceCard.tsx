interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-surface-variant/30 border border-outline/20 p-10 rounded-2xl hover:border-primary/40 transition-all group backdrop-blur-sm">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-8 text-primary border border-primary/20">
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold mb-5">{title}</h3>
      <p className="text-[15px] text-on-surface-variant leading-relaxed">
        {description}
      </p>
    </div>
  );
}
