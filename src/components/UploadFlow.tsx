"use client";

import { useRef, useState } from "react";
import type { MedicineEntry } from "@/types/medicine";
import { MedicineCard } from "./MedicineCard";
import { UrduText } from "./UrduText";

type Status = "idle" | "loading" | "done" | "error";

async function compressImage(file: File, maxPx = 1600): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.85);
    };
    img.src = url;
  });
}

export function UploadFlow() {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [medicines, setMedicines] = useState<MedicineEntry[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleFile(file: File) {
    setPreview(URL.createObjectURL(file));
    setStatus("loading");
    setMedicines([]);
    setErrorMsg("");

    try {
      const blob = await compressImage(file);
      const form = new FormData();
      form.append("image", blob, "prescription.jpg");

      const res = await fetch("/api/analyse", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setMedicines(data.medicines);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setPreview(null);
    setMedicines([]);
    setErrorMsg("");
    if (cameraRef.current) cameraRef.current.value = "";
    if (galleryRef.current) galleryRef.current.value = "";
  }

  return (
    <div className="space-y-6">

      {/* Upload zone */}
      {status === "idle" && (
        <>
          {/* Prescription pad visual */}
          <div
            className="w-full rounded-2xl border-2 border-dashed px-6 pt-8 pb-6 flex flex-col items-center gap-3 text-center"
            style={{
              backgroundColor: "var(--color-paper-deep)",
              borderColor: "var(--color-hairline)",
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 31px, var(--color-hairline) 31px, var(--color-hairline) 32px)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: "var(--color-mint)" }}
            >
              📄
            </div>
            <div>
              <p
                className="text-lg font-medium"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
              >
                Upload your prescription
              </p>
              <UrduText as="p" className="text-base mt-1" style={{ color: "var(--color-ink-soft)" }}>
                اپنی پرچی اپ لوڈ کریں
              </UrduText>
            </div>

            {/* Two action buttons */}
            <div className="flex gap-3 w-full mt-2">
              {/* Take Photo — opens rear camera directly */}
              <button
                type="button"
                onClick={() => cameraRef.current?.click()}
                className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border transition-colors active:opacity-70"
                style={{
                  backgroundColor: "var(--color-green)",
                  borderColor: "var(--color-green-deep)",
                }}
              >
                <span className="text-2xl">📷</span>
                <span className="text-sm font-semibold text-white">Take Photo</span>
                <UrduText as="span" className="text-xs text-white opacity-90">
                  تصویر لیں
                </UrduText>
              </button>

              {/* Choose from Gallery */}
              <button
                type="button"
                onClick={() => galleryRef.current?.click()}
                className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border transition-colors active:opacity-70"
                style={{
                  backgroundColor: "var(--color-paper)",
                  borderColor: "var(--color-hairline)",
                }}
              >
                <span className="text-2xl">🖼️</span>
                <span className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                  Gallery
                </span>
                <UrduText as="span" className="text-xs" style={{ color: "var(--color-ink-soft)" }}>
                  گیلری سے چنیں
                </UrduText>
              </button>
            </div>
          </div>

          {/* Camera input — capture="environment" opens rear camera directly on Android */}
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />

          {/* Gallery input — no capture attribute, opens file picker / gallery */}
          <input
            ref={galleryRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </>
      )}

      {/* Loading */}
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4 py-16">
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Your prescription"
              className="w-32 h-32 object-cover rounded-xl opacity-60"
              style={{ border: `1px solid var(--color-hairline)` }}
            />
          )}
          <div
            className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{ borderColor: "var(--color-green)", borderTopColor: "transparent" }}
          />
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Reading your prescription…
          </p>
          <UrduText as="p" className="text-base" style={{ color: "var(--color-ink-soft)" }}>
            پرچی پڑھی جا رہی ہے…
          </UrduText>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="space-y-4">
          <div
            className="rounded-xl border px-4 py-4"
            style={{ backgroundColor: "#FDF2F1", borderColor: "var(--color-coral)" }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--color-coral)" }}>
              Could not read prescription
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-ink-soft)" }}>
              {errorMsg}
            </p>
          </div>
          <button
            onClick={reset}
            className="w-full py-3 rounded-xl text-sm font-medium"
            style={{ backgroundColor: "var(--color-green)", color: "#fff" }}
          >
            Try again
          </button>
        </div>
      )}

      {/* Results */}
      {status === "done" && medicines.length > 0 && (
        <div className="space-y-4">
          {preview && (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Your prescription"
                className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
                style={{ border: `1px solid var(--color-hairline)` }}
              />
              <div>
                <p
                  className="text-base font-medium"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                >
                  {medicines.length} medicine{medicines.length !== 1 ? "s" : ""} found
                </p>
                <UrduText as="p" className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                  {medicines.length} دوائیں ملی ہیں
                </UrduText>
              </div>
            </div>
          )}

          {medicines.map((m, i) => (
            <MedicineCard key={i} entry={m} />
          ))}

          <div
            className="rounded-xl border px-4 py-4 text-center"
            style={{ backgroundColor: "var(--color-mint)", borderColor: "var(--color-hairline)" }}
          >
            <p className="text-sm font-semibold" style={{ color: "var(--color-green-deep)" }}>
              Always confirm with your pharmacist or doctor
            </p>
            <UrduText as="p" className="text-sm mt-1" style={{ color: "var(--color-green-deep)" }}>
              ہمیشہ اپنے فارماسسٹ یا ڈاکٹر سے تصدیق کریں
            </UrduText>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 rounded-xl text-sm font-medium border"
            style={{
              borderColor: "var(--color-hairline)",
              color: "var(--color-ink-soft)",
              backgroundColor: "var(--color-paper-deep)",
            }}
          >
            Scan another prescription
          </button>
        </div>
      )}

      {/* No medicines found */}
      {status === "done" && medicines.length === 0 && (
        <div className="space-y-4">
          <div
            className="rounded-xl border px-4 py-4"
            style={{ backgroundColor: "var(--color-paper-deep)", borderColor: "var(--color-hairline)" }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
              No medicines could be identified
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-ink-soft)" }}>
              The image may be too blurry or the prescription format is unfamiliar. Try a clearer photo.
            </p>
          </div>
          <button
            onClick={reset}
            className="w-full py-3 rounded-xl text-sm font-medium"
            style={{ backgroundColor: "var(--color-green)", color: "#fff" }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
