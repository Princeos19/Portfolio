export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-outline/10">
      <div className="max-w-[1400px] mx-auto px-12 flex items-center justify-between mb-8">
        <div></div>
        <div className="text-center">
          <div className="text-[11px] text-on-surface-variant uppercase tracking-[0.2em] font-medium">
            &copy; 2026 Design by <span className="text-primary">Prince</span>{'. '}
            <span className="inline-flex items-center gap-2">
              Built by
              <a
                href="https://hearvie.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors text-sm font-medium align-middle"
              >
                <img src="/src/assets/GH.png" alt="Prince Logo" className="h-8 inline-block align-middle" />
              </a>
            </span>
          </div>
        </div>
        <div></div>
        

      </div>
    </footer>
  );
}
