import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginResponse = {
  ok?: boolean;
  error?: string;
};

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ password }),
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok) {
        setError(data.error ?? 'Login failed');
        return;
      }

      navigate('/admin', { replace: true });
    } catch {
      setError('Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-dim text-on-surface selection:bg-primary/30 min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full"></div>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-headline font-black text-primary tracking-[0.2em] text-2xl mb-2">
              LUMINARY_OS
            </h1>
            <p className="text-on-surface-variant text-sm font-medium tracking-wide">
              SYSTEM ACCESS PROTOCOL
            </p>
          </div>

          <div className="glass-panel border border-outline-variant/15 p-10 rounded-xl glow-cyan">
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary">lock</span>
              </div>
              <h2 className="font-headline font-bold text-xl text-on-surface tracking-tight">
                Identity Verification
              </h2>
              <p className="text-on-surface-variant text-xs mt-1">
                Enter your administrative credentials
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-[10px] uppercase font-bold tracking-[0.1em] text-on-surface-variant px-1"
                >
                  Access Key
                </label>
                <div className="relative group input-glow">
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 text-on-surface px-4 py-4 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 placeholder:text-on-surface-variant/30 text-lg tracking-widest"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-on-surface-variant/50 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">key</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold tracking-wide flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Initialize Access'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}
            </form>

            <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
              <a
                href="#"
                className="text-xs text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">help</span>
                Contact System Administrator
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-on-surface-variant/60 hover:text-on-surface transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Return to Public Portfolio
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
