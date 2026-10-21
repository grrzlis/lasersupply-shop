import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, CheckCircle2, Mail } from 'lucide-react';

export const runtime = 'edge';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#121211] text-stone-200 font-sans">
      <header className="border-b border-[#262624] bg-[#181817]/90 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-xs font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store / Grįžti į parduotuvę</span>
          </Link>
          <span className="text-xs font-bold text-[#f5cb5c] tracking-wider uppercase">LaserSupply.org</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-[#181817] border border-[#2b2b29] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5cb5c]/10 border border-[#f5cb5c]/30 text-[#f5cb5c] text-xs font-semibold mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>GDPR Privacy & Terms of Service</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Privacy Policy & Terms of Service (Privatumo politika)
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm mt-2">
              Operated by MB „Gists Group“ in full compliance with EU General Data Protection Regulation (GDPR).
            </p>
          </div>

          <div className="space-y-6 text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-[#262624] pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1. Data Controller & Business Identity</span>
              </h2>
              <p>
                This online store (<strong>LaserSupply.org</strong>) is owned and operated by <strong>MB „Gists Group“</strong>, a legal entity registered in the Republic of Lithuania (European Union). Contact email: <strong>info@lasersupply.org</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#f5cb5c]" />
                <span>2. Personal Data Collection & Payment Security</span>
              </h2>
              <p>
                We collect only the personal data strictly necessary to process and deliver your order: full name, shipping address, email address, and telephone number (for courier delivery notifications).
              </p>
              <p>
                All online payments are securely processed by <strong>Stripe Payments Europe, Ltd.</strong> using 256-bit SSL encryption. LaserSupply.org never stores or accesses your raw credit card numbers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>3. Order Fulfillment & Third-Party Logistics</span>
              </h2>
              <p>
                To fulfill your order efficiently, shipping details (recipient name, delivery address, and phone number) are shared strictly with our partnered warehousing and courier logistics providers (DPD, Omniva, DHL, AliExpress Standard/Choice Logistics). We never sell or rent customer data to third-party marketers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f5cb5c]" />
                <span>4. Your GDPR Rights & Contact</span>
              </h2>
              <p>
                Under the EU GDPR, you have the right to access, rectify, or request the deletion of your personal data at any time. For any privacy or legal inquiries, please contact us at:
              </p>
              <div className="bg-[#121211] p-4 rounded-xl border border-[#262624] font-mono text-xs text-stone-300 space-y-1">
                <div>Legal Entity: <strong className="text-white">MB „Gists Group“</strong></div>
                <div>Email: <strong className="text-[#f5cb5c]">info@lasersupply.org</strong></div>
                <div>Jurisdiction: <strong className="text-white">Republic of Lithuania (EU)</strong></div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
