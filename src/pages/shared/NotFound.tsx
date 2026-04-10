import { Link } from 'react-router-dom';
import { Navigation } from '../../components/public/Navigation';
import { Footer } from '../../components/public/Footer';

export default function NotFound() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary selection:text-on-primary min-h-screen flex flex-col relative overflow-x-hidden">
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-radial-gradient pointer-events-none opacity-50"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-radial-gradient pointer-events-none opacity-50"></div>

      <Navigation />

      <main className="flex-grow flex flex-col items-center justify-center px-6 relative py-20">
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-150 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="relative">
            <h1 className="font-headline text-[12rem] md:text-[18rem] font-extrabold tracking-tighter leading-none text-on-surface/5 select-none text-glow">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 md:w-64 md:h-64 border border-outline-variant/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-32 h-32 md:w-40 md:h-40 border border-primary/20 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-6xl md:text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_off</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl text-center space-y-6 relative">
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
            Oops! It looks like you've drifted off the map.
          </h2>
          <p className="text-on-surface-variant font-body text-lg md:text-xl max-w-lg mx-auto">
            The coordinates you followed lead to a void in our digital architecture. Let's get you back to the light.
          </p>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="group bg-gradient-primary text-on-primary px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:opacity-90 transition-all duration-300 shadow-[0_10px_40px_rgba(0,218,243,0.2)]"
            >
              <span className="material-symbols-outlined">home</span>
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-10 py-4 rounded-xl border border-outline-variant/20 text-on-surface hover:bg-surface-container transition-colors flex items-center gap-3"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Previous Step
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden xl:block">
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 w-64 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-error animate-ping"></div>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">System Status</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Terminal error detected at <span className="text-primary font-mono">0x404_VOID</span>. Connection reset by peer.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      <div className="fixed top-1/4 right-[-5%] w-px h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent rotate-45 pointer-events-none"></div>
      <div className="fixed bottom-1/4 left-[-5%] w-px h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent -rotate-45 pointer-events-none"></div>
    </div>
  );
}
