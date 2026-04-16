import type { ReactNode } from 'react';

interface AdminShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminShell({ title, subtitle, actions, children }: AdminShellProps) {
  return (
    <div className="min-h-full bg-[#111318] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col overflow-hidden rounded-[28px] border border-[#d9d2c8] bg-[#f7f2ea] text-[#111318] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <header className="border-b border-[#d9d2c8] px-6 py-5 md:px-8 md:py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#6f695f]">
                Luminary Admin Console
              </p>
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight text-[#111318] md:text-4xl">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="max-w-3xl text-sm leading-6 text-[#5e584f] md:text-[15px]">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>

            {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>
        </header>

        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(245,239,229,0.96)_100%)] px-6 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
