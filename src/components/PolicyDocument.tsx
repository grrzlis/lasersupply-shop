import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { PolicyPage } from '@/lib/policy-copy';

function rich(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>
  );
}

export function PolicyDocument({
  locale,
  page,
  icon: Icon,
}: {
  locale: Locale;
  page: PolicyPage;
  icon: LucideIcon;
}) {
  return (
    <div className="min-h-screen bg-[#f1f4f6] text-[#1b283a] font-sans">
      <header className="border-b border-[#e4e8ec] bg-white sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-[#5c6770] hover:text-[#9f241d] transition-colors text-xs font-semibold"
          >
            <span aria-hidden>←</span>
            <span>{page.back}</span>
          </Link>
          <span className="text-xs font-bold text-[#9f241d] tracking-wider uppercase">LaserSupply.org</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-[#e4e8ec] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9f241d]/10 border border-[#9f241d]/30 text-[#9f241d] text-xs font-semibold mb-4">
              <Icon className="w-3.5 h-3.5" />
              <span>{page.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b283a] tracking-tight">{page.title}</h1>
            <p className="text-[#5c6770] text-xs sm:text-sm mt-2">{page.lead}</p>
          </div>

          <div className="space-y-6 text-[#3c4a5a] text-xs sm:text-sm leading-relaxed border-t border-[#e4e8ec] pt-6">
            {page.sections.map((section) => (
              <section key={section.title} className="space-y-2">
                <h2 className="text-base font-bold text-[#1b283a]">{section.title}</h2>
                {section.body?.map((paragraph) => (
                  <p key={paragraph}>{rich(paragraph)}</p>
                ))}
                {section.items && (
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    {section.items.map((item) => (
                      <li key={item}>{rich(item)}</li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <div className="bg-[#f1f4f6] p-4 rounded-xl border border-[#e4e8ec] text-xs text-[#3c4a5a] space-y-1">
                    {section.note.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
