import type { MaterialIconName } from '../../types/navigation.types';

interface MaterialIconProps {
  name: MaterialIconName;
  className?: string;
  filled?: boolean;
}

export function MaterialIcon({ name, className = '', filled = false }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'material-symbols-filled' : ''} ${className}`}
    >
      {name}
    </span>
  );
}
