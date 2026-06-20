import { UrduText } from "@/components/UrduText";

const palette = [
  { token: "paper", hex: "#FAF6EC", usage: "Page background", textDark: true },
  { token: "paper-deep", hex: "#F3EDDD", usage: "Card / surface", textDark: true },
  { token: "ink", hex: "#20303B", usage: "Primary text", textDark: false },
  { token: "ink-soft", hex: "#5C6B72", usage: "Secondary text", textDark: false },
  { token: "green", hex: "#0E6E5C", usage: "Brand / CTA", textDark: false },
  { token: "green-deep", hex: "#0A5446", usage: "Hover / active", textDark: false },
  { token: "mint", hex: "#E4EFE9", usage: "High-confidence chip", textDark: true },
  { token: "amber-text", hex: "#B97A12", usage: "Caution text", textDark: false },
  { token: "amber-surface", hex: "#FBEFD6", usage: "Low-confidence chip", textDark: true },
  { token: "coral", hex: "#BC4B33", usage: "Error / unreadable", textDark: false },
  { token: "hairline", hex: "#E0D8C5", usage: "Borders / dividers", textDark: true },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b"
        style={{ color: "var(--color-ink-soft)", borderColor: "var(--color-hairline)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function StylePage() {
  return (
    <div
      className="max-w-2xl mx-auto px-4 py-10"
      style={{ color: "var(--color-ink)" }}
    >
      <h1
        className="text-3xl mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Design System
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-ink-soft)" }}>
        Parchi — visual language reference
      </p>

      {/* ── Palette ── */}
      <Section title="Color Palette">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {palette.map(({ token, hex, usage, textDark }) => (
            <div
              key={token}
              className="rounded-lg overflow-hidden border"
              style={{ borderColor: "var(--color-hairline)" }}
            >
              <div
                className="h-16 flex items-end px-3 pb-2"
                style={{ backgroundColor: hex }}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: textDark ? "#20303B" : "#FAF6EC" }}
                >
                  {hex}
                </span>
              </div>
              <div
                className="px-3 py-2"
                style={{ backgroundColor: "var(--color-paper-deep)" }}
              >
                <p className="text-xs font-semibold">{token}</p>
                <p className="text-xs" style={{ color: "var(--color-ink-soft)" }}>
                  {usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Type Scale ── */}
      <Section title="Typography">
        <div className="space-y-6">
          {/* Fraunces */}
          <div>
            <p className="text-xs mb-2" style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-body)" }}>
              Fraunces — display / headings
            </p>
            <p
              className="text-4xl leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Prescription Explained
            </p>
            <p
              className="text-2xl leading-snug mt-1"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-green)" }}
            >
              What your doctor wrote
            </p>
          </div>

          {/* Inter */}
          <div>
            <p className="text-xs mb-2" style={{ color: "var(--color-ink-soft)" }}>
              Inter — body / UI
            </p>
            <p className="text-base leading-relaxed">
              Amoxicillin is an antibiotic generally used to treat bacterial infections.
              This is not medical advice — always confirm with your pharmacist.
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-ink-soft)" }}>
              Small body · labels · captions
            </p>
          </div>

          {/* Spline Sans Mono */}
          <div>
            <p className="text-xs mb-2" style={{ color: "var(--color-ink-soft)" }}>
              Spline Sans Mono — medicine name as-read
            </p>
            <p
              className="text-lg"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-green)" }}
            >
              Amox 500mg
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-soft)" }}
            >
              Tab Panadol × 10
            </p>
          </div>

          {/* Noto Nastaliq Urdu */}
          <div>
            <p className="text-xs mb-2" style={{ color: "var(--color-ink-soft)" }}>
              Noto Nastaliq Urdu — all Urdu text (RTL)
            </p>
            <UrduText as="p" className="text-xl leading-loose">
              یہ دوائی عام طور پر بیکٹیریل انفیکشن کے علاج کے لیے استعمال ہوتی ہے۔
            </UrduText>
            <UrduText as="p" className="text-base leading-loose mt-2" >
              براہ کرم اپنے فارماسسٹ یا ڈاکٹر سے تصدیق کریں۔
            </UrduText>
          </div>
        </div>
      </Section>

      {/* ── Confidence Chips ── */}
      <Section title="Confidence Chips">
        <div className="flex flex-wrap gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: "var(--color-mint)", color: "var(--color-green-deep)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            High confidence
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: "var(--color-amber-surface)", color: "var(--color-amber-text)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Low confidence
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#F9ECEB", color: "var(--color-coral)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Unreadable
          </span>
        </div>
      </Section>

      {/* ── Disclaimer Sample ── */}
      <Section title="Disclaimer (persistent)">
        <div
          className="rounded-xl border px-4 py-4"
          style={{
            backgroundColor: "var(--color-paper-deep)",
            borderColor: "var(--color-hairline)",
          }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--color-coral)" }}>
            This is not medical advice.
          </p>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
            Parchi explains what medicines are generally used for. Always confirm
            with your pharmacist or doctor before taking, changing, or stopping any medicine.
          </p>
          <UrduText as="p" className="text-sm mt-2 leading-loose" style={{ color: "var(--color-ink-soft)" }}>
            یہ ایپ طبی مشورہ نہیں ہے۔ ہمیشہ اپنے فارماسسٹ یا ڈاکٹر سے تصدیق کریں۔
          </UrduText>
        </div>
      </Section>

      {/* ── Upload Zone Preview ── */}
      <Section title="Upload Zone (prescription pad)">
        <div
          className="rounded-2xl border-2 border-dashed min-h-48 flex flex-col items-center justify-center gap-3 px-6 text-center"
          style={{
            backgroundColor: "var(--color-paper-deep)",
            borderColor: "var(--color-hairline)",
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 31px, var(--color-hairline) 31px, var(--color-hairline) 32px)",
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: "var(--color-mint)" }}
          >
            📄
          </div>
          <div>
            <p
              className="text-base font-medium"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
            >
              Tap to photograph your prescription
            </p>
            <UrduText as="p" className="text-sm mt-1">
              پرچی کی تصویر لیں
            </UrduText>
          </div>
        </div>
      </Section>
    </div>
  );
}
