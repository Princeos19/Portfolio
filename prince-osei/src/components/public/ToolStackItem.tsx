interface ToolStackItemProps {
  name: string;
  icon: string;
  backgroundColor: string;
}

export function ToolStackItem({ name, icon, backgroundColor }: ToolStackItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-surface-variant/30 border border-outline/20 rounded-full hover:border-primary/50 transition-colors cursor-default">
      <div className="w-5 h-5 rounded-sm flex items-center justify-center overflow-hidden" style={{ backgroundColor }}>
        <img alt={name} className="w-full h-full object-contain" src={icon} />
      </div>
      <span className="text-xs font-bold tracking-tight">{name}</span>
    </div>
  );
}
