import { useState, type ReactNode } from 'react';

interface SectionAccordionProps {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function SectionAccordion({
  title,
  subtitle,
  defaultOpen = true,
  children,
}: SectionAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-2xl border border-[#3c494c]/20 bg-[#1e2024] shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-white/3"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#e2e2e8]">{title}</p>
          {subtitle ? <p className="mt-1 text-xs text-[#bbc9cc]">{subtitle}</p> : null}
        </div>
        <span className="material-symbols-outlined text-[#00daf3] transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          keyboard_arrow_down
        </span>
      </button>

      {isOpen ? <div className="border-t border-[#3c494c]/15 p-6">{children}</div> : null}
    </section>
  );
}
