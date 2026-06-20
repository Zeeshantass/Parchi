import { UrduText } from "./UrduText";

/* ─────────────────────────────────────────────
   Shared SVG pieces
───────────────────────────────────────────── */

/** Base character head + torso. expression = "worried" | "neutral" | "happy" | "excited" */
function AliCharacter({
  x = 0,
  y = 0,
  expression = "neutral",
  rightArmUp = false,
  leftArmUp = false,
}: {
  x?: number; y?: number;
  expression?: "worried" | "neutral" | "happy" | "excited";
  rightArmUp?: boolean;
  leftArmUp?: boolean;
}) {
  const mouthPath =
    expression === "happy" || expression === "excited"
      ? "M 56 82 Q 64 90 72 82"   // smile
      : expression === "worried"
      ? "M 56 86 Q 64 80 72 86"   // frown
      : "M 58 84 L 70 84";          // neutral

  const browsL =
    expression === "worried"
      ? "M 48 62 Q 54 58 60 61"
      : expression === "excited"
      ? "M 48 59 Q 54 55 60 58"
      : "M 48 62 L 60 62";

  const browsR =
    expression === "worried"
      ? "M 68 61 Q 74 58 80 62"
      : expression === "excited"
      ? "M 68 58 Q 74 55 80 59"
      : "M 68 62 L 80 62";

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Kameez body */}
      <rect x="36" y="108" width="56" height="68" rx="14" fill="#0E6E5C"/>
      {/* Collar V */}
      <polygon points="64,108 64,125 56,108" fill="#0A5446"/>
      <polygon points="64,108 64,125 72,108" fill="#0A5446"/>

      {/* Left arm */}
      <rect
        x={leftArmUp ? 10 : 8}
        y={leftArmUp ? 90 : 112}
        width="32" height="16" rx="8" fill="#0E6E5C"
        transform={leftArmUp ? "rotate(-50 26 106)" : undefined}
      />
      {/* Left hand */}
      <circle cx={leftArmUp ? 18 : 14} cy={leftArmUp ? 96 : 120} r="9" fill="#C4845A"/>

      {/* Right arm */}
      <rect
        x={rightArmUp ? 86 : 88}
        y={rightArmUp ? 90 : 112}
        width="32" height="16" rx="8" fill="#0E6E5C"
        transform={rightArmUp ? "rotate(50 102 106)" : undefined}
      />
      {/* Right hand */}
      <circle cx={rightArmUp ? 110 : 114} cy={rightArmUp ? 96 : 120} r="9" fill="#C4845A"/>

      {/* Neck */}
      <rect x="55" y="96" width="18" height="18" rx="5" fill="#C4845A"/>

      {/* Head */}
      <ellipse cx="64" cy="68" rx="28" ry="30" fill="#C4845A"/>

      {/* Hair */}
      <path d="M 36 58 Q 40 34 64 30 Q 88 34 92 58 Q 88 40 64 36 Q 40 40 36 58 Z" fill="#2C1810"/>
      <path d="M 36 58 Q 34 50 36 44 Q 40 34 64 30 Q 42 36 38 52 Z" fill="#2C1810"/>

      {/* Ears */}
      <ellipse cx="36" cy="68" rx="6" ry="8" fill="#B87048"/>
      <ellipse cx="92" cy="68" rx="6" ry="8" fill="#B87048"/>

      {/* Eyes */}
      <ellipse cx="54" cy="66" rx="6" ry="6.5" fill="white"/>
      <ellipse cx="74" cy="66" rx="6" ry="6.5" fill="white"/>
      <circle cx="55" cy="67" r="3.5" fill="#2C1810"/>
      <circle cx="75" cy="67" r="3.5" fill="#2C1810"/>
      {/* Pupils shine */}
      <circle cx="56.5" cy="65.5" r="1.2" fill="white"/>
      <circle cx="76.5" cy="65.5" r="1.2" fill="white"/>

      {/* Eyebrows */}
      <path d={browsL} fill="none" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round"/>
      <path d={browsR} fill="none" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Mustache */}
      <path d="M 55 78 Q 64 74 73 78 Q 68 76 64 77 Q 60 76 55 78 Z" fill="#2C1810"/>

      {/* Mouth */}
      <path d={mouthPath} fill="none" stroke="#2C1810" strokeWidth="2.2" strokeLinecap="round"/>

      {expression === "excited" && (
        <>
          <circle cx="50" cy="58" r="2" fill="#FFD700" opacity="0.9"/>
          <circle cx="78" cy="55" r="1.5" fill="#FFD700" opacity="0.9"/>
          <circle cx="85" cy="65" r="2.5" fill="#FFD700" opacity="0.9"/>
        </>
      )}

      {/* Legs */}
      <rect x="40" y="170" width="22" height="20" rx="8" fill="#1E3A30"/>
      <rect x="66" y="170" width="22" height="20" rx="8" fill="#1E3A30"/>
      {/* Shoes */}
      <ellipse cx="51" cy="190" rx="13" ry="6" fill="#3D2B1F"/>
      <ellipse cx="77" cy="190" rx="13" ry="6" fill="#3D2B1F"/>
    </g>
  );
}

