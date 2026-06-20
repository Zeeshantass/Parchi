"use client";

import { useEffect, useState } from "react";
import { UrduText } from "./UrduText";

type Phase = "rx" | "scanning" | "card1" | "card2" | "hold";

const CYCLE: [Phase, number][] = [
  ["rx",       2000],
  ["scanning", 1600],
  ["card1",    900],
  ["card2",    900],
  ["hold",     2400],
];

export function HeroDemo() {
  const [phase, setPhase] = useState<Phase>("rx");

  useEffect(() => {
    let i = 0;
    let t: ReturnType<typeof setTimeout>;

    function next() {
      i = (i + 1) % CYCLE.length;
      setPhase(CYCLE[i][0]);
      t = setTimeout(next, CYCLE[i][1]);
    }

    t = setTimeout(next, CYCLE[0][1]);
    return () => clearTimeout(t);
  }, []);

  const scanning = phase === "scanning";
  const showCard1 = phase === "card1" || phase === "card2" || phase === "hold";
  const showCard2 = phase === "card2" || phase === "hold";

  return (
    <div className="w-full max-w-sm mx-auto select-none" aria-hidden>

      {/* ── Prescription paper ── */}
      <div
        className="relative rounded-2xl border overflow-hidden transition-all duration-700"
        style={{
          backgroundColor: "var(--color-paper)",
          borderColor: scanning ? "var(--color-green)" : "var(--color-hairline)",
          boxShadow: scanning
            ? "0 0 0 3px rgba(14,110,92,0.18), 0 8px 32px rgba(14,110,92,0.12)"
            : "0 2px 12px rgba(32,48,59,0.08)",
          filter: (showCard1 || showCard2) ? "blur(0.5px)" : "none",
          opacity: (showCard1 || showCard2) ? 0.45 : 1,
          transform: (showCard1 || showCard2) ? "scale(0.97)" : "scale(1)",
          transition: "all 0.6s ease",
        }}
      >
        {/* Ruled lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 27px, var(--color-hairline) 27px, var(--color-hairline) 28px)",
            opacity: 0.6,
          }}
        />

        <div className="relative px-5 py-4 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--color-hairline)" }}>
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--color-green)", fontFamily: "var(--font-display)" }}>
                Dr. Khalid Mahmood
              </p>
              <p className="text-xs" style={{ color: "var(--color-ink-soft)" }}>MBBS, FCPS — City Clinic</p>
            </div>
            <span className="text-2xl font-bold" style={{ color: "var(--color-green)", fontFamily: "var(--font-display)" }}>℞</span>
          </div>

          {/* Scribbled medicine lines (SVG squiggles) */}
          <svg viewBox="0 0 260 90" className="w-full" style={{ height: 90 }}>
            {/* Line 1 — fast cursive scrawl */}
            <path d="M 8 14 Q 22 8 36 14 Q 52 20 68 12 Q 88 6 104 15 Q 118 22 132 13 Q 148 5 162 14 Q 174 20 188 12"
              fill="none" stroke="#20303B" strokeWidth="1.8" strokeLinecap="round" opacity="0.75"/>
            <path d="M 192 13 Q 210 6 228 14 Q 240 20 252 12"
              fill="none" stroke="#20303B" strokeWidth="1.8" strokeLinecap="round" opacity="0.75"/>
            {/* Small sub-note */}
            <path d="M 8 22 Q 20 18 32 22 Q 42 26 50 21"
              fill="none" stroke="#5C6B72" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>

            {/* Line 2 */}
            <path d="M 8 44 Q 24 38 40 45 Q 58 52 78 42 Q 98 34 116 44 Q 134 52 152 41 Q 168 32 186 44 Q 200 52 218 43"
              fill="none" stroke="#20303B" strokeWidth="1.8" strokeLinecap="round" opacity="0.75"/>
            <path d="M 8 53 Q 28 48 44 53 Q 56 57 66 52"
              fill="none" stroke="#5C6B72" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>

            {/* Line 3 */}
            <path d="M 8 74 Q 26 68 44 75 Q 64 82 84 72 Q 100 64 118 73 Q 136 80 156 71 Q 170 64 184 73 Q 196 80 206 73"
              fill="none" stroke="#20303B" strokeWidth="1.8" strokeLinecap="round" opacity="0.75"/>
            <path d="M 8 83 Q 22 78 34 83"
              fill="none" stroke="#5C6B72" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
          </svg>
        </div>

        {/* Scan line */}
        {scanning && (
          <div
            className="absolute left-0 right-0 h-0.5 pointer-events-none z-10"
            style={{
              background: "linear-gradient(90deg, transparent 0%, var(--color-green) 30%, #7EFFDA 50%, var(--color-green) 70%, transparent 100%)",
              animation: "scanDown 1.4s ease-in-out forwards",
              top: 0,
            }}
          />
        )}

        {/* Scanning glow overlay */}
        {scanning && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(14,110,92,0.06) 0%, rgba(14,110,92,0.03) 100%)" }}
          />
        )}
      </div>

      {/* ── Result cards (appear after scan) ── */}
      <div className="mt-3 space-y-2">

        {/* Card 1 — high confidence */}
        <div
          className="rounded-xl border px-4 py-3"
          style={{
            backgroundColor: "var(--color-paper-deep)",
            borderColor: "var(--color-hairline)",
            opacity: showCard1 ? 1 : 0,
            transform: showCard1 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
            boxShadow: showCard1 ? "0 2px 8px rgba(32,48,59,0.07)" : "none",
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-green)", fontSize: "0.9rem" }}>
              Amoxicillin 500mg
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
              style={{ backgroundColor: "var(--color-mint)", color: "var(--color-green-deep)" }}>
              ● Identified
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink)" }}>
            An antibiotic generally used to treat bacterial infections.
          </p>
          <UrduText as="p" className="text-xs mt-1 leading-loose" style={{ color: "var(--color-ink-soft)" }}>
            جراثیمی انفیکشن کے علاج میں استعمال ہوتی ہے۔
          </UrduText>
        </div>

        {/* Card 2 — low confidence */}
        <div
          className="rounded-xl border px-4 py-3"
          style={{
            backgroundColor: "var(--color-paper-deep)",
            borderColor: "var(--color-hairline)",
            opacity: showCard2 ? 1 : 0,
            transform: showCard2 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
            boxShadow: showCard2 ? "0 2px 8px rgba(32,48,59,0.07)" : "none",
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-amber-text)", fontSize: "0.9rem" }}>
              Tab Panadol
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
              style={{ backgroundColor: "var(--color-amber-surface)", color: "var(--color-amber-text)" }}>
              ● Low confidence
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink)" }}>
            Generally used for pain and fever relief.
          </p>
          <UrduText as="p" className="text-xs mt-1 leading-loose" style={{ color: "var(--color-ink-soft)" }}>
            درد اور بخار میں عام طور پر استعمال ہوتی ہے۔
          </UrduText>
        </div>
      </div>
    </div>
  );
}
