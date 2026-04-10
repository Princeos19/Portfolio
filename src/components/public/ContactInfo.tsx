export function ContactInfo() {
  return (
    <div className="p-8 bg-surface-container-low border border-outline-variant/20 rounded-3xl space-y-6">
      <h3 className="font-headline text-xl font-bold">Direct Contact</h3>
      <div className="space-y-4">
        <a className="flex items-center gap-4 group" href="mailto:hello@luminary.com">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
            <span className="material-symbols-outlined text-xl">mail</span>
          </div>
          <span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">
            princeosei991@gmail.com
          </span>
        </a>
        <a className="flex items-center gap-4 group" href="#">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
            <span className="material-symbols-outlined text-xl">call</span>
          </div>
          <span className="font-body text-sm text-on-surface-variant group-hover:text-primary transition-colors">
            +233 (055) 164-3306
          </span>
        </a>
      </div>
    </div>
  );
}