/** Pharmacist character */
function Pharmacist({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* White coat */}
      <rect x="34" y="108" width="56" height="68" rx="14" fill="#F0F0F0" stroke="#E0D8C5" strokeWidth="1"/>
      {/* Coat lapels */}
      <polygon points="64,108 58,130 50,108" fill="white"/>
      <polygon points="64,108 70,130 78,108" fill="white"/>
      {/* Green uniform under coat */}
      <rect x="54" y="108" width="20" height="22" rx="4" fill="#0E6E5C"/>

      {/* Left arm */}
      <rect x="8" y="112" width="32" height="16" rx="8" fill="#F0F0F0"/>
      <circle cx="14" cy="120" r="9" fill="#C4845A"/>
      {/* Right arm */}
      <rect x="88" y="112" width="32" height="16" rx="8" fill="#F0F0F0"/>
      <circle cx="114" cy="120" r="9" fill="#C4845A"/>

      {/* Neck */}
      <rect x="55" y="96" width="18" height="18" rx="5" fill="#C4845A"/>

      {/* Head */}
      <ellipse cx="64" cy="68" rx="28" ry="30" fill="#C4845A"/>

      {/* Hijab / hair */}
      <path d="M 36 58 Q 40 34 64 30 Q 88 34 92 58 Q 86 38 64 34 Q 42 38 36 58 Z" fill="#0E6E5C"/>

      {/* Ears */}
      <ellipse cx="36" cy="68" rx="6" ry="8" fill="#B87048"/>
      <ellipse cx="92" cy="68" rx="6" ry="8" fill="#B87048"/>

      {/* Eyes - friendly */}
      <ellipse cx="54" cy="66" rx="6" ry="6.5" fill="white"/>
      <ellipse cx="74" cy="66" rx="6" ry="6.5" fill="white"/>
      <circle cx="55" cy="67" r="3.5" fill="#2C1810"/>
      <circle cx="75" cy="67" r="3.5" fill="#2C1810"/>
      <circle cx="56.5" cy="65.5" r="1.2" fill="white"/>
      <circle cx="76.5" cy="65.5" r="1.2" fill="white"/>

      {/* Eyebrows */}
      <path d="M 48 60 Q 54 57 60 60" fill="none" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 68 60 Q 74 57 80 60" fill="none" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Big smile */}
      <path d="M 54 80 Q 64 92 74 80" fill="none" stroke="#2C1810" strokeWidth="2.2" strokeLinecap="round"/>

      {/* Stethoscope */}
      <path d="M 50 140 Q 46 155 55 158 Q 64 162 73 158 Q 82 155 78 140"
        fill="none" stroke="#0E6E5C" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="64" cy="161" r="5" fill="#0E6E5C"/>

      {/* Legs */}
      <rect x="40" y="170" width="22" height="20" rx="8" fill="#1E3A30"/>
      <rect x="66" y="170" width="22" height="20" rx="8" fill="#1E3A30"/>
      <ellipse cx="51" cy="190" rx="13" ry="6" fill="#3D2B1F"/>
      <ellipse cx="77" cy="190" rx="13" ry="6" fill="#3D2B1F"/>
    </g>
  );
}

