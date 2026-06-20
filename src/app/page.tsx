import Link from "next/link";
import { UrduText } from "@/components/UrduText";
import { StorySection } from "@/components/StorySection";
import { HeroDemo } from "@/components/HeroDemo";

/* ── Step chip ── */
function Step({ n, icon, title, urdu }: { n: number; icon: string; title: string; urdu: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
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
      className="flex items-start gap-3 rounded-xl p-3 border"
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

      {/* ══════════════════════════════════════
          HERO — emotional hook + live demo
      ══════════════════════════════════════ */}
      <section className="pt-8 pb-10 space-y-6">

        {/* Hook headline — leads with the fear */}
        <div className="text-center space-y-2 animate-slide-up">
          {/* Urgency pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-1"
            style={{ backgroundColor: "#FEF3C7", color: "#B45309" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            کیا آپ یقین سے جانتے ہیں؟
          </div>

          <h1
            className="text-4xl leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
          >
            Can you read{" "}
            <span
              className="relative inline-block"
              style={{ color: "var(--color-coral)" }}
            >
              this?
              {/* Underline squiggle */}
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 80 6" preserveAspectRatio="none">
                <path d="M0 4 Q10 1 20 4 Q30 7 40 4 Q50 1 60 4 Q70 7 80 4"
                  fill="none" stroke="var(--color-coral)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="text-base leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
            Doctors' handwriting is impossible to read — and the wrong medicine can be dangerous.
            <strong style={{ color: "var(--color-ink)" }}> Parchi reads your prescription for you.</strong>
          </p>
          <UrduText as="p" className="text-lg leading-loose" style={{ color: "var(--color-ink)" }}>
            پرچی آپ کی دوائیاں سمجھنے میں مدد کرتی ہے
          </UrduText>
        </div>

        {/* Live demo — animates on its own */}
        <div className="animate-slide-up delay-100">
          <HeroDemo />
        </div>

        {/* CTA — below the demo so users have already seen the value */}
        <div className="flex flex-col items-center gap-3 animate-slide-up delay-200">
          <Link
            href="/scan"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-lg font-bold text-white transition-transform active:scale-95 shadow-lg"
            style={{
              background: "linear-gradient(135deg, var(--color-green) 0%, #1a9e80 50%, var(--color-green-deep) 100%)",
              boxShadow: "0 4px 24px rgba(14,110,92,0.35)",
            }}
          >
            📷 Scan your prescription — free
          </Link>
          <UrduText as="p" className="text-base leading-loose" style={{ color: "var(--color-green)" }}>
            <Link href="/scan">ابھی پرچی اسکین کریں ←</Link>
          </UrduText>
          <p className="text-xs" style={{ color: "var(--color-ink-soft)" }}>
            No signup · Instant · Works in Urdu · Powered by Google AI
          </p>
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <hr style={{ borderColor: "var(--color-hairline)" }} />

      {/* ══ STORY / CHARACTERS ══ */}
      <StorySection />

      {/* ══ DIVIDER ══ */}
      <hr style={{ borderColor: "var(--color-hairline)" }} />

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-12 space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
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
        <div className="px-8">
          <div className="h-px" style={{
            background: "linear-gradient(to right, var(--color-mint), var(--color-green), var(--color-mint))"
          }} />
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <hr style={{ borderColor: "var(--color-hairline)" }} />

      {/* ══ FEATURES ══ */}
      <section className="py-12 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
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

      {/* ══ SAFETY ══ */}
      <section className="py-8">
        <div
          className="rounded-2xl border px-5 py-5 space-y-2"
          style={{
            backgroundColor: "var(--color-paper-deep)",
            borderColor: "var(--color-hairline)",
            borderLeftWidth: "4px",
            borderLeftColor: "var(--color-coral)",
          }}
        >
          <p className="text-sm font-bold" style={{ color: "var(--color-coral)" }}>⚠ Not medical advice</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
            Parchi explains what medicines are <em>generally used for</em>. It never tells you to take, change,
            or stop any medicine. Always confirm with your pharmacist or doctor.
          </p>
          <UrduText as="p" className="text-sm leading-loose" style={{ color: "var(--color-ink-soft)" }}>
            پرچی صرف دوائیوں کا عام استعمال بتاتی ہے — یہ طبی مشورہ نہیں ہے۔ ہمیشہ اپنے فارماسسٹ یا ڈاکٹر سے تصدیق کریں۔
          </UrduText>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-12 flex flex-col items-center text-center gap-5">
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
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-transform active:scale-95 shadow-lg"
          style={{
            background: "linear-gradient(135deg, var(--color-green) 0%, #1a9e80 50%, var(--color-green-deep) 100%)",
            boxShadow: "0 4px 24px rgba(14,110,92,0.35)",
          }}
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
