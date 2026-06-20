import Link from "next/link";
import { UrduText } from "@/components/UrduText";

/* ── Hero visual: a fanned stack of medicine result cards ── */
function HeroCard() {
  return (
    <div className="relative w-72 h-64 mx-auto select-none" aria-hidden>
      {/* Back cards — fanned */}
      <div
        className="absolute inset-0 rounded-2xl border"
        style={{
          backgroundColor: "var(--color-paper-deep)",
          borderColor: "var(--color-hairline)",
          transform: "rotate(-6deg) translateY(8px)",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl border"
        style={{
          backgroundColor: "var(--color-paper-deep)",
          borderColor: "var(--color-hairline)",
          transform: "rotate(-3deg) translateY(4px)",
          opacity: 0.75,
        }}
      />

      {/* Main card — floats */}
      <div
        className="animate-float absolute inset-0 rounded-2xl border p-4 flex flex-col gap-3 shadow-lg"
        style={{
          backgroundColor: "var(--color-paper)",
          borderColor: "var(--color-hairline)",
        }}
      >
        {/* Rx badge */}
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-bold tracking-widest uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-green)" }}
          >
            ℞ Prescription
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: "var(--color-mint)", color: "var(--color-green-deep)" }}
          >
            ● Identified
          </span>
        </div>

        <hr style={{ borderColor: "var(--color-hairline)" }} />

        {/* Medicine row 1 */}
        <div>
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-green)", fontSize: "0.85rem" }}>
            Amox 500mg
          </p>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--color-ink)" }}>
            An antibiotic generally used to treat bacterial infections.
          </p>
          <UrduText as="p" className="text-xs mt-1 leading-loose" style={{ color: "var(--color-ink-soft)" }}>
            یہ جراثیم کے انفیکشن کے علاج کے لیے استعمال ہوتی ہے۔
          </UrduText>
        </div>

        <hr style={{ borderColor: "var(--color-hairline)" }} />

        {/* Medicine row 2 — low confidence */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-amber-text)", fontSize: "0.85rem" }}>
              Tab Panadol
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-ink-soft)" }}>
              Generally used for pain and fever relief.
            </p>
          </div>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
            style={{ backgroundColor: "var(--color-amber-surface)", color: "var(--color-amber-text)" }}
          >
            Low
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Step chip ── */
function Step({ n, icon, title, urdu }: { n: number; icon: string; title: string; urdu: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 animate-slide-up">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl relative"
        style={{ backgroundColor: "var(--color-mint)" }}
      >
        <span>{icon}</span>
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
          style={{ backgroundColor: "var(--color-green)" }}
        >
          {n}
        </span>
      </div>
      <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>{title}</p>
      <UrduText as="p" className="text-xs leading-loose" style={{ color: "var(--color-ink-soft)" }}>
        {urdu}
      </UrduText>
    </div>
  );
}