/* ─────────────────────────────────────────────
   Scene SVGs
───────────────────────────────────────────── */

function SceneConfused() {
  return (
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[240px] mx-auto">
      {/* Prescription paper in hand */}
      <g transform="rotate(-15 40 155) translate(4 140)">
        <rect x="0" y="0" width="52" height="66" rx="5" fill="#FAF6EC" stroke="#E0D8C5" strokeWidth="1.5"/>
        <text x="6" y="16" fontSize="10" fill="#0E6E5C" fontFamily="Georgia,serif">℞</text>
        <line x1="6" y1="25" x2="46" y2="25" stroke="#E0D8C5" strokeWidth="1.5"/>
        <line x1="6" y1="34" x2="40" y2="34" stroke="#E0D8C5" strokeWidth="1.5"/>
        <line x1="6" y1="43" x2="44" y2="43" stroke="#E0D8C5" strokeWidth="1.5"/>
        <line x1="6" y1="52" x2="36" y2="52" stroke="#E0D8C5" strokeWidth="1.5"/>
        {/* Illegible scribble */}
        <path d="M 6 25 Q 15 22 20 26 Q 28 22 35 25" fill="none" stroke="#5C6B72" strokeWidth="1.2" opacity="0.5"/>
        <path d="M 6 34 Q 18 30 25 35 Q 34 30 40 34" fill="none" stroke="#5C6B72" strokeWidth="1.2" opacity="0.5"/>
      </g>
      {/* Question marks floating */}
      <text x="145" y="50" fontSize="28" fill="#B97A12" fontWeight="900" opacity="0.9">?</text>
      <text x="165" y="80" fontSize="20" fill="#B97A12" fontWeight="900" opacity="0.7">?</text>
      <text x="152" y="100" fontSize="14" fill="#B97A12" fontWeight="900" opacity="0.6">?</text>
      {/* Sweat drop */}
      <ellipse cx="100" cy="28" rx="5" ry="7" fill="#93C4E0" opacity="0.85"/>
      <polygon points="95,30 105,30 100,20" fill="#93C4E0" opacity="0.85"/>
      {/* Character */}
      <AliCharacter x={48} y={10} expression="worried" leftArmUp={true} rightArmUp={false}/>
    </svg>
  );
}

function SceneScanning() {
  return (
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[240px] mx-auto">
      {/* Phone in hand */}
      <g transform="translate(130 90)">
        <rect x="0" y="0" width="52" height="82" rx="10" fill="#1A1A2E" stroke="#333" strokeWidth="1.5"/>
        {/* Screen */}
        <rect x="4" y="8" width="44" height="62" rx="6" fill="#0E6E5C"/>
        {/* Camera icon on screen */}
        <circle cx="26" cy="35" r="12" fill="none" stroke="white" strokeWidth="2.5" opacity="0.9"/>
        <circle cx="26" cy="35" r="5" fill="white" opacity="0.9"/>
        {/* Scan corners */}
        <path d="M 10 18 L 10 24 M 10 18 L 16 18" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
        <path d="M 42 18 L 42 24 M 42 18 L 36 18" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
        <path d="M 10 58 L 10 52 M 10 58 L 16 58" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
        <path d="M 42 58 L 42 52 M 42 58 L 36 58" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
        {/* Scan line */}
        <line x1="6" y1="35" x2="46" y2="35" stroke="#7EFFDA" strokeWidth="1.5" opacity="0.8" strokeDasharray="4 2"/>
        {/* Home bar */}
        <rect x="18" y="73" width="16" height="3" rx="1.5" fill="#555"/>
      </g>
      {/* Glow around phone */}
      <ellipse cx="156" cy="140" rx="36" ry="50" fill="#0E6E5C" opacity="0.08"/>
      {/* Sparkles */}
      <text x="118" y="82" fontSize="14" fill="#FFD700">✦</text>
      <text x="188" y="92" fontSize="10" fill="#FFD700">✦</text>
      <text x="192" y="72" fontSize="8" fill="#0E6E5C">✦</text>
      {/* Character */}
      <AliCharacter x={28} y={10} expression="neutral" rightArmUp={true}/>
    </svg>
  );
}

