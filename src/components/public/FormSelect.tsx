interface FormSelectProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}

export function FormSelect({ label, name, options, required = false }: FormSelectProps) {
  return (
    <div className="space-y-2 group input-glow transition-all">
      <label
        htmlFor={name}
        className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-6 text-base font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
          <span className="material-symbols-outlined">expand_more</span>
        </span>
      </div>
    </div>
  );
}
