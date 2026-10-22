import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Truck, Clock, Globe, ShieldCheck, Mail } from 'lucide-react';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | LaserSupply.org',
  description: 'Free tracked shipping across EU, USA & Canada (5–12 business days). Transparent delivery timeframes, dispatch hubs, and tracking information.',
  alternates: {
    canonical: 'https://lasersupply.org/shipping',
  },
  openGraph: {
    title: 'Shipping & Delivery Policy | LaserSupply.org',
    description: 'Free tracked shipping across EU, USA & Canada (5–12 business days).',
    url: 'https://lasersupply.org/shipping',
  },
};

export default function ShippingPolicyPage() {
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
              <Truck className="w-3.5 h-3.5" />
              <span>Shipping & Delivery Policy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Shipping & Delivery Information (Pristatymo taisyklės)
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm mt-2">
              Transparent fulfillment, handling, and international delivery timeframes for all LaserSupply.org orders.
            </p>
          </div>

          <div className="space-y-6 text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-[#262624] pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>1. Free Shipping on All Orders (Nemokamas pristatymas)</span>
              </h2>
              <p>
                We offer <strong>100% Free Tracked Shipping (0.00 EUR)</strong> on all orders across the European Union, United Kingdom, Norway, Switzerland, the United States, and Canada. There is no minimum order value required.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#f5cb5c]" />
                <span>2. Order Handling & Transit Timeframes (Pristatymo terminai)</span>
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-stone-300 pl-2">
                <li><strong>Order Cut-off Time:</strong> 5:00 PM CET (Monday – Friday).</li>
                <li><strong>Handling & Processing Time:</strong> <strong>1 – 3 business days</strong> (Monday – Friday). During this time, your blanks or laser components are inspected, packed, and handed over to the logistics carrier.</li>
                <li><strong>Transit Time:</strong> <strong>5 – 12 business days</strong> (Monday – Friday) depending on the destination country.</li>
                <li><strong>Total Estimated Delivery Time:</strong> <strong>6 – 15 business days</strong> from the moment of order placement.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>3. Shipping Destinations & Tracking (Siuntų sekimas)</span>
              </h2>
              <p>
                We ship directly from our partnered European and international fulfillment centers to your doorstep or local parcel locker. Once your order is dispatched, you will automatically receive an email with a live <strong>Tracking Number</strong> and tracking link.
              </p>
              <p className="text-stone-400">
                Supported Countries: Lithuania (LT), Latvia (LV), Estonia (EE), Germany (DE), France (FR), Poland (PL), Spain (ES), Italy (IT), Netherlands (NL), Belgium (BE), Austria (AT), Denmark (DK), Sweden (SE), Finland (FI), Ireland (IE), Norway (NO), Switzerland (CH), United Kingdom (GB), United States (US), and Canada (CA).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f5cb5c]" />
                <span>4. Customer Support & Company Details</span>
              </h2>
              <div className="bg-[#121211] p-4 rounded-xl border border-[#262624] font-mono text-xs text-stone-300 space-y-1">
                <div>Company: <strong className="text-white">MB „Gists Group“</strong></div>
                <div>Country of Registration: <strong className="text-white">Lithuania (European Union)</strong></div>
                <div>Support Email: <strong className="text-[#f5cb5c]">info@lasersupply.org</strong></div>
                <div>Working Hours: <strong className="text-white">Monday – Friday, 09:00 – 18:00 CET</strong></div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