function SceneResults() {
  return (
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[240px] mx-auto">
      {/* Floating result cards */}
      {/* Card 1 */}
      <g transform="translate(120 20) rotate(6)">
        <rect x="0" y="0" width="88" height="48" rx="8" fill="#FAF6EC" stroke="#E0D8C5" strokeWidth="1.2"/>
        <rect x="6" y="8" width="50" height="6" rx="3" fill="#0E6E5C" opacity="0.8"/>
        <rect x="6" y="20" width="76" height="4" rx="2" fill="#E0D8C5"/>
        <rect x="6" y="28" width="68" height="4" rx="2" fill="#E0D8C5"/>
        <rect x="6" y="36" width="72" height="4" rx="2" fill="#E0D8C5"/>
        {/* High confidence chip */}
        <rect x="58" y="6" width="24" height="10" rx="5" fill="#E4EFE9"/>
        <circle cx="63" cy="11" r="2.5" fill="#0E6E5C"/>
        <rect x="67" y="8.5" width="12" height="5" rx="2.5" fill="#0E6E5C" opacity="0.4"/>
      </g>
      {/* Card 2 (behind) */}
      <g transform="translate(118 82) rotate(3)">
        <rect x="0" y="0" width="88" height="44" rx="8" fill="#FAF6EC" stroke="#E0D8C5" strokeWidth="1.2" opacity="0.85"/>
        <rect x="6" y="8" width="44" height="6" rx="3" fill="#B97A12" opacity="0.7"/>
        <rect x="6" y="20" width="76" height="4" rx="2" fill="#E0D8C5"/>
        <rect x="6" y="28" width="60" height="4" rx="2" fill="#E0D8C5"/>
        {/* Low confidence chip */}
        <rect x="56" y="6" width="26" height="10" rx="5" fill="#FBEFD6"/>
        <circle cx="61" cy="11" r="2.5" fill="#B97A12"/>
      </g>
      {/* Stars / sparkles */}
      <text x="106" y="58" fontSize="16" fill="#FFD700">★</text>
      <text x="94" y="76" fontSize="10" fill="#FFD700">★</text>
      <text x="116" y="78" fontSize="8" fill="#0E6E5C">✦</text>
      {/* Light bulb above head */}
      <ellipse cx="88" cy="16" rx="12" ry="14" fill="#FFF9C4" stroke="#FFD700" strokeWidth="2"/>
      <rect x="83" y="28" width="10" height="6" rx="2" fill="#FFD700" opacity="0.8"/>
      <path d="M 82 16 Q 86 8 94 12" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.7"/>
      {/* Character */}
      <AliCharacter x={8} y={10} expression="excited" rightArmUp={true}/>
    </svg>
  );
}

