import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, RotateCcw, Clock, Mail, CheckCircle2 } from 'lucide-react';

export const runtime = 'edge';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-[#121211] text-stone-200 font-sans">
      {/* Top Header */}
      <header className="border-b border-[#262624] bg-[#181817]/90 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-xs font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Grįžti į parduotuvę</span>
          </Link>
          <span className="text-xs font-bold text-[#f5cb5c] tracking-wider uppercase">LaserSupply.org</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-[#181817] border border-[#2b2b29] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5cb5c]/10 border border-[#f5cb5c]/30 text-[#f5cb5c] text-xs font-semibold mb-4">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>EU Grąžinimo ir Garantijos Politika</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Prekių grąžinimo ir keitimo taisyklės (Return & Refund Policy)
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm mt-2">
              Paskutinį kartą atnaujinta: 2026 m. spalio mėn. Pagal Europos Sąjungos vartotojų teisių direktyvą.
            </p>
          </div>

          <div className="space-y-6 text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-[#262624] pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1. 30 dienų grąžinimo garantija (30-Day Money Back Guarantee)</span>
              </h2>
              <p>
                Kiekvienas pirkėjas turi teisę atsisakyti pirkimo-pardavimo sutarties ir grąžinti įsigytas prekes per <strong>30 dienų</strong> nuo jų gavimo dienos be jokios papildomos priežasties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>2. Grąžinamų prekių reikalavimai</span>
              </h2>
              <p>
                Grąžinama prekė turi būti:
              </p>
              <ul className="list-disc list-inside space-y-1 text-stone-400 pl-2">
                <li>Originalioje arba saugioje transportavimo pakuotėje;</li>
                <li>Nenaudota, nesugadinta ir nepraradusi prekinės išvaizdos (ruošiniai neturi būti graviruoti ar pjaustyti);</li>
                <li>Pilnos komplektacijos, kokia buvo pristatyta pirkėjui.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>3. Brokuotos ar pažeistos prekės (Defective Items)</span>
              </h2>
              <p>
                Jeigu prekė atvyko pažeista transportavimo metu arba turi gamyklinį defektą (pvz., nuskilęs skalūnas ar netinkamai veikiantis lazerio modulis), mes <strong>100% kompensuojame</strong> sumokėtus pinigus arba savo lėšomis nemokamai išsiunčiame naują prekę.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>4. Pinigų grąžinimo procesas (Refunds)</span>
              </h2>
              <p>
                Gavus grąžintą prekę arba patvirtinus pažeidimo faktą (užtenka atsiųsti nuotrauką el. paštu), pinigai grąžinami į tą pačią sąskaitą (per Stripe / Apple Pay / banko kortelę) per <strong>3–5 darbo dienas</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f5cb5c]" />
                <span>5. Kaip pradėti grąžinimą?</span>
              </h2>
              <p>
                Tiesiog parašykite mums laisvos formos laišką nurodydami užsakymo numerį:
              </p>
              <div className="bg-[#121211] p-4 rounded-xl border border-[#262624] font-mono text-xs text-stone-300">
                El. paštas: <strong className="text-[#f5cb5c]">info@lasersupply.org</strong><br />
                Atsakymo laikas: per 24 valandas (I–V 09:00–18:00 CET)
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
