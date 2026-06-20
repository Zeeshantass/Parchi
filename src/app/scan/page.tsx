import { UploadFlow } from "@/components/UploadFlow";
import { UrduText } from "@/components/UrduText";

export default function ScanPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

      {/* Persistent disclaimer */}
      <div
        className="rounded-xl border px-4 py-3"
        style={{
          backgroundColor: "var(--color-paper-deep)",
          borderColor: "var(--color-hairline)",
        }}
      >
        <p className="text-xs font-semibold" style={{ color: "var(--color-coral)" }}>
          Not medical advice
        </p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
          Parchi explains what medicines are generally used for. Always confirm with your pharmacist or doctor.
        </p>
        <UrduText as="p" className="text-xs mt-1 leading-loose" style={{ color: "var(--color-ink-soft)" }}>
          یہ طبی مشورہ نہیں ہے۔ اپنے فارماسسٹ یا ڈاکٹر سے تصدیق کریں۔
        </UrduText>
      </div>

      <UploadFlow />
    </div>
  );
}
