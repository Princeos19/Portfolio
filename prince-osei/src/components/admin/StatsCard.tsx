import { MaterialIcon } from './MaterialIcon';
import type { MaterialIconName } from '../../types/navigation.types';

interface StatsCardProps {
  icon: MaterialIconName;
  label: string;
  value: string | number;
  badge?: string;
}

export function StatsCard({ icon, label, value, badge }: StatsCardProps) {
  return (
    <div className="bg-surface-container-low p-8 rounded-full border border-outline-variant/10 hover:border-primary/30 transition-all active-nav-glow">
      <div className="flex justify-between items-start mb-4">
        <MaterialIcon name={icon} className="text-primary text-3xl" />
        {badge && (
          <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full tracking-widest uppercase">
            {badge}
          </span>
        )}
      </div>
      <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">{label}</p>
      <p className="text-4xl font-bold font-headline mt-1">{value}</p>
    </div>
  );
}
