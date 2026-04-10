interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  placeholder: string;
  required?: boolean;
}

export function FormInput({ label, name, type = 'text', placeholder, required = false }: FormInputProps) {
  return (
    <div className="space-y-2 group input-glow transition-all">
      <label
        htmlFor={name}
        className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-6 text-base font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-outline/30"
      />
    </div>
  );
}