/* ── Feature pill ── */
function Feature({ icon, text, urdu }: { icon: string; text: string; urdu: string }) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl p-3 border animate-slide-up"
      style={{ backgroundColor: "var(--color-paper-deep)", borderColor: "var(--color-hairline)" }}
    >
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div>
        <p className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>{text}</p>
        <UrduText as="p" className="text-xs leading-loose" style={{ color: "var(--color-ink-soft)" }}>
          {urdu}
        </UrduText>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="pt-10 pb-12 flex flex-col items-center text-center gap-8">

        {/* Animated card visual */}
        <div className="animate-slide-up w-full">
          <HeroCard />
        </div>

        {/* Headline */}
        <div className="space-y-3 animate-slide-up delay-100">
          <h1
            className="text-4xl leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
          >
            Your prescription,{" "}
            <span style={{ color: "var(--color-green)" }}>explained.</span>
          </h1>
          <UrduText as="p" className="text-2xl leading-loose" style={{ color: "var(--color-ink)" }}>
            آپ کی پرچی، آسان زبان میں
          </UrduText>
          <p className="text-base leading-relaxed max-w-sm mx-auto" style={{ color: "var(--color-ink-soft)" }}>
            Photograph your handwritten prescription. Parchi reads it and tells you what each medicine is generally used for — in English and Urdu.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 w-full max-w-xs animate-slide-up delay-200">
          <Link
            href="/scan"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-semibold text-white transition-transform active:scale-95"
            style={{
              background: `linear-gradient(110deg, var(--color-green) 40%, #1a9e80 55%, var(--color-green) 70%)`,
              backgroundSize: "200% auto",
              animation: "shimmer 2.4s linear infinite",
            }}
          >
            <span>📷</span> Scan your prescription
          </Link>
          <Link href="/scan" style={{ color: "var(--color-green)" }}>
            <UrduText as="span" className="text-center text-base py-2 leading-loose">
              پرچی اسکین کریں ←
            </UrduText>
          </Link>
        </div>

        {/* Trust badge */}
        <p className="text-xs animate-slide-up delay-300" style={{ color: "var(--color-ink-soft)" }}>
          Free · No signup · Works in Urdu · Powered by Google AI
        </p>
      </section>

      {/* ══ DIVIDER ══ */}
      <hr style={{ borderColor: "var(--color-hairline)" }} />

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-12 space-y-8">
        <div className="text-center space-y-1 animate-slide-up">
          <h2
            className="text-2xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
          >
            How it works
          </h2>
          <UrduText as="p" className="text-base leading-loose" style={{ color: "var(--color-ink-soft)" }}>
            کیسے کام کرتا ہے
          </UrduText>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Step n={1} icon="📷" title="Photograph" urdu="تصویر لیں" />
          <Step n={2} icon="🤖" title="AI reads it" urdu="AI پڑھتا ہے" />
          <Step n={3} icon="📖" title="Understand" urdu="سمجھیں" />
        </div>

        {/* Connector line between steps */}
        <div className="relative -mt-2 px-8">
          <div
            className="h-px"
            style={{
              background: `linear-gradient(to right, var(--color-mint), var(--color-green), var(--color-mint))`,
            }}
          />
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <hr style={{ borderColor: "var(--color-hairline)" }} />

      {/* ══ FEATURES ══ */}
      <section className="py-12 space-y-6">
        <div className="text-center space-y-1 animate-slide-up">
          <h2
            className="text-2xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
          >
            Built for Pakistan
          </h2>
          <UrduText as="p" className="text-base leading-loose" style={{ color: "var(--color-ink-soft)" }}>
            پاکستانیوں کے لیے بنایا گیا
          </UrduText>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Feature icon="🇵🇰" text="Urdu + English" urdu="اردو اور انگریزی" />
          <Feature icon="⚡" text="Instant results" urdu="فوری نتائج" />
          <Feature icon="🔒" text="No account needed" urdu="اکاؤنٹ نہیں چاہیے" />
          <Feature icon="🆓" text="Completely free" urdu="بالکل مفت" />
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <hr style={{ borderColor: "var(--color-hairline)" }} />

      {/* ══ SAMPLE CARD ══ */}
      <section className="py-12 space-y-4 animate-slide-up">
        <div className="text-center space-y-1">
          <h2
            className="text-2xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
          >
            What you'll see
          </h2>
          <UrduText as="p" className="text-base leading-loose" style={{ color: "var(--color-ink-soft)" }}>
            آپ کو کیا نظر آئے گا
          </UrduText>
        </div>

        {/* Sample result card */}
        <div
          className="rounded-2xl border p-4 space-y-3"
          style={{ backgroundColor: "var(--color-paper-deep)", borderColor: "var(--color-hairline)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-green)", fontSize: "1rem" }}>
                Augmentin 625mg
              </p>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-ink-soft)" }}>Amoxicillin / Clavulanate</p>
            </div>
            <span
              className="text-xs px-2.5 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{ backgroundColor: "var(--color-mint)", color: "var(--color-green-deep)" }}
            >
              ● Identified
            </span>
          </div>
          <hr style={{ borderColor: "var(--color-hairline)" }} />
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink)" }}>
            A combination antibiotic generally used to treat bacterial infections of the ear, lungs, sinuses, and urinary tract.
          </p>
          <UrduText as="p" className="text-base leading-loose" style={{ color: "var(--color-ink)" }}>
            یہ ایک مرکب اینٹی بائیوٹک ہے جو عام طور پر کان، پھیپھڑوں، سینوس اور پیشاب کی نالی کے جراثیمی انفیکشن کے علاج میں استعمال ہوتی ہے۔
          </UrduText>
        </div>
      </section>

      {/* ══ SAFETY ══ */}
      <section className="py-6 animate-slide-up">
        <div
          className="rounded-2xl border px-5 py-5 space-y-2"
          style={{
            backgroundColor: "var(--color-paper-deep)",
            borderColor: "var(--color-hairline)",
            borderLeftWidth: "4px",
            borderLeftColor: "var(--color-coral)",
          }}
        >
          <p className="text-sm font-bold" style={{ color: "var(--color-coral)" }}>
            ⚠ Not medical advice
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
            Parchi explains what medicines are <em>generally used for</em>. It never tells you to take, change, or stop any medicine. Always confirm with your pharmacist or doctor.
          </p>
          <UrduText as="p" className="text-sm leading-loose" style={{ color: "var(--color-ink-soft)" }}>
            پرچی صرف دوائیوں کا عام استعمال بتاتی ہے — یہ طبی مشورہ نہیں ہے۔ ہمیشہ اپنے فارماسسٹ یا ڈاکٹر سے تصدیق کریں۔
          </UrduText>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-12 flex flex-col items-center text-center gap-6 animate-slide-up">
        <h2
          className="text-3xl leading-snug"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
        >
          Ready to understand your prescription?
        </h2>
        <UrduText as="p" className="text-xl leading-loose" style={{ color: "var(--color-ink-soft)" }}>
          اپنی پرچی سمجھنے کے لیے تیار ہیں؟
        </UrduText>
        <Link
          href="/scan"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-transform active:scale-95"
          style={{ backgroundColor: "var(--color-green)" }}
        >
          📷 Scan now — it&apos;s free
        </Link>
        <UrduText as="p" className="text-xs" style={{ color: "var(--color-ink-soft)" }}>
          کوئی رجسٹریشن نہیں · مفت · فوری
        </UrduText>
      </section>

    </div>
  );
}
