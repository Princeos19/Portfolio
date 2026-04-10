interface FormTextareaProps {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
}

export function FormTextarea({
  label,
  name,
  placeholder,
  required = false,
  rows = 5,
}: FormTextareaProps) {
  return (
    <div className="space-y-2 group input-glow transition-all">
      <label
        htmlFor={name}
        className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-6 text-base font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-outline/30 resize-none min-h-[200px]"
      />
    </div>
  );
}
