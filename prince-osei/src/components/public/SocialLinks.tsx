export function SocialLinks() {
  const socialLinks = [
    { name: 'LinkedIn', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'Dribbble', url: '#' },
  ];

  return (
    <div className="p-8 space-y-6">
      <h3 className="font-label text-xs font-bold uppercase tracking-[0.2em] text-outline">
        Social Connections
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            className="font-headline text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
            href={link.url}
          >
            {link.name}
            <span className="material-symbols-outlined text-xs">north_east</span>
          </a>
        ))}
      </div>
    </div>
  );
}
