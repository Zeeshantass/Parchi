import type { MedicineEntry } from "@/types/medicine";
import { ConfidenceChip } from "./ConfidenceChip";
import { UrduText } from "./UrduText";

export function MedicineCard({ entry }: { entry: MedicineEntry }) {
  const { name_as_read, identified_name, confidence, general_use_en, general_use_ur } = entry;

  return (
    <div
      className="rounded-2xl border p-4 space-y-3"
      style={{
        backgroundColor: "var(--color-paper-deep)",
        borderColor: "var(--color-hairline)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {/* Name as written on the prescription */}
          <p
            className="text-base leading-snug break-words"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-green)" }}
          >
            {name_as_read}
          </p>
          {/* Identified standard name */}
          {identified_name && identified_name !== name_as_read && (
            <p
              className="text-sm mt-0.5"
              style={{ color: "var(--color-ink-soft)" }}
            >
              {identified_name}
            </p>
          )}
        </div>
        <ConfidenceChip confidence={confidence} />
      </div>

      {/* Divider */}
      <hr style={{ borderColor: "var(--color-hairline)" }} />

      {confidence === "unreadable" ? (
        <p className="text-sm italic" style={{ color: "var(--color-ink-soft)" }}>
          This item could not be read clearly. Please ask your pharmacist to review the prescription.
        </p>
      ) : (
        <>
          {/* English explanation */}
          {general_use_en && (
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink)" }}>
              {general_use_en}
            </p>
          )}

          {/* Urdu explanation */}
          {general_use_ur && (
            <UrduText
              as="p"
              className="text-base leading-loose"
              style={{ color: "var(--color-ink)" }}
            >
              {general_use_ur}
            </UrduText>
          )}
        </>
      )}
    </div>
  );
}