function ScenePharmacist() {
  return (
    <svg viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px] mx-auto">
      {/* Pharmacy counter */}
      <rect x="60" y="158" width="148" height="26" rx="8" fill="#E4EFE9" stroke="#0E6E5C" strokeWidth="1.5"/>
      <rect x="60" y="148" width="148" height="14" rx="4" fill="#0E6E5C" opacity="0.15"/>
      {/* Rx sign on counter */}
      <rect x="116" y="136" width="36" height="26" rx="5" fill="#FAF6EC" stroke="#E0D8C5" strokeWidth="1"/>
      <text x="123" y="154" fontSize="14" fill="#0E6E5C" fontFamily="Georgia,serif" fontWeight="bold">℞</text>
      {/* Thumbs up bubbles */}
      <g transform="translate(42 30)">
        <ellipse cx="22" cy="18" rx="22" ry="18" fill="#E4EFE9" stroke="#0E6E5C" strokeWidth="1.5"/>
        <text x="11" y="25" fontSize="18">👍</text>
        {/* Bubble tail left */}
        <polygon points="8,30 0,42 18,34" fill="#E4EFE9" stroke="#0E6E5C" strokeWidth="1.2"/>
      </g>
      <g transform="translate(168 24)">
        <ellipse cx="22" cy="18" rx="22" ry="18" fill="#E4EFE9" stroke="#0E6E5C" strokeWidth="1.5"/>
        <text x="11" y="25" fontSize="18">👍</text>
        {/* Bubble tail right */}
        <polygon points="36,30 44,42 26,34" fill="#E4EFE9" stroke="#0E6E5C" strokeWidth="1.2"/>
      </g>
      {/* Patient character (left) */}
      <AliCharacter x={10} y={10} expression="happy"/>
      {/* Pharmacist (right) */}
      <Pharmacist x={134} y={10}/>
      {/* Sparkles between them */}
      <text x="126" y="82" fontSize="12" fill="#FFD700">✦</text>
      <text x="130" y="100" fontSize="8" fill="#0E6E5C">✦</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Story panel
───────────────────────────────────────────── */
function Panel({
  number,
  scene,
  title,
  titleUrdu,
  caption,
  captionUrdu,
  delay,
}: {
  number: number;
  scene: React.ReactNode;
  title: string;
  titleUrdu: string;
  caption: string;
  captionUrdu: string;
  delay: string;
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden animate-slide-up flex flex-col"
      style={{
        backgroundColor: "var(--color-paper-deep)",
        borderColor: "var(--color-hairline)",
        animationDelay: delay,
      }}
    >
      {/* Panel number badge */}
      <div
        className="px-4 pt-4 pb-1 flex items-center gap-2"
      >
        <span
          className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: "var(--color-green)" }}
        >
          {number}
        </span>
        <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>{title}</p>
      </div>

      {/* Illustration */}
      <div
        className="px-4 py-3 flex items-center justify-center"
        style={{
          background: `radial-gradient(ellipse at center, var(--color-paper) 40%, var(--color-paper-deep) 100%)`,
        }}
      >
        {scene}
      </div>

      {/* Caption */}
      <div className="px-4 py-3 border-t space-y-1" style={{ borderColor: "var(--color-hairline)" }}>
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>{caption}</p>
        <UrduText as="p" className="text-xs leading-loose" style={{ color: "var(--color-ink-soft)" }}>
          {titleUrdu} — {captionUrdu}
        </UrduText>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Exported section
───────────────────────────────────────────── */
export function StorySection() {
  return (
    <section className="py-12 space-y-6">
      <div className="text-center space-y-1 animate-slide-up">
        <h2
          className="text-2xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
        >
          Why Parchi matters
        </h2>
        <UrduText as="p" className="text-base leading-loose" style={{ color: "var(--color-ink-soft)" }}>
          پرچی کیوں ضروری ہے
        </UrduText>
        <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--color-ink-soft)" }}>
          Millions of Pakistanis can't read their doctor's handwriting. Parchi changes that.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Panel
          number={1}
          scene={<SceneConfused />}
          title="The problem"
          titleUrdu="مسئلہ"
          caption="Doctors' handwriting is notoriously hard to read. What did they actually prescribe?"
          captionUrdu="ڈاکٹر کی لکھائی پڑھنا مشکل ہے"
          delay="0ms"
        />
        <Panel
          number={2}
          scene={<SceneScanning />}
          title="Photograph it"
          titleUrdu="تصویر لیں"
          caption="Open Parchi, tap 'Take Photo', and photograph your prescription. That's it."
          captionUrdu="پرچی کی تصویر لیں"
          delay="120ms"
        />
        <Panel
          number={3}
          scene={<SceneResults />}
          title="Understand it"
          titleUrdu="سمجھیں"
          caption="AI reads every medicine and explains its general use in English and Urdu."
          captionUrdu="ہر دوائی کا مقصد جانیں"
          delay="240ms"
        />
        <Panel
          number={4}
          scene={<ScenePharmacist />}
          title="Confirm it"
          titleUrdu="تصدیق کریں"
          caption="Always confirm with your pharmacist or doctor before taking any medicine."
          captionUrdu="ہمیشہ تصدیق کریں"
          delay="360ms"
        />
      </div>
    </section>
  );
}
