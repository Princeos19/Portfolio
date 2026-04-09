export function ContactCTA() {
  return (
    <div className="bg-surface-variant/20 rounded-[4rem] p-24 md:p-40 flex flex-col items-center justify-center relative overflow-hidden text-center border border-outline/10 backdrop-blur-sm">
      <h2 className="text-4xl md:text-6xl font-extrabold mb-16 max-w-2xl leading-tight">
        Have a project in mind? Let's talk
      </h2>
      <div className="flex flex-col items-center gap-6">
        <button className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-110 transition-all group shadow-xl shadow-primary/25">
          <span className="material-symbols-outlined text-[32px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
        <span className="text-xs font-bold uppercase tracking-[0.3em]">say hi</span>
      </div>
      <div className="absolute bottom-16 right-16 flex gap-6 text-on-surface-variant">
        <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">share</span>
        <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">alternate_email</span>
        <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">language</span>
      </div>
    </div>
  );
}
